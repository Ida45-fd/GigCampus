"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertTriangle, Shield, MessageSquare, Download } from "lucide-react"

interface EscrowModalProps {
  transaction: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EscrowModal({ transaction, open, onOpenChange }: EscrowModalProps) {
  const [showReleaseConfirm, setShowReleaseConfirm] = useState(false)
  const [showDispute, setShowDispute] = useState(false)
  const [disputeReason, setDisputeReason] = useState("")

  if (!transaction) return null

  const handleReleaseFunds = () => {
    // Handle fund release
    console.log("Releasing funds for transaction:", transaction.id)
    setShowReleaseConfirm(false)
    onOpenChange(false)
  }

  const handleDispute = () => {
    // Handle dispute creation
    console.log("Creating dispute:", disputeReason)
    setShowDispute(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Escrow Details: {transaction.project}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Transaction Overview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Total Amount</p>
              <p className="text-2xl font-bold">${transaction.amount}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Status</p>
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

          {/* Participants */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Client</p>
              <p className="text-sm">{transaction.client}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Freelancer</p>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={transaction.freelancer.avatar || "/placeholder.svg"}
                    alt={transaction.freelancer.name}
                  />
                  <AvatarFallback>
                    {transaction.freelancer.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">{transaction.freelancer.name}</p>
                  <p className="text-xs text-muted-foreground">{transaction.freelancer.university}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">Project Progress</p>
              <span className="text-sm font-medium">{transaction.progress}%</span>
            </div>
            <Progress value={transaction.progress} className="h-3" />
          </div>

          {/* Milestones */}
          <div className="space-y-3">
            <p className="text-sm font-medium">Milestones & Payments</p>
            <div className="space-y-3">
              {transaction.milestones.map((milestone: any, index: number) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {milestone.status === "completed" && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {milestone.status === "in-progress" && <Clock className="h-4 w-4 text-blue-500" />}
                      {milestone.status === "disputed" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                      {milestone.status === "pending" && <Clock className="h-4 w-4 text-gray-400" />}
                      <span className="font-medium">{milestone.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">${milestone.amount}</span>
                      {milestone.status === "disputed" && (
                        <Badge variant="destructive" className="text-xs">
                          Disputed
                        </Badge>
                      )}
                    </div>
                  </div>
                  {milestone.completedAt && (
                    <p className="text-xs text-muted-foreground">Completed: {milestone.completedAt}</p>
                  )}
                  {milestone.dueDate && milestone.status !== "completed" && (
                    <p className="text-xs text-muted-foreground">Due: {milestone.dueDate}</p>
                  )}
                  {milestone.disputeReason && (
                    <Alert className="mt-2">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="text-sm">Dispute: {milestone.disputeReason}</AlertDescription>
                    </Alert>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Timeline</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Created:</span> {transaction.createdAt}
              </div>
              <div>
                <span className="text-muted-foreground">Due Date:</span> {transaction.dueDate}
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <Alert className="border-blue-200 bg-blue-50">
            <Shield className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Escrow Protection:</strong> Funds are held securely until you approve the final delivery. You can
              request revisions or dispute if work doesn't meet requirements.
            </AlertDescription>
          </Alert>

          {/* Release Confirmation */}
          {showReleaseConfirm && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Confirm Fund Release:</strong> Are you satisfied with the delivered work? This action cannot be
                undone.
                <div className="flex gap-2 mt-3">
                  <Button size="sm" onClick={handleReleaseFunds}>
                    Yes, Release ${transaction.amount}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setShowReleaseConfirm(false)}>
                    Cancel
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Dispute Form */}
          {showDispute && (
            <div className="space-y-3">
              <p className="text-sm font-medium">Describe the Issue</p>
              <Textarea
                placeholder="Please describe what issues you're experiencing with the delivered work..."
                value={disputeReason}
                onChange={(e) => setDisputeReason(e.target.value)}
                rows={4}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleDispute} disabled={!disputeReason.trim()}>
                  Submit Dispute
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowDispute(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {!showReleaseConfirm && !showDispute && (
            <div className="flex gap-3 pt-4 border-t">
              {transaction.status === "pending-release" && (
                <>
                  <Button onClick={() => setShowReleaseConfirm(true)} className="flex-1">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Release Funds
                  </Button>
                  <Button variant="outline" onClick={() => setShowDispute(true)} className="flex-1 bg-transparent">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Request Revision
                  </Button>
                </>
              )}

              {transaction.status === "in-progress" && (
                <Button variant="outline" onClick={() => setShowDispute(true)} className="flex-1 bg-transparent">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Freelancer
                </Button>
              )}

              <Button variant="outline" className="bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
