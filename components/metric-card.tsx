import type React from "react"
import { InfoIcon as InfoCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MetricCardProps {
  title: string
  value: string
  icon?: React.ReactNode
  chart?: React.ReactNode
  hasInfo?: boolean
}

export default function MetricCard({ title, value, icon, chart, hasInfo = false }: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
          {hasInfo && <InfoCircle className="h-4 w-4 text-muted-foreground ml-1 inline-block" />}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {chart}
      </CardContent>
    </Card>
  )
}
