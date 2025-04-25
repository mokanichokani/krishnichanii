import LineChart from "@/components/line-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { InfoIcon as InfoCircle, SmileIcon } from "lucide-react"

// Mock data
const apdexData = Array(24)
  .fill(0)
  .map(() => 0.85 + Math.random() * 0.15)
const responseTimeData = Array(24)
  .fill(0)
  .map(() => Math.floor(Math.random() * 100) + 50)

const endpoints = [
  {
    method: "GET",
    path: "/v1/books/{book_id}/orders",
    apdex: 0.888,
    requests: 596,
    p50: "120 ms",
    p75: "150 ms",
    p95: "190 ms",
  },
  { method: "GET", path: "/v1/orders", apdex: 0.895, requests: 1968, p50: "120 ms", p75: "150 ms", p95: "190 ms" },
  {
    method: "GET",
    path: "/v1/orders/{order_id}/books",
    apdex: 0.905,
    requests: 2715,
    p50: "120 ms",
    p75: "150 ms",
    p95: "190 ms",
  },
  { method: "GET", path: "/v1/books", apdex: 0.933, requests: 5125, p50: "120 ms", p75: "150 ms", p95: "190 ms" },
  {
    method: "GET",
    path: "/v1/orders/{order_id}",
    apdex: 0.983,
    requests: 3250,
    p50: "80 ms",
    p75: "110 ms",
    p95: "150 ms",
  },
  {
    method: "GET",
    path: "/v1/books/{book_id}",
    apdex: 0.984,
    requests: 4085,
    p50: "80 ms",
    p75: "110 ms",
    p95: "150 ms",
  },
  { method: "POST", path: "/v1/books", apdex: 0.988, requests: 84, p50: "110 ms", p75: "130 ms", p95: "180 ms" },
  { method: "POST", path: "/v1/books", apdex: 0.988, requests: 84, p50: "110 ms", p75: "130 ms", p95: "180 ms" },
  { method: "POST", path: "/v1/orders", apdex: 0.999, requests: 707, p50: "100 ms", p75: "120 ms", p95: "170 ms" },
  {
    method: "PUT",
    path: "/v1/orders/{order_id}",
    apdex: 0.999,
    requests: 888,
    p50: "60 ms",
    p75: "90 ms",
    p95: "130 ms",
  },
]

export default function PerformancePage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Apdex score
              <InfoCircle className="h-4 w-4 text-muted-foreground ml-1 inline-block" />
            </CardTitle>
            <Button variant="ghost" size="icon">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">0.950</div>
              <div className="ml-2 text-green-500">
                <SmileIcon className="h-6 w-6" />
              </div>
            </div>
            <LineChart data={apdexData} height={200} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Response time (p50)
              <InfoCircle className="h-4 w-4 text-muted-foreground ml-1 inline-block" />
            </CardTitle>
            <Button variant="ghost" size="icon">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100 ms</div>
            <LineChart data={responseTimeData} height={200} lineColor="#64B5F6" fillColor="rgba(100, 181, 246, 0.1)" />
          </CardContent>
        </Card>
      </div>

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
                <TableHead>Endpoint</TableHead>
                <TableHead className="text-right">
                  Apdex score
                  <ChevronDown className="h-4 w-4 inline-block ml-1" />
                </TableHead>
                <TableHead className="text-right">Requests</TableHead>
                <TableHead className="text-right">p50</TableHead>
                <TableHead className="text-right">p75</TableHead>
                <TableHead className="text-right">p95</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {endpoints.map((endpoint, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center">
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
                        text-white hover:bg-opacity-90 hover:text-white mr-2
                      `}
                      >
                        {endpoint.method}
                      </Button>
                      {endpoint.path}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{endpoint.apdex.toFixed(3)}</TableCell>
                  <TableCell className="text-right">{endpoint.requests.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{endpoint.p50}</TableCell>
                  <TableCell className="text-right">{endpoint.p75}</TableCell>
                  <TableCell className="text-right">{endpoint.p95}</TableCell>
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
