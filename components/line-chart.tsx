"use client"

import { useEffect, useRef } from "react"

interface LineChartProps {
  data: number[]
  height?: number
  lineColor?: string
  fillColor?: string
}

export default function LineChart({
  data,
  height = 150,
  lineColor = "#3EB489",
  fillColor = "rgba(62, 180, 137, 0.1)",
}: LineChartProps) {
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

    // Calculate point spacing based on canvas width and data length
    const pointSpacing = canvas.width / (data.length - 1)

    // Draw line
    ctx.beginPath()
    ctx.moveTo(0, height - (data[0] / maxValue) * (height - 20))

    data.forEach((value, index) => {
      if (index === 0) return

      const x = index * pointSpacing
      const y = height - (value / maxValue) * (height - 20)

      ctx.lineTo(x, y)
    })

    // Line style
    ctx.strokeStyle = lineColor
    ctx.lineWidth = 2
    ctx.stroke()

    // Fill area under the line
    ctx.lineTo(canvas.width, height)
    ctx.lineTo(0, height)
    ctx.closePath()
    ctx.fillStyle = fillColor
    ctx.fill()
  }, [data, height, lineColor, fillColor])

  return <canvas ref={canvasRef} width={500} height={height} className="w-full h-auto mt-2" />
}
