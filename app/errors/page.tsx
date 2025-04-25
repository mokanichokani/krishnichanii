import { AlertCircle } from "lucide-react"
import MetricCard from "@/components/metric-card"
import BarChart from "@/components/bar-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

// Mock data
const hourlyData = Array(24)
  .fill(0)
  .map(() => Math.floor(Math.random() * 60) + 10)
const errors = [
  {
    status: "422",
    message: "Unprocessable Content",
    endpoint: "/v1/books",
    method: "GET",
    occurrences: 285,
    consumers: 2,
  },
  {
    status: "404",
    message: "Not Found",
    endpoint: "/v1/books/{book_id}",
    method: "GET",
    occurrences: 221,
    consumers: 2,
  },
  {
    status: "404",
    message: "Not Found",
    endpoint: "/v1/orders/{order_id}",
    method: "GET",
    occurrences: 170,
    consumers: 2,
  },
  {
    status: "404",
    message: "Not Found",
    endpoint: "/v1/orders/{order_id}/books",
    method: "GET",
    occurrences: 140,
    consumers: 2,
  },
  {
    status: "404",
    message: "Not Found",
    endpoint: "/v1/orders/{order_id}",
    method: "PUT",
    occurrences: 42,
    consumers: 2,
  },
  {
    status: "422",
    message: "Unprocessable Content",
    endpoint: "/v1/orders/{order_id}",
    method: "PUT",
    occurrences: 34,
    consumers: 2,
  },
  {
    status: "404",
    message: "Not Found",
    endpoint: "/v1/books/{book_id}/orders",
    method: "GET",
    occurrences: 33,
    consumers: 1,
  },
  {
    status: "422",
    message: "Unprocessable Content",
    endpoint: "/v1/orders",
    method: "POST",
    occurrences: 27,
    consumers: 1,
  },
  { status: "400", message: "Bad Request", endpoint: "/v1/orders", method: "POST", occurrences: 23, consumers: 1 },
]

export default function ErrorsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total errors"
          value="1,042"
          icon={<AlertCircle className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard title="Client errors" value="1,030" hasInfo={true} />
        <MetricCard title="Server errors" value="12" hasInfo={true} />
        <MetricCard title="Error rate" value="5.2 %" hasInfo={true} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Number of client and server errors</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={hourlyData} height={200} barColor="#E57373" />
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
              placeholder="Search errors"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Response status</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead className="text-right">
                  Occurrences
                  <ChevronDown className="h-4 w-4 inline-block ml-1" />
                </TableHead>
                <TableHead className="text-right">Consumers</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {errors.map((error, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`
                      ${error.status.startsWith("4") ? "bg-red-400" : "bg-red-600"} 
                      text-white hover:bg-opacity-90 hover:text-white
                    `}
                    >
                      {error.status}
                    </Button>
                  </TableCell>
                  <TableCell>{error.message}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`
                        ${
                          error.method === "GET"
                            ? "bg-teal-500"
                            : error.method === "POST"
                              ? "bg-blue-500"
                              : error.method === "PUT"
                                ? "bg-purple-500"
                                : error.method === "DELETE"
                                  ? "bg-red-500"
                                  : "bg-gray-500"
                        } 
                        text-white hover:bg-opacity-90 hover:text-white mr-2
                      `}
                      >
                        {error.method}
                      </Button>
                      {error.endpoint}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{error.occurrences}</TableCell>
                  <TableCell className="text-right">{error.consumers}</TableCell>
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
