"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  Clock,
  Star,
  Plus,
  Search,
  FileText,
  Bell,
  Calendar,
  ExternalLink,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { DashboardLayout } from "./dashboard-layout"

export function StudentDashboard() {
  const stats = [
    {
      title: "Active Gigs",
      value: "3",
      change: "+1 this week",
      icon: Clock,
      color: "text-blue-600",
    },
    {
      title: "Pending Proposals",
      value: "5",
      change: "2 new today",
      icon: FileText,
      color: "text-yellow-600",
    },
    {
      title: "Balance",
      value: "₹31,175", // Updated to rupees (1247 USD = ~31175 INR)
      change: "+₹8,000 this month", // Updated to rupees (320 USD = ~8000 INR)
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Reputation Score",
      value: "4.9",
      change: "98% positive",
      icon: Star,
      color: "text-purple-600",
    },
  ]

  const activeGigs = [
    {
      id: 1,
      title: "Logo Design for Student Club",
      client: "Stanford Drama Club",
      deadline: "2 days",
      progress: 75,
      amount: "₹3,750", // Updated to rupees (150 USD = ~3750 INR)
      status: "in-progress",
    },
    {
      id: 2,
      title: "Social Media Graphics",
      client: "Campus Coffee Shop",
      deadline: "5 days",
      progress: 30,
      amount: "₹5,000", // Updated to rupees (200 USD = ~5000 INR)
      status: "in-progress",
    },
    {
      id: 3,
      title: "Website Mockup",
      client: "Tech Startup",
      deadline: "1 week",
      progress: 10,
      amount: "₹10,000", // Updated to rupees (400 USD = ~10000 INR)
      status: "in-progress",
    },
  ]

  const recentNotifications = [
    {
      id: 1,
      type: "proposal-accepted",
      message: "Your proposal for 'Mobile App UI Design' was accepted!",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      type: "payment-received",
      message: "Payment of ₹3,750 received for 'Logo Design'", // Updated to rupees (150 USD = ~3750 INR)
      time: "1 day ago",
      unread: true,
    },
    {
      id: 3,
      type: "deadline-reminder",
      message: "Reminder: 'Social Media Graphics' due in 2 days",
      time: "1 day ago",
      unread: false,
    },
  ]

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, Alex!</h1>
            <p className="text-muted-foreground">Here's what's happening with your freelance work</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified Student
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <IconComponent className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-auto p-4 flex flex-col items-center gap-2">
                <Plus className="h-5 w-5" />
                <span className="text-sm">Create Gig</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <Search className="h-5 w-5" />
                <span className="text-sm">Browse Projects</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <ExternalLink className="h-5 w-5" />
                <span className="text-sm">Export Portfolio</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <FileText className="h-5 w-5" />
                <span className="text-sm">View Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Gigs */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Active Gigs</CardTitle>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeGigs.map((gig) => (
                  <div key={gig.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="font-medium">{gig.title}</h4>
                        <p className="text-sm text-muted-foreground">{gig.client}</p>
                      </div>
                      <Badge variant="outline">{gig.amount}</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{gig.progress}%</span>
                      </div>
                      <Progress value={gig.progress} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Due in {gig.deadline}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Notifications & Upcoming */}
          <div className="space-y-6">
            {/* Notifications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                </CardTitle>
                <Badge variant="secondary">2 new</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${
                      notification.unread ? "bg-primary/5 border-primary/20" : "bg-muted/30"
                    }`}
                  >
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Logo Design</span>
                    <Badge variant="destructive" className="text-xs">
                      2 days
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Social Media Graphics</span>
                    <Badge variant="secondary" className="text-xs">
                      5 days
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Website Mockup</span>
                    <Badge variant="secondary" className="text-xs">
                      1 week
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Portfolio Preview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Portfolio Highlights</CardTitle>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Export to LinkedIn
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border rounded-lg p-4 space-y-2">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h4 className="font-medium text-sm">Project {item}</h4>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">5.0 rating</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
