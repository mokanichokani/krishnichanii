import { Clock, ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

// Mock data
const requests = [
  {
    time: "22:16:34",
    day: "Today",
    status: 200,
    method: "GET",
    path: "/api/v1/books/36644",
    env: "prod",
    service: "Inventory Management",
    size: "4.5 KB",
    duration: "71 ms",
  },
  {
    time: "22:16:30",
    day: "Today",
    status: 200,
    method: "GET",
    path: "/api/v1/books/39965",
    env: "prod",
    service: "Franchise Book Shop",
    size: "5.4 KB",
    duration: "108 ms",
  },
  {
    time: "22:16:25",
    day: "Today",
    status: 200,
    method: "GET",
    path: "/api/v1/orders/32086/books?order=asc",
    env: "prod",
    service: "Fulfillment System",
    size: "3.3 KB",
    duration: "135 ms",
  },
  {
    time: "22:16:25",
    day: "Today",
    status: 200,
    method: "GET",
    path: "/api/v1/books?page=1&in_stock=true",
    env: "prod",
    service: "Franchise Book Shop",
    size: "187.1 KB",
    duration: "169 ms",
  },
  {
    time: "22:16:25",
    day: "Today",
    status: 200,
    method: "GET",
    path: "/api/v1/books?limit=20&price_min=20&category=Technology&price_max=50&page=1&in_stock=true",
    env: "prod",
    service: "Franchise Book Shop",
    size: "163.9 KB",
    duration: "84 ms",
  },
  {
    time: "22:16:22",
    day: "Today",
    status: 200,
    method: "GET",
    path: "/api/v1/orders/24522/books?order=asc",
    env: "prod",
    service: "Franchise Book Shop",
    size: "8.4 KB",
    duration: "116 ms",
  },
  {
    time: "22:16:17",
    day: "Today",
    status: 200,
    method: "GET",
    path: "/api/v1/books/37208",
    env: "prod",
    service: "Franchise Book Shop",
    size: "11.3 KB",
    duration: "57 ms",
  },
  {
    time: "22:16:15",
    day: "Today",
    status: 200,
    method: "GET",
    path: "/api/v1/orders?limit=50&order_date_from=2023-06-01&order_date_to=2023-06-30&min_total=50&sort_by=date",
    env: "prod",
    service: "Fulfillment System",
    size: "71.5 KB",
    duration: "92 ms",
  },
  {
    time: "22:16:08",
    day: "Today",
    status: 200,
    method: "GET",
    path: "/api/v1/books?category=Technology",
    env: "prod",
    service: "Franchise Book Shop",
    size: "82.8 KB",
    duration: "143 ms",
  },
  {
    time: "22:15:59",
    day: "Today",
    status: 200,
    method: "GET",
    path: "/api/v1/books?category=Technology&limit=20&in_stock=true&price_max=50&price_min=20",
    env: "prod",
    service: "Franchise Book Shop",
    size: "82.2 KB",
    duration: "154 ms",
  },
]

export default function RequestLogPage() {
  return (
    <div className="space-y-6">
      <div className="h-20 bg-gray-100 rounded-md flex items-center justify-center">
        <div className="flex space-x-1">
          {Array(24)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="w-2 h-10 bg-gray-300 rounded-sm"
                style={{
                  height: `${Math.max(10, Math.min(40, Math.random() * 40))}px`,
                  opacity: Math.random() * 0.5 + 0.5,
                }}
              ></div>
            ))}
        </div>
        <div className="absolute w-full bottom-0 flex justify-between px-4 text-xs text-gray-500">
          {Array(12)
            .fill(0)
            .map((_, i) => (
              <div key={i}>{`${(i * 2).toString().padStart(2, "0")}:00`}</div>
            ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Request</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div>{request.time}</div>
                        <div className="text-xs text-gray-500">{request.day}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`
                      ${
                        request.status >= 200 && request.status < 300
                          ? "bg-teal-500"
                          : request.status >= 400 && request.status < 500
                            ? "bg-red-500"
                            : request.status >= 500
                              ? "bg-red-700"
                              : "bg-gray-500"
                      } 
                      text-white hover:bg-opacity-90 hover:text-white
                    `}
                    >
                      {request.status}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`
                          ${
                            request.method === "GET"
                              ? "bg-teal-500"
                              : request.method === "POST"
                                ? "bg-blue-500"
                                : request.method === "PUT"
                                  ? "bg-purple-500"
                                  : request.method === "DELETE"
                                    ? "bg-red-500"
                                    : "bg-gray-500"
                          } 
                          text-white hover:bg-opacity-90 hover:text-white mr-2
                        `}
                        >
                          {request.method}
                        </Button>
                        <span className="font-mono text-sm">{request.path}</span>
                      </div>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <div className="flex items-center mr-4">
                          <div className="w-2 h-2 rounded-full bg-gray-400 mr-1"></div>
                          <span>{request.env}</span>
                        </div>
                        <div className="flex items-center mr-4">
                          <div className="w-2 h-2 rounded-full bg-teal-400 mr-1"></div>
                          <span>{request.service}</span>
                        </div>
                        <div className="flex items-center mr-4">
                          <span>{request.size}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{request.duration}</span>
                        </div>
                      </div>
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
