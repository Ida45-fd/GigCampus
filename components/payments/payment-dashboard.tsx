"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Clock, Shield, AlertTriangle, CheckCircle, CreditCard, Download, Eye } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { EscrowModal } from "./escrow-modal"
import { PaymentModal } from "./payment-modal"

export function PaymentDashboard() {
  const [selectedEscrow, setSelectedEscrow] = useState<any>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)

  const escrowTransactions = [
    {
      id: 1,
      project: "Mobile App UI Design",
      freelancer: {
        name: "Sarah Chen",
        avatar: "/asian-female-student.jpg",
        university: "Stanford University",
      },
      client: "TechStart Club",
      amount: 20000, // Updated to rupees (800 USD = ~20000 INR)
      status: "in-progress",
      progress: 75,
      milestones: [
        { name: "Initial Wireframes", amount: 5000, status: "completed", completedAt: "2024-01-15" }, // Updated to rupees
        { name: "High-Fidelity Designs", amount: 10000, status: "completed", completedAt: "2024-01-20" }, // Updated to rupees
        { name: "Final Delivery & Revisions", amount: 5000, status: "in-progress", dueDate: "2024-01-25" }, // Updated to rupees
      ],
      createdAt: "2024-01-10",
      dueDate: "2024-01-25",
      lastActivity: "2 hours ago",
    },
    {
      id: 2,
      project: "Logo Design - Quick Turnaround",
      freelancer: {
        name: "Marcus Johnson",
        avatar: "/african-american-male-student.jpg",
        university: "UC Berkeley",
      },
      client: "Innovation Society",
      amount: 3750, // Updated to rupees (150 USD = ~3750 INR)
      status: "pending-release",
      progress: 100,
      milestones: [
        { name: "Logo Concepts", amount: 1875, status: "completed", completedAt: "2024-01-18" }, // Updated to rupees
        { name: "Final Logo & Files", amount: 1875, status: "completed", completedAt: "2024-01-19" }, // Updated to rupees
      ],
      createdAt: "2024-01-17",
      dueDate: "2024-01-19",
      lastActivity: "1 day ago",
    },
    {
      id: 3,
      project: "Website Development",
      freelancer: {
        name: "Emma Rodriguez",
        avatar: "/latina-female-student.jpg",
        university: "NYU",
      },
      client: "Drama Club President",
      amount: 30000, // Updated to rupees (1200 USD = ~30000 INR)
      status: "dispute",
      progress: 60,
      milestones: [
        { name: "Frontend Development", amount: 15000, status: "completed", completedAt: "2024-01-12" }, // Updated to rupees
        { name: "Backend Integration", amount: 10000, status: "disputed", disputeReason: "Functionality issues" }, // Updated to rupees
        { name: "Testing & Deployment", amount: 5000, status: "pending", dueDate: "2024-01-30" }, // Updated to rupees
      ],
      createdAt: "2024-01-05",
      dueDate: "2024-01-30",
      lastActivity: "3 days ago",
    },
  ]

  const paymentHistory = [
    {
      id: 1,
      type: "escrow-deposit",
      project: "Mobile App UI Design",
      amount: 20000, // Updated to rupees
      status: "completed",
      date: "2024-01-10",
      method: "Credit Card",
      transactionId: "TXN-001",
    },
    {
      id: 2,
      type: "escrow-release",
      project: "Social Media Graphics",
      amount: 7500, // Updated to rupees (300 USD = ~7500 INR)
      status: "completed",
      date: "2024-01-08",
      method: "Escrow Release",
      transactionId: "TXN-002",
    },
    {
      id: 3,
      type: "platform-fee",
      project: "Logo Design",
      amount: 187.5, // Updated to rupees (7.5 USD = ~187.5 INR)
      status: "completed",
      date: "2024-01-19",
      method: "Auto-deducted",
      transactionId: "TXN-003",
    },
  ]

  const stats = [
    {
      title: "Total in Escrow",
      value: "₹53,750", // Updated to rupees with rupee symbol
      change: "3 active projects",
      icon: Shield,
      color: "text-blue-600",
    },
    {
      title: "Pending Releases",
      value: "₹3,750", // Updated to rupees with rupee symbol
      change: "1 awaiting approval",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Completed Payments",
      value: "₹1,08,000", // Updated to rupees with rupee symbol (4320 USD = ~108000 INR)
      change: "12 transactions",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Platform Fees",
      value: "₹5,400", // Updated to rupees with rupee symbol (216 USD = ~5400 INR)
      change: "5% commission",
      icon: DollarSign,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Payments & Escrow</h1>
          <p className="text-muted-foreground">Manage your secure payments and escrow transactions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Escrow Transactions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Active Escrow Transactions
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPaymentModal(true)}
                  className="bg-transparent"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  New Payment
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {escrowTransactions.map((transaction) => (
                  <div key={transaction.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h4 className="font-medium">{transaction.project}</h4>
                        <p className="text-sm text-muted-foreground">
                          {transaction.client} → {transaction.freelancer.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">₹{transaction.amount}</div> {/* Updated to rupee symbol */}
                        <Badge
                          variant={
                            transaction.status === "completed"
                              ? "default"
                              : transaction.status === "pending-release"
                                ? "secondary"
                                : transaction.status === "dispute"
                                  ? "destructive"
                                  : "outline"
                          }
                        >
                          {transaction.status === "in-progress"
                            ? "In Progress"
                            : transaction.status === "pending-release"
                              ? "Pending Release"
                              : transaction.status === "dispute"
                                ? "In Dispute"
                                : "Completed"}
                        </Badge>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Project Progress</span>
                        <span>{transaction.progress}%</span>
                      </div>
                      <Progress value={transaction.progress} className="h-2" />
                    </div>

                    {/* Milestones */}
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Milestones</h5>
                      {transaction.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            {milestone.status === "completed" && <CheckCircle className="h-4 w-4 text-green-500" />}
                            {milestone.status === "in-progress" && <Clock className="h-4 w-4 text-blue-500" />}
                            {milestone.status === "disputed" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                            {milestone.status === "pending" && <Clock className="h-4 w-4 text-gray-400" />}
                            <span>{milestone.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">₹{milestone.amount}</span> {/* Updated to rupee symbol */}
                            {milestone.status === "disputed" && (
                              <Badge variant="destructive" className="text-xs">
                                Disputed
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="text-sm text-muted-foreground">
                        Due: {transaction.dueDate} • Last activity: {transaction.lastActivity}
                      </div>
                      <div className="flex gap-2">
                        {transaction.status === "pending-release" && (
                          <Button size="sm" onClick={() => setSelectedEscrow(transaction)}>
                            Release Funds
                          </Button>
                        )}
                        {transaction.status === "dispute" && (
                          <Button size="sm" variant="outline" className="bg-transparent">
                            View Dispute
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedEscrow(transaction)}
                          className="bg-transparent"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Payment History & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Tax Documents
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Shield className="h-4 w-4 mr-2" />
                  Escrow Protection Info
                </Button>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {paymentHistory.slice(0, 5).map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {payment.type === "escrow-deposit"
                          ? "Escrow Deposit"
                          : payment.type === "escrow-release"
                            ? "Payment Released"
                            : "Platform Fee"}
                      </p>
                      <p className="text-xs text-muted-foreground">{payment.project}</p>
                      <p className="text-xs text-muted-foreground">{payment.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">
                        {payment.type === "platform-fee" ? "-" : ""}₹{payment.amount} {/* Updated to rupee symbol */}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full">
                  View All Transactions
                </Button>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-medium text-blue-900">Secure Escrow Protection</h4>
                    <p className="text-sm text-blue-800">
                      We hold payment safely in escrow. Release funds only when you approve the final delivery.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EscrowModal
        transaction={selectedEscrow}
        open={!!selectedEscrow}
        onOpenChange={(open) => !open && setSelectedEscrow(null)}
      />

      <PaymentModal open={showPaymentModal} onOpenChange={setShowPaymentModal} />
    </div>
  )
}
