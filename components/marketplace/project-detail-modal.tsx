"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Star, Clock, DollarSign, Users, CheckCircle, Calendar, Send } from "lucide-react"
import { projectStore } from "@/lib/project-store"

interface ProjectDetailModalProps {
  project: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectDetailModal({ project, open, onOpenChange }: ProjectDetailModalProps) {
  const [showProposalForm, setShowProposalForm] = useState(false)
  const [proposal, setProposal] = useState({
    pitch: "",
    budget: "",
    timeline: "",
    attachments: [] as File[],
  })

  if (!project) return null

  const handleSubmitProposal = () => {
    const proposalData = {
      projectId: project.id,
      freelancer: {
        name: "Current Student", // This would come from auth context
        avatar: "/placeholder.svg",
        rating: 4.7,
        university: "Stanford University",
        verified: true,
      },
      ...proposal,
    }

    projectStore.addProposal(proposalData)

    console.log("Submitting proposal:", proposal)
    alert("Proposal submitted successfully! The client will review it soon.")
    setShowProposalForm(false)
    onOpenChange(false)

    // Reset proposal form
    setProposal({
      pitch: "",
      budget: "",
      timeline: "",
      attachments: [],
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {project.title}
            {project.featured && (
              <Badge variant="default" className="text-xs">
                Featured
              </Badge>
            )}
            {project.urgent && (
              <Badge variant="destructive" className="text-xs">
                Urgent
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Description */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Project Description</h3>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
              </CardContent>
            </Card>

            {/* Skills Required */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill: string) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Project Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Budget:{" "}
                      <strong>
                        {project.budget.currency}
                        {project.budget.amount}
                        {project.budget.type === "hourly" && "/hr"}
                      </strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Timeline: <strong>{project.timeline}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Proposals: <strong>{project.proposals}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Posted: <strong>{project.postedAt}</strong>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Proposal Form */}
            {showProposalForm && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Submit Your Proposal</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pitch">Your Pitch (200 characters max)</Label>
                      <Textarea
                        id="pitch"
                        placeholder="Briefly explain why you're the perfect fit for this project..."
                        value={proposal.pitch}
                        onChange={(e) => setProposal({ ...proposal, pitch: e.target.value })}
                        maxLength={200}
                        rows={3}
                      />
                      <p className="text-xs text-muted-foreground">{proposal.pitch.length}/200 characters</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="budget">Your Price</Label>
                        <Input
                          id="budget"
                          placeholder="₹500"
                          value={proposal.budget}
                          onChange={(e) => setProposal({ ...proposal, budget: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeline">Delivery Time</Label>
                        <Input
                          id="timeline"
                          placeholder="5 days"
                          value={proposal.timeline}
                          onChange={(e) => setProposal({ ...proposal, timeline: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="attachments">Attachments (Optional)</Label>
                      <Input
                        id="attachments"
                        type="file"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files || [])
                          setProposal({ ...proposal, attachments: files })
                        }}
                      />
                      <p className="text-xs text-muted-foreground">
                        Upload portfolio samples, resume, or relevant files
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={handleSubmitProposal} className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Submit Proposal
                      </Button>
                      <Button variant="outline" onClick={() => setShowProposalForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">About the Client</h3>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={project.client.avatar || "/placeholder.svg"} alt={project.client.name} />
                    <AvatarFallback>
                      {project.client.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{project.client.name}</p>
                      {project.client.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{project.client.rating} rating</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{project.client.campus}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Apply */}
            {project.budget.type === "micro-gig" && (
              <Card className="border-primary/50 bg-primary/5">
                <CardContent className="p-6">
                  <div className="text-center space-y-3">
                    <Badge variant="default" className="mb-2">
                      Quick Apply Available
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      This is a micro-gig under ₹{project.budget.amount}. Apply instantly!
                    </p>
                    <Button className="w-full" onClick={() => setShowProposalForm(true)}>
                      Quick Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            {!showProposalForm && project.budget.type !== "micro-gig" && (
              <div className="space-y-3">
                <Button className="w-full" onClick={() => setShowProposalForm(true)}>
                  Submit Proposal
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Save Project
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Contact Client
                </Button>
              </div>
            )}

            {/* Project Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Project Activity</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Proposals</span>
                    <span className="font-medium">{project.proposals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Activity</span>
                    <span className="font-medium">2 hours ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg. Response Time</span>
                    <span className="font-medium">4 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
