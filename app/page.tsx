import { BarChart2 } from "lucide-react"
import MetricCard from "@/components/metric-card"
import BarChart from "@/components/bar-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

// Mock data
const hourlyData = Array(24)
  .fill(0)
  .map(() => Math.floor(Math.random() * 1000) + 200)
const endpoints = [
  { method: "GET", path: "/v1/books", requests: 5120, errorRate: "5.7 %", dataTransferred: "490.6 MB" },
  { method: "GET", path: "/v1/books/{book_id}", requests: 4074, errorRate: "5.6 %", dataTransferred: "19.2 MB" },
  { method: "GET", path: "/v1/orders/{order_id}", requests: 3229, errorRate: "5.3 %", dataTransferred: "9.3 MB" },
  { method: "GET", path: "/v1/orders/{order_id}/books", requests: 2714, errorRate: "5.2 %", dataTransferred: "26 MB" },
  { method: "GET", path: "/v1/orders", requests: 1962, errorRate: "0.0 %", dataTransferred: "101.3 MB" },
  { method: "PUT", path: "/v1/orders/{order_id}", requests: 885, errorRate: "8.6 %", dataTransferred: "6.9 MB" },
  { method: "POST", path: "/v1/orders", requests: 705, errorRate: "7.1 %", dataTransferred: "8.4 MB" },
  { method: "GET", path: "/v1/books/{book_id}/orders", requests: 598, errorRate: "5.5 %", dataTransferred: "17.4 MB" },
]

export default function TrafficPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total requests"
          value="20,002"
          icon={<BarChart2 className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard title="Requests per minute" value="13.89" hasInfo={true} />
        <MetricCard title="Error rate" value="5.2 %" hasInfo={true} />
        <MetricCard title="Data transferred" value="679.9 MB" hasInfo={true} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Number of requests</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={hourlyData} height={200} />
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {Array(12)
              .fill(0)
              .map((_, i) => (
                <div key={i}>{`${(i * 2).toString().padStart(2, "0")}:00`}</div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <input
              type="text"
              placeholder="Search endpoints"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead className="text-right">
                  Requests
                  <ChevronDown className="h-4 w-4 inline-block ml-1" />
                </TableHead>
                <TableHead className="text-right">Error rate</TableHead>
                <TableHead className="text-right">Data transferred</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {endpoints.map((endpoint, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`
                      ${
                        endpoint.method === "GET"
                          ? "bg-teal-500"
                          : endpoint.method === "POST"
                            ? "bg-blue-500"
                            : endpoint.method === "PUT"
                              ? "bg-purple-500"
                              : endpoint.method === "DELETE"
                                ? "bg-red-500"
                                : "bg-gray-500"
                      } 
                      text-white hover:bg-opacity-90 hover:text-white
                    `}
                    >
                      {endpoint.method}
                    </Button>
                  </TableCell>
                  <TableCell>{endpoint.path}</TableCell>
                  <TableCell className="text-right">{endpoint.requests.toLocaleString()}</TableCell>
                  <TableCell
                    className={`text-right ${Number.parseFloat(endpoint.errorRate) > 5 ? "text-red-500" : ""}`}
                  >
                    {endpoint.errorRate}
                  </TableCell>
                  <TableCell className="text-right">{endpoint.dataTransferred}</TableCell>
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
      <iframe src="http://10.10.118.178:3005/d-solo/bejv8tr0yhgjka/customer-service-logs-volume?orgId=1&from=1745474556813&to=1745496156813&timezone=browser&var-service=$_all&panelId=7&_feature.dashboardSceneSolo" width="450" height="200" frameborder="0"></iframe>
    </div>
  )
}
