import { ChevronRight, Clock, RefreshCw, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800 mr-2">Traffic</h1>
          <ChevronRight className="h-5 w-5 text-gray-400" />
          <div className="flex items-center">
            <span className="text-gray-800 ml-2">Boundless Bookstore API</span>
            <span className="ml-2 px-2 py-0.5 text-xs rounded-md bg-gray-100 text-gray-600">Demo</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center border rounded-md px-3 py-1.5 bg-white">
            <Clock className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">24 hours</span>
            <ChevronRight className="h-4 w-4 text-gray-400 rotate-90 ml-2" />
          </div>
          <div className="flex items-center border rounded-md px-3 py-1.5 bg-white">
            <span className="text-sm text-gray-700">All envs</span>
            <ChevronRight className="h-4 w-4 text-gray-400 rotate-90 ml-2" />
          </div>
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full bg-teal-500 text-white hover:bg-teal-600">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
