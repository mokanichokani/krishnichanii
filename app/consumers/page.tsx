import { Users } from "lucide-react"
import MetricCard from "@/components/metric-card"
import BarChart from "@/components/bar-chart"
import LineChart from "@/components/line-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronDown, Clock, InfoIcon as InfoCircle } from "lucide-react"

// Mock data
const dailyData = Array(30)
  .fill(0)
  .map(() => Math.floor(Math.random() * 30) + 10)

const consumers = [
  {
    name: "The Cozy Nook",
    email: "contact@thecozynook.com",
    requests: 12827,
    errorRate: "0.0 %",
    lastRequest: "5 minutes ago",
    graphData: Array(10)
      .fill(0)
      .map(() => Math.floor(Math.random() * 100) + 50),
  },
  {
    name: "Novel Nest",
    email: "hello@novelnest.com",
    requests: 5640,
    errorRate: "0.1 %",
    lastRequest: "7 hours ago",
    graphData: Array(10)
      .fill(0)
      .map(() => Math.floor(Math.random() * 100) + 50),
  },
  {
    name: "Biblio Bliss",
    email: "team@bibliobliss.com",
    requests: 4960,
    errorRate: "0.4 %",
    lastRequest: "5 minutes ago",
    graphData: Array(10)
      .fill(0)
      .map(() => Math.floor(Math.random() * 100) + 50),
  },
  {
    name: "Aurora Reads",
    email: "mail@aurorareads.com",
    requests: 4265,
    errorRate: "0.2 %",
    lastRequest: "15 hours ago",
    graphData: Array(10)
      .fill(0)
      .map(() => Math.floor(Math.random() * 100) + 50),
  },
  {
    name: "Chapter & Charm",
    email: "info@chaptercharm.books",
    requests: 4250,
    errorRate: "0.2 %",
    lastRequest: "8 hours ago",
    graphData: Array(10)
      .fill(0)
      .map(() => Math.floor(Math.random() * 100) + 50),
    isNew: true,
  },
  {
    name: "The Literary Loft",
    email: "dev@theliteraryloft.com",
    requests: 3610,
    errorRate: "0.4 %",
    lastRequest: "1 day ago",
    graphData: Array(10)
      .fill(0)
      .map(() => Math.floor(Math.random() * 100) + 50),
  },
  {
    name: "Inkspire Stories",
    email: "hello@inkspirestories.com",
    requests: 3234,
    errorRate: "0.0 %",
    lastRequest: "14 hours ago",
    graphData: Array(10)
      .fill(0)
      .map(() => Math.floor(Math.random() * 100) + 50),
  },
]

export default function ConsumersPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetricCard title="Total consumers" value="164" icon={<Users className="h-4 w-4 text-muted-foreground" />} />
        <MetricCard title="New consumers" value="76" hasInfo={true} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Number of unique consumers</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={dailyData} height={200} />
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {Array(15)
              .fill(0)
              .map((_, i) => (
                <div key={i}>{`${i * 2 + 19} Nov`}</div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="Search consumers"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Consumer name</TableHead>
                <TableHead>
                  Graph
                  <InfoCircle className="h-4 w-4 inline-block ml-1" />
                </TableHead>
                <TableHead className="text-right">
                  Requests
                  <ChevronDown className="h-4 w-4 inline-block ml-1" />
                </TableHead>
                <TableHead className="text-right">Error rate</TableHead>
                <TableHead className="text-right">Last request</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {consumers.map((consumer, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-teal-500 mr-2" />
                        <span className="text-teal-500">{consumer.name}</span>
                        {consumer.isNew && (
                          <span className="ml-2 px-2 py-0.5 text-xs rounded-md bg-gray-100 text-gray-600">New</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{consumer.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-32 h-10">
                      <LineChart
                        data={consumer.graphData}
                        height={40}
                        lineColor="#3EB489"
                        fillColor="rgba(62, 180, 137, 0.1)"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{consumer.requests.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{consumer.errorRate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      <span>{consumer.lastRequest}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
