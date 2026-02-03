"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Shield, Info, CheckCircle } from "lucide-react"

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PaymentModal({ open, onOpenChange }: PaymentModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentData, setPaymentData] = useState({
    project: "",
    amount: "",
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
  })

  const projects = [
    { id: 1, title: "Mobile App UI Design", freelancer: "Sarah Chen", amount: 800 },
    { id: 2, title: "Logo Design", freelancer: "Marcus Johnson", amount: 150 },
    { id: 3, title: "Website Development", freelancer: "Emma Rodriguez", amount: 1200 },
  ]

  const handlePayment = () => {
    // Handle payment processing
    console.log("Processing payment:", paymentData)
    setCurrentStep(3)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Secure Payment
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step 1: Select Project */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Project</Label>
                <Select onValueChange={(value) => setPaymentData({ ...paymentData, project: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a project to fund" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id.toString()}>
                        {project.title} - ${project.amount}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {paymentData.project && (
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Project Amount:</span>
                        <span className="font-medium">
                          ${projects.find((p) => p.id.toString() === paymentData.project)?.amount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Platform Fee (5%):</span>
                        <span className="font-medium">
                          $
                          {(
                            (projects.find((p) => p.id.toString() === paymentData.project)?.amount || 0) * 0.05
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-medium">Total:</span>
                        <span className="font-bold">
                          $
                          {(
                            (projects.find((p) => p.id.toString() === paymentData.project)?.amount || 0) * 1.05
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button onClick={() => setCurrentStep(2)} disabled={!paymentData.project} className="w-full">
                Continue to Payment
              </Button>
            </div>
          )}

          {/* Step 2: Payment Details */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <Alert className="border-blue-200 bg-blue-50">
                <Shield className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  Your payment will be held in secure escrow until you approve the final delivery.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select onValueChange={(value) => setPaymentData({ ...paymentData, paymentMethod: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit-card">Credit Card</SelectItem>
                    <SelectItem value="debit-card">Debit Card</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="razorpay">Razorpay</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {paymentData.paymentMethod === "credit-card" && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        value={paymentData.expiryDate}
                        onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Fees:</strong> We charge a 5% platform fee. Funds are released only when you approve the final
                  delivery.
                </AlertDescription>
              </Alert>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1 bg-transparent">
                  Back
                </Button>
                <Button onClick={handlePayment} className="flex-1">
                  Pay Securely
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {currentStep === 3 && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Payment Successful!</h3>
                <p className="text-muted-foreground">
                  Your payment has been securely deposited into escrow. The freelancer will be notified to begin work.
                </p>
              </div>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Transaction ID:</span>
                      <span className="font-mono">TXN-{Date.now()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount in Escrow:</span>
                      <span className="font-medium">
                        ${projects.find((p) => p.id.toString() === paymentData.project)?.amount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <Badge variant="secondary">Funds Secured</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={() => onOpenChange(false)} className="w-full">
                View Escrow Dashboard
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
