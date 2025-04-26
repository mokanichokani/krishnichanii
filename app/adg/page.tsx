'use client';

import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Message {
  role: 'user' | 'assistant';
  content: string;
  chartData?: any;
}

interface ParsedResponse {
  explanation: string;
  attributes: string[];
  chartType: 'line' | 'bar';
}

const ATTRIBUTES = ['memory', 'time', 'latency', 'api-routes'];

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro-exp-03-25' });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateRandomData = (attribute: string) => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const data = labels.map(() => Math.floor(Math.random() * 100));
    
    return {
      labels,
      datasets: [
        {
          label: attribute,
          data: data,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ],
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const prompt = `You are a data visualization expert. Analyze the user's message: "${input}"
Based on this list of available attributes: memory, time, latency, api-routes
Your task is to:
1. Select relevant attributes to visualize
2. Choose either "line" or "bar" as the chart type
3. Provide a brief explanation

IMPORTANT: Respond ONLY with a JSON object in this exact format:
{
  "explanation": "your brief explanation here",
  "attributes": ["attribute1", "attribute2"],
  "chartType": "line"
}

Rules:
- attributes must ONLY include values from: memory, time, latency, api-routes
- chartType must ONLY be either "line" or "bar"
- explanation should be under 100 words
- Do not include any other text outside the JSON object`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      try {
        // Clean up the response text to handle markdown formatting
        text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        const parsedResponse = JSON.parse(text.trim()) as ParsedResponse;
        const chartData = parsedResponse.attributes.map((attr: string) => ({
          attribute: attr,
          data: generateRandomData(attr)
        }));

        const assistantMessage: Message = {
          role: 'assistant',
          content: parsedResponse.explanation,
          chartData: {
            type: parsedResponse.chartType,
            data: chartData
          }
        };
        setMessages(prev => [...prev, assistantMessage]);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        console.error('Raw text:', text); // Add this for debugging
        const errorMessage: Message = {
          role: 'assistant',
          content: 'I apologize, but I was unable to generate the visualization. Please try rephrasing your request.'
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              <div>{message.content}</div>
              {message.chartData && (
                <div className="mt-4 bg-white p-4 rounded-lg">
                  {message.chartData.data.map((chartItem: any, i: number) => (
                    <div key={i} className="mb-4">
                      <h3 className="text-lg font-semibold mb-2">{chartItem.attribute}</h3>
                      {message.chartData.type === 'line' ? (
                        <Line options={options} data={chartItem.data} />
                      ) : (
                        <Bar options={options} data={chartItem.data} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 rounded-lg p-4">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about memory, time, latency, or api-routes..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
