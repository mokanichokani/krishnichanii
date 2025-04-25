import Link from "next/link"
import {
  LayoutDashboard,
  BarChart,
  AlertCircle,
  Zap,
  Users,
  Target,
  FileText,
  Clock,
  Bell,
  HelpCircle,
  MessageSquare,
  Settings,
  User,
} from "lucide-react"

export default function Sidebar() {
  return (
    <div className="w-56 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="font-bold text-xl text-gray-800">APITALLY</div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          <li>
            <Link href="/apps" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <LayoutDashboard className="h-5 w-5 mr-3" />
              <span>Apps</span>
            </Link>
          </li>
          <li>
            <Link href="/" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <BarChart className="h-5 w-5 mr-3" />
              <span>Traffic</span>
            </Link>
          </li>
          <li>
            <Link href="/errors" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <AlertCircle className="h-5 w-5 mr-3" />
              <span>Errors</span>
            </Link>
          </li>
          <li>
            <Link
              href="/performance"
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <Zap className="h-5 w-5 mr-3" />
              <span>Performance</span>
            </Link>
          </li>
          <li>
            <Link href="/consumers" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <Users className="h-5 w-5 mr-3" />
              <span>Consumers</span>
            </Link>
          </li>
          <li>
            <Link href="/endpoints" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <Target className="h-5 w-5 mr-3" />
              <span>Endpoints</span>
            </Link>
          </li>
          <li>
            <Link
              href="/request-log"
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <FileText className="h-5 w-5 mr-3" />
              <span>Request log</span>
            </Link>
          </li>
          <li>
            <Link href="/uptime" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <Clock className="h-5 w-5 mr-3" />
              <span>Uptime</span>
            </Link>
          </li>
          <li>
            <Link href="/alerts" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <Bell className="h-5 w-5 mr-3" />
              <span>Alerts</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <ul className="space-y-1">
          <li>
            <Link href="/whats-new" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <HelpCircle className="h-5 w-5 mr-3" />
              <span>What's new</span>
            </Link>
          </li>
          <li>
            <Link href="/support" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <HelpCircle className="h-5 w-5 mr-3" />
              <span>Support</span>
            </Link>
          </li>
          <li>
            <Link href="/feedback" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <MessageSquare className="h-5 w-5 mr-3" />
              <span>Feedback</span>
            </Link>
          </li>
          <li>
            <Link href="/settings" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
              <Settings className="h-5 w-5 mr-3" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white mr-3">
            <User className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-medium">Simon Gurcke</div>
            <div className="text-xs text-gray-500">Cosmic Code</div>
          </div>
        </div>
      </div>
    </div>
  )
}
