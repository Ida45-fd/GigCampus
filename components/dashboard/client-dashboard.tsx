"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, FileText, Users, DollarSign, Star, MessageSquare, CheckCircle, Calendar } from "lucide-react"
import { DashboardLayout } from "./dashboard-layout"
import { useState } from "react"
import { PostProjectModal } from "./post-project-modal"
import Link from "next/link"

export function ClientDashboard() {
  const [showPostProject, setShowPostProject] = useState(false)

  const stats = [
    {
      title: "Active Projects",
      value: "4",
      change: "+2 this month",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Total Proposals",
      value: "23",
      change: "8 new today",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "In Escrow",
      value: "₹61,250", // Updated to rupees with rupee symbol (2450 USD = ~61250 INR)
      change: "3 pending releases",
      icon: DollarSign,
      color: "text-yellow-600",
    },
    {
      title: "Avg. Rating Given",
      value: "4.8",
      change: "Excellent feedback",
      icon: Star,
      color: "text-purple-600",
    },
  ]

  const activeProjects = [
    {
      id: 1,
      title: "Mobile App UI Design",
      description: "Need a modern UI design for our student productivity app",
      budget: "₹20,000", // Updated to rupees with rupee symbol
      proposals: 12,
      status: "reviewing",
      deadline: "2 weeks",
      category: "Design",
      postedDate: "3 days ago",
    },
    {
      id: 2,
      title: "Social Media Content Creation",
      description: "Weekly social media posts for our campus coffee shop",
      budget: "₹7,500/month", // Updated to rupees with rupee symbol
      proposals: 8,
      status: "in-progress",
      deadline: "Ongoing",
      category: "Marketing",
      postedDate: "1 week ago",
    },
    {
      id: 3,
      title: "Website Development",
      description: "Build a simple website for our student organization",
      budget: "₹30,000", // Updated to rupees with rupee symbol
      proposals: 15,
      status: "reviewing",
      deadline: "1 month",
      category: "Development",
      postedDate: "2 days ago",
    },
  ]

  const recentProposals = [
    {
      id: 1,
      projectTitle: "Mobile App UI Design",
      freelancer: {
        name: "Sarah Chen",
        avatar: "/asian-female-student.jpg",
        rating: 4.9,
        university: "Stanford University",
        verified: true,
      },
      proposal: "I have 3+ years of UI/UX design experience and have worked on similar mobile apps...",
      budget: "₹18,750", // Updated to rupees with rupee symbol
      timeline: "10 days",
      submittedAt: "2 hours ago",
    },
    {
      id: 2,
      projectTitle: "Website Development",
      freelancer: {
        name: "Marcus Johnson",
        avatar: "/african-american-male-student.jpg",
        rating: 4.8,
        university: "UC Berkeley",
        verified: true,
      },
      proposal: "I'm a Computer Science student with experience in React and Node.js...",
      budget: "₹27,500", // Updated to rupees with rupee symbol
      timeline: "3 weeks",
      submittedAt: "4 hours ago",
    },
    {
      id: 3,
      projectTitle: "Social Media Content",
      freelancer: {
        name: "Emma Rodriguez",
        avatar: "/latina-female-student.jpg",
        rating: 5.0,
        university: "NYU",
        verified: true,
      },
      proposal: "I've managed social media for 5+ local businesses and understand campus culture...",
      budget: "₹7,000/month", // Updated to rupees with rupee symbol
      timeline: "Start immediately",
      submittedAt: "6 hours ago",
    },
  ]

  const escrowTransactions = [
    {
      id: 1,
      project: "Logo Design for Drama Club",
      freelancer: "Alex Kim",
      amount: "₹5,000", // Updated to rupees with rupee symbol
      status: "pending-release",
      dueDate: "Today",
    },
    {
      id: 2,
      project: "Event Photography",
      freelancer: "Jordan Smith",
      amount: "₹8,750", // Updated to rupees with rupee symbol
      status: "in-progress",
      dueDate: "3 days",
    },
    {
      id: 3,
      project: "Website Copy Writing",
      freelancer: "Taylor Brown",
      amount: "₹3,750", // Updated to rupees with rupee symbol
      status: "completed",
      dueDate: "Released",
    },
  ]

  return (
    <>
      <DashboardLayout userType="client">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, Jane!</h1>
              <p className="text-muted-foreground">Manage your projects and find talented student freelancers</p>
            </div>
            <Button className="flex items-center gap-2" onClick={() => setShowPostProject(true)}>
              <Plus className="h-4 w-4" />
              Post New Project
            </Button>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Projects */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Active Projects</CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeProjects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{project.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {project.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                        </div>
                        <Badge variant={project.status === "in-progress" ? "default" : "secondary"} className="ml-2">
                          {project.status === "in-progress" ? "In Progress" : "Reviewing"}
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-4">
                          <span className="font-medium">{project.budget}</span>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{project.proposals} proposals</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{project.deadline}</span>
                          </div>
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

            {/* Escrow Status */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    Escrow Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {escrowTransactions.map((transaction) => (
                    <div key={transaction.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{transaction.project}</p>
                          <p className="text-xs text-muted-foreground">{transaction.freelancer}</p>
                        </div>
                        <Badge
                          variant={
                            transaction.status === "pending-release"
                              ? "destructive"
                              : transaction.status === "completed"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {transaction.status === "pending-release"
                            ? "Release Funds"
                            : transaction.status === "completed"
                              ? "Completed"
                              : "In Progress"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">{transaction.amount}</span>
                        <span className="text-xs text-muted-foreground">{transaction.dueDate}</span>
                      </div>
                      {transaction.status === "pending-release" && (
                        <Button size="sm" className="w-full">
                          Release Payment
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => setShowPostProject(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Post New Project
                  </Button>
                  <Link href="/freelancers">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Browse Freelancers
                    </Button>
                  </Link>
                  <Link href="/chat">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Messages
                    </Button>
                  </Link>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    View Reports
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Proposals */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Proposals</CardTitle>
              <Badge variant="secondary">8 new today</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentProposals.map((proposal) => (
                <div key={proposal.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="font-medium">{proposal.projectTitle}</h4>
                      <p className="text-sm text-muted-foreground">Submitted {proposal.submittedAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        View Full Proposal
                      </Button>
                      <Button size="sm">Shortlist</Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={proposal.freelancer.avatar || "/placeholder.svg"}
                        alt={proposal.freelancer.name}
                      />
                      <AvatarFallback>
                        {proposal.freelancer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{proposal.freelancer.name}</p>
                        {proposal.freelancer.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{proposal.freelancer.university}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{proposal.freelancer.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{proposal.budget}</p>
                      <p className="text-xs text-muted-foreground">{proposal.timeline}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{proposal.proposal}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>

      <PostProjectModal open={showPostProject} onOpenChange={setShowPostProject} />
    </>
  )
}
