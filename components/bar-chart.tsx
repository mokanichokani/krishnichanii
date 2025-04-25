"use client"

import { useEffect, useRef } from "react"

interface BarChartProps {
  data: number[]
  height?: number
  barColor?: string
}

export default function BarChart({ data, height = 150, barColor = "#3EB489" }: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Find max value for scaling
    const maxValue = Math.max(...data, 1)

    // Calculate bar width based on canvas width and data length
    const barWidth = canvas.width / data.length

    // Draw bars
    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * (height - 20)

      ctx.fillStyle = barColor
      ctx.fillRect(index * barWidth, height - barHeight, barWidth - 1, barHeight)
    })
  }, [data, height, barColor])

  return <canvas ref={canvasRef} width={500} height={height} className="w-full h-auto mt-2" />
}
