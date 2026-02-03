"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, MapPin, Clock, Star, Users, CheckCircle, Calendar } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { ProjectDetailModal } from "./project-detail-modal"
import { projectStore } from "@/lib/project-store"

export function ProjectMarketplace() {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    campus: "",
    priceRange: [0, 50000], // Updated to rupee range
    deliveryTime: "",
    rating: "",
  })

  const staticProjects = [
    {
      id: 1,
      title: "Mobile App UI Design",
      description:
        "Need a modern, clean UI design for our student productivity app. Looking for someone with experience in mobile design patterns and user experience.",
      client: {
        name: "TechStart Club",
        avatar: "/placeholder.svg",
        rating: 4.8,
        campus: "Stanford University",
        verified: true,
      },
      budget: {
        type: "fixed",
        amount: 20000, // Updated to rupees
        currency: "₹", // Changed to rupee symbol
      },
      timeline: "2 weeks",
      category: "Design",
      skills: ["UI/UX Design", "Figma", "Mobile Design", "Prototyping"],
      proposals: 12,
      postedAt: "2 days ago",
      urgent: false,
      featured: true,
    },
    {
      id: 2,
      title: "Social Media Content Creation",
      description:
        "Weekly social media posts for our campus coffee shop. Need creative graphics and engaging captions that resonate with college students.",
      client: {
        name: "Campus Brew",
        avatar: "/placeholder.svg",
        rating: 4.9,
        campus: "UC Berkeley",
        verified: true,
      },
      budget: {
        type: "hourly",
        amount: 625, // Updated to rupees (25 USD = ~625 INR)
        currency: "₹",
      },
      timeline: "Ongoing",
      category: "Marketing",
      skills: ["Social Media", "Graphic Design", "Content Writing", "Photography"],
      proposals: 8,
      postedAt: "1 day ago",
      urgent: false,
      featured: false,
    },
    {
      id: 3,
      title: "Logo Design - Quick Turnaround",
      description:
        "Need a professional logo for our student organization's upcoming event. Simple, clean design that represents innovation and collaboration.",
      client: {
        name: "Innovation Society",
        avatar: "/placeholder.svg",
        rating: 4.7,
        campus: "MIT",
        verified: true,
      },
      budget: {
        type: "micro-gig",
        amount: 3750, // Updated to rupees
        currency: "₹",
      },
      timeline: "24 hours",
      category: "Design",
      skills: ["Logo Design", "Adobe Illustrator", "Branding"],
      proposals: 23,
      postedAt: "3 hours ago",
      urgent: true,
      featured: false,
    },
    {
      id: 4,
      title: "Website Development for Student Club",
      description:
        "Build a responsive website for our drama club. Need someone familiar with modern web technologies and can create an engaging user experience.",
      client: {
        name: "Drama Club President",
        avatar: "/placeholder.svg",
        rating: 4.6,
        campus: "NYU",
        verified: true,
      },
      budget: {
        type: "fixed",
        amount: 30000, // Updated to rupees
        currency: "₹",
      },
      timeline: "3 weeks",
      category: "Development",
      skills: ["React", "Node.js", "Web Development", "Responsive Design"],
      proposals: 15,
      postedAt: "1 week ago",
      urgent: false,
      featured: false,
    },
    {
      id: 5,
      title: "Event Photography",
      description:
        "Looking for a talented photographer to capture our annual tech conference. Need someone with experience in event photography and quick editing turnaround.",
      client: {
        name: "Tech Conference Org",
        avatar: "/placeholder.svg",
        rating: 5.0,
        campus: "Georgia Tech",
        verified: true,
      },
      budget: {
        type: "fixed",
        amount: 10000, // Updated to rupees
        currency: "₹",
      },
      timeline: "1 week",
      category: "Photography",
      skills: ["Event Photography", "Photo Editing", "Lightroom", "Portrait Photography"],
      proposals: 7,
      postedAt: "4 days ago",
      urgent: false,
      featured: false,
    },
    {
      id: 6,
      title: "Data Analysis for Research Project",
      description:
        "Need help analyzing survey data for our psychology research project. Looking for someone with statistical analysis experience and Python/R skills.",
      client: {
        name: "Research Team",
        avatar: "/placeholder.svg",
        rating: 4.8,
        campus: "Harvard University",
        verified: true,
      },
      budget: {
        type: "hourly",
        amount: 750, // Updated to rupees
        currency: "₹",
      },
      timeline: "2 weeks",
      category: "Data Analysis",
      skills: ["Python", "R", "Statistical Analysis", "Data Visualization"],
      proposals: 9,
      postedAt: "5 days ago",
      urgent: false,
      featured: false,
    },
  ]

  const dynamicProjects = projectStore.getProjects().map((project) => ({
    ...project,
    budget: {
      type: project.budgetType,
      amount: Number.parseInt(project.budgetAmount.replace(/[^\d]/g, "")) || 0,
      currency: "₹",
    },
  }))

  const projects = [...dynamicProjects, ...staticProjects]

  const categories = ["All", "Design", "Development", "Marketing", "Photography", "Writing", "Data Analysis"]
  const campuses = [
    "All Campuses",
    "Stanford University",
    "UC Berkeley",
    "MIT",
    "NYU",
    "Harvard University",
    "Georgia Tech",
  ]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      project.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      project.skills.some((skill) => skill.toLowerCase().includes(filters.search.toLowerCase()))

    const matchesCategory = !filters.category || filters.category === "All" || project.category === filters.category
    const matchesCampus =
      !filters.campus || filters.campus === "All Campuses" || project.client.campus === filters.campus
    const matchesPrice =
      project.budget.amount >= filters.priceRange[0] && project.budget.amount <= filters.priceRange[1]

    return matchesSearch && matchesCategory && matchesCampus && matchesPrice
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Project Marketplace</h1>
          <p className="text-muted-foreground">Find projects that match your skills and build your portfolio</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search projects..."
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select onValueChange={(value) => setFilters({ ...filters, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Campus */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Campus</label>
                  <Select onValueChange={(value) => setFilters({ ...filters, campus: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Campuses" />
                    </SelectTrigger>
                    <SelectContent>
                      {campuses.map((campus) => (
                        <SelectItem key={campus} value={campus}>
                          {campus}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Budget Range</label>
                  <div className="px-2">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                      max={50000}
                      min={0}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>₹{filters.priceRange[0]}</span>
                      <span>₹{filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Delivery Time</label>
                  <Select onValueChange={(value) => setFilters({ ...filters, deliveryTime: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24hours">Within 24 hours</SelectItem>
                      <SelectItem value="3days">Within 3 days</SelectItem>
                      <SelectItem value="week">Within a week</SelectItem>
                      <SelectItem value="month">Within a month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() =>
                    setFilters({
                      search: "",
                      category: "",
                      campus: "",
                      priceRange: [0, 50000],
                      deliveryTime: "",
                      rating: "",
                    })
                  }
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Project Listings */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Showing {filteredProjects.length} of {projects.length} projects
              </p>
              <Select defaultValue="newest">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="budget-high">Highest Budget</SelectItem>
                  <SelectItem value="budget-low">Lowest Budget</SelectItem>
                  <SelectItem value="proposals">Most Proposals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-6">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className={`hover:shadow-lg transition-shadow cursor-pointer ${project.featured ? "border-primary/50 bg-primary/5" : ""}`}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                            {project.title}
                          </h3>
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
                        </div>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{project.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-lg font-bold text-primary">
                          {project.budget.currency}
                          {project.budget.amount}
                          {project.budget.type === "hourly" && "/hr"}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {project.budget.type === "micro-gig"
                            ? "Micro-gig"
                            : project.budget.type === "hourly"
                              ? "Hourly"
                              : "Fixed Price"}
                        </Badge>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Client Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={project.client.avatar || "/placeholder.svg"} alt={project.client.name} />
                          <AvatarFallback>
                            {project.client.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm">{project.client.name}</p>
                            {project.client.verified && <CheckCircle className="h-3 w-3 text-green-500" />}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{project.client.campus}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{project.client.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{project.proposals} proposals</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{project.timeline}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{project.postedAt}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <Badge variant="outline">{project.category}</Badge>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Save
                        </Button>
                        <Button size="sm" onClick={() => setSelectedProject(project)}>
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No projects found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search terms to find more projects.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      />
    </div>
  )
}
