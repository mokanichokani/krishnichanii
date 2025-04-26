'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

interface MetricDataPoint {
  timestamp: number;
  value: number;
}

interface MetricData {
  name: string;
  data: MetricDataPoint[];
}

interface ModelMetrics {
  model_name: string;
  metrics: {
    accuracy: number;
    latency: number;
    memory_usage: number;
    throughput: number;
  };
}

const PROMETHEUS_URL = process.env.NEXT_PUBLIC_PROMETHEUS_URL || 'http://localhost:9090';
const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || 'http://localhost:8000';

export default function MLModelsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metricData, setMetricData] = useState<MetricData | null>(null);
  const [modelMetrics, setModelMetrics] = useState<ModelMetrics[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<string>('latency');

  // Fetch Prometheus data
  // Fetch Prometheus data
const fetchPrometheusData = async (query: string): Promise<MetricDataPoint[]> => {
  try {
    const response = await axios.get(`${PROMETHEUS_URL}/api/v1/query`, {
      params: {
        query
      }
    });

    if (response.data.status === 'success' && response.data.data.result.length > 0) {
      const result = response.data.data.result[0];
      
      // Handle instant query (value) vs range query (values)
      if (result.value) {
        // Instant query returns a single value
        const [timestamp, value] = result.value;
        return [{
          timestamp,
          value: parseFloat(value)
        }];
      } else if (result.values) {
        // Range query returns multiple values
        return result.values.map(([timestamp, value]: [number, string]) => ({
          timestamp,
          value: parseFloat(value)
        }));
      }
    }
    return [];
  } catch (error) {
    console.error('Error fetching Prometheus data:', error);
    throw error;
  }
};
  
  // Fetch bank_bank_baseline_latency_seconds
  const fetchLatencyMetrics = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchPrometheusData('bank_bank_active_users');
      if (data.length > 0) {
        setMetricData({
          name: 'Baseline Latency',
          data
        });
        
        // Send data to FastAPI
        // await sendToFastAPI('bank_baseline_latency', data);
      } else {
        setError('No latency data available');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to fetch metrics from Prometheus');
    } finally {
      setLoading(false);
    }
  };
  
  // Generate sample model metrics data
  const generateModelMetricsData = () => {
    const models = ['gpt-3.5-turbo', 'gpt-4', 'claude-2', 'gemini-pro', 'llama-2'];
    const metrics = models.map(model => ({
      model_name: model,
      metrics: {
        accuracy: Math.random() * 0.3 + 0.7, // 0.7 to 1.0
        latency: Math.random() * 500 + 100,  // 100ms to 600ms
        memory_usage: Math.random() * 8 + 2, // 2GB to 10GB
        throughput: Math.random() * 50 + 10  // 10 to 60 requests/sec
      }
    }));
    
    setModelMetrics(metrics);
    
    // Send to FastAPI
    try {
      axios.post(`${FASTAPI_URL}/ml-models`, { models: metrics });
    } catch (error) {
      console.error('Error sending model metrics to FastAPI:', error);
    }
  };
  
  useEffect(() => {
    // Generate sample model metrics on component mount
    generateModelMetricsData();
  }, []);
  
  // Format data for chart display
  const getChartData = () => {
    if (!metricData) return null;
    
    return {
      labels: metricData.data.map(point => 
        new Date(point.timestamp * 1000).toLocaleTimeString()
      ),
      datasets: [
        {
          label: metricData.name,
          data: metricData.data.map(point => point.value),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ],
    };
  };
  
  // Get model comparison chart data
  const getModelComparisonData = () => {
    return {
      labels: modelMetrics.map(model => model.model_name),
      datasets: [
        {
          label: selectedMetric === 'accuracy' ? 'Accuracy (higher is better)' :
                 selectedMetric === 'latency' ? 'Latency in ms (lower is better)' :
                 selectedMetric === 'memory_usage' ? 'Memory Usage in GB (lower is better)' :
                 'Throughput (higher is better)',
          data: modelMetrics.map(model => {
            // @ts-ignore
            return model.metrics[selectedMetric];
          }),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
      ]
    };
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: metricData ? metricData.name : 'Model Metrics',
      },
    },
  };
  
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Model Comparison: ${selectedMetric}`,
      },
    },
    scales: {
      y: {
        beginAtZero: selectedMetric === 'accuracy' ? true : false,
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">ML Models Metrics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Prometheus Metrics</h2>
          <button 
            onClick={fetchLatencyMetrics}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 mb-4"
          >
            {loading ? 'Loading...' : 'Fetch Latency Metrics'}
          </button>
          
          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          {metricData && getChartData() && (
            <div className="h-64">
              <Line 
                options={chartOptions} 
                data={getChartData() || {labels: [], datasets: []}} 
              />
            </div>
          )}
          
          {!metricData && !loading && !error && (
            <p className="text-gray-500">Click the button to fetch metrics from Prometheus</p>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">ML Model Comparison</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Metric to Compare:
            </label>
            <select 
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            >
              <option value="accuracy">Accuracy</option>
              <option value="latency">Latency</option>
              <option value="memory_usage">Memory Usage</option>
              <option value="throughput">Throughput</option>
            </select>
          </div>
          
          {modelMetrics.length > 0 && (
            <div className="h-64">
              <Bar 
                options={barChartOptions} 
                data={getModelComparisonData()} 
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Model Metrics Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Latency (ms)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Memory (GB)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Throughput (req/s)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {modelMetrics.map((model, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{model.model_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(model.metrics.accuracy * 100).toFixed(2)}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.metrics.latency.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.metrics.memory_usage.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.metrics.throughput.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">API Integration</h2>
        <p className="mb-4">This dashboard fetches metrics from Prometheus and sends data to FastAPI endpoints:</p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          <li><code className="bg-gray-100 px-2 py-1 rounded">GET {PROMETHEUS_URL}/api/v1/query_range</code> - Fetch time series data</li>
          <li><code className="bg-gray-100 px-2 py-1 rounded">POST {FASTAPI_URL}/metrics/bank_baseline_latency</code> - Send latency metrics</li>
          <li><code className="bg-gray-100 px-2 py-1 rounded">POST {FASTAPI_URL}/ml-models</code> - Send model comparison data</li>
        </ul>
        <p className="text-sm text-gray-500">
          For FastAPI implementation, create endpoints that accept these data structures and process them accordingly.
        </p>
      </div>
    </div>
  );
}
