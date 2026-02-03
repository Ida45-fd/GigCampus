"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ArrowRight, ArrowLeft, DollarSign, Clock, Users, Globe } from "lucide-react"
import { projectStore } from "@/lib/project-store"

interface PostProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PostProjectModal({ open, onOpenChange }: PostProjectModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    skills: [] as string[],
    budgetType: "",
    budgetAmount: "",
    timeline: "",
    campusScope: "",
    visibility: "",
  })

  const steps = [
    { number: 1, title: "Project Details", description: "Title and description" },
    { number: 2, title: "Requirements", description: "Skills and category" },
    { number: 3, title: "Budget & Timeline", description: "Budget and delivery time" },
    { number: 4, title: "Scope & Visibility", description: "Campus and visibility settings" },
    { number: 5, title: "Review", description: "Review and publish" },
  ]

  const skillOptions = [
    "Graphic Design",
    "Web Development",
    "Mobile Development",
    "Content Writing",
    "Social Media",
    "Photography",
    "Video Editing",
    "Data Analysis",
    "Marketing",
    "UI/UX Design",
    "Copywriting",
    "Translation",
  ]

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  const handleSubmitProposal = () => {
    console.log("Publishing project:", formData)

    const newProject = projectStore.addProject(formData)

    alert("Project posted successfully! You'll start receiving proposals soon.")
    onOpenChange(false)

    // Reset form
    setCurrentStep(1)
    setFormData({
      title: "",
      description: "",
      category: "",
      skills: [],
      budgetType: "",
      budgetAmount: "",
      timeline: "",
      campusScope: "",
      visibility: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Post a New Project</DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep >= step.number ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep > step.number ? <CheckCircle className="h-4 w-4" /> : step.number}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-2 ${currentStep > step.number ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {/* Step 1: Project Details */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Logo Design for Student Club"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project in detail. What do you need? What are your expectations?"
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Step 2: Requirements */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="writing">Writing & Content</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="photography">Photography & Video</SelectItem>
                    <SelectItem value="data">Data & Analytics</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Required Skills</Label>
                <div className="grid grid-cols-2 gap-2">
                  {skillOptions.map((skill) => (
                    <Button
                      key={skill}
                      variant={formData.skills.includes(skill) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSkillToggle(skill)}
                      className="justify-start"
                    >
                      {skill}
                    </Button>
                  ))}
                </div>
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Budget & Timeline */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Budget Type</Label>
                <div className="grid grid-cols-3 gap-3">
                  {["micro-gig", "hourly", "fixed"].map((type) => (
                    <Card
                      key={type}
                      className={`cursor-pointer transition-colors ${
                        formData.budgetType === type ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => setFormData({ ...formData, budgetType: type })}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="mb-2">
                          {type === "micro-gig" && <DollarSign className="h-6 w-6 mx-auto text-green-600" />}
                          {type === "hourly" && <Clock className="h-6 w-6 mx-auto text-blue-600" />}
                          {type === "fixed" && <CheckCircle className="h-6 w-6 mx-auto text-purple-600" />}
                        </div>
                        <p className="font-medium text-sm">
                          {type === "micro-gig" && "Micro-Gig"}
                          {type === "hourly" && "Hourly Rate"}
                          {type === "fixed" && "Fixed Price"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {type === "micro-gig" && "₹200-₹1000"}
                          {type === "hourly" && "Per hour"}
                          {type === "fixed" && "One-time payment"}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Amount</Label>
                <Input
                  id="budget"
                  placeholder={formData.budgetType === "hourly" ? "e.g., ₹25/hour" : "e.g., ₹500"}
                  value={formData.budgetAmount}
                  onChange={(e) => setFormData({ ...formData, budgetAmount: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Timeline</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">ASAP (1-3 days)</SelectItem>
                    <SelectItem value="week">Within a week</SelectItem>
                    <SelectItem value="2weeks">Within 2 weeks</SelectItem>
                    <SelectItem value="month">Within a month</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 4: Scope & Visibility */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Campus Scope</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, campusScope: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select campus scope" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="my-campus">My Campus Only</SelectItem>
                    <SelectItem value="local">Local Area (50 miles)</SelectItem>
                    <SelectItem value="regional">Regional (State)</SelectItem>
                    <SelectItem value="national">National</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Visibility</Label>
                <div className="space-y-3">
                  {[
                    { value: "public", label: "Public", description: "Visible to all verified students", icon: Globe },
                    {
                      value: "clubs",
                      label: "Clubs Only",
                      description: "Only visible to student organizations",
                      icon: Users,
                    },
                  ].map((option) => (
                    <Card
                      key={option.value}
                      className={`cursor-pointer transition-colors ${
                        formData.visibility === option.value ? "border-primary bg-primary/5" : ""
                      }`}
                      onClick={() => setFormData({ ...formData, visibility: option.value })}
                    >
                      <CardContent className="p-4 flex items-center gap-3">
                        <option.icon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{option.label}</p>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Review Your Project</h3>
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h4 className="font-medium">{formData.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{formData.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{formData.category}</Badge>
                    {formData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>
                      Budget: <strong>{formData.budgetAmount}</strong>
                    </span>
                    <span>
                      Timeline: <strong>{formData.timeline}</strong>
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>
                      Scope: <strong>{formData.campusScope}</strong>
                    </span>
                    <span>
                      Visibility: <strong>{formData.visibility}</strong>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep < 5 ? (
            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && (!formData.title || !formData.description)) ||
                (currentStep === 2 && (!formData.category || formData.skills.length === 0)) ||
                (currentStep === 3 && (!formData.budgetType || !formData.budgetAmount || !formData.timeline)) ||
                (currentStep === 4 && (!formData.campusScope || !formData.visibility))
              }
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmitProposal}>Publish Project</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
