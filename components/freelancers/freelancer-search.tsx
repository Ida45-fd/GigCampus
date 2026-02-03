"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, MapPin, Star, Users, CheckCircle, Calendar, MessageSquare, Heart } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { FreelancerDetailModal } from "./freelancer-detail-modal"

export function FreelancerSearch() {
  const [selectedFreelancer, setSelectedFreelancer] = useState<any>(null)
  const [filters, setFilters] = useState({
    search: "",
    skills: "",
    campus: "",
    hourlyRate: [10, 100],
    rating: "",
    availability: "",
  })

  const freelancers = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "/asian-female-student.jpg",
      title: "UI/UX Designer & Frontend Developer",
      university: "Stanford University",
      year: "Junior",
      major: "Computer Science",
      rating: 4.9,
      reviewCount: 47,
      hourlyRate: 35,
      completedProjects: 23,
      responseTime: "2 hours",
      availability: "Available now",
      verified: true,
      skills: ["UI/UX Design", "React", "Figma", "JavaScript", "Prototyping", "User Research"],
      bio: "Passionate designer with 3+ years of experience creating user-centered digital experiences. I specialize in mobile app design and have worked with 15+ startups.",
      portfolio: [
        { title: "E-commerce Mobile App", image: "/placeholder.svg", rating: 5.0 },
        { title: "SaaS Dashboard Design", image: "/placeholder.svg", rating: 4.9 },
        { title: "Student Portal Redesign", image: "/placeholder.svg", rating: 5.0 },
      ],
      languages: ["English (Native)", "Mandarin (Fluent)"],
      featured: true,
    },
    {
      id: 2,
      name: "Marcus Johnson",
      avatar: "/african-american-male-student.jpg",
      title: "Full-Stack Developer",
      university: "UC Berkeley",
      year: "Senior",
      major: "Electrical Engineering & Computer Science",
      rating: 4.8,
      reviewCount: 32,
      hourlyRate: 40,
      completedProjects: 18,
      responseTime: "1 hour",
      availability: "Available now",
      verified: true,
      skills: ["React", "Node.js", "Python", "PostgreSQL", "AWS", "Docker"],
      bio: "Full-stack developer with expertise in modern web technologies. I love building scalable applications and have experience with both startups and enterprise projects.",
      portfolio: [
        { title: "Campus Event Platform", image: "/placeholder.svg", rating: 4.8 },
        { title: "Student Marketplace", image: "/placeholder.svg", rating: 5.0 },
      ],
      languages: ["English (Native)", "Spanish (Conversational)"],
      featured: false,
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      avatar: "/latina-female-student.jpg",
      title: "Social Media Manager & Content Creator",
      university: "NYU",
      year: "Sophomore",
      major: "Marketing & Communications",
      rating: 5.0,
      reviewCount: 28,
      hourlyRate: 25,
      completedProjects: 31,
      responseTime: "30 minutes",
      availability: "Available now",
      verified: true,
      skills: ["Social Media Marketing", "Content Creation", "Photography", "Adobe Creative Suite", "Copywriting"],
      bio: "Creative content creator specializing in social media strategy for small businesses and student organizations. I've helped 20+ brands grow their online presence.",
      portfolio: [
        { title: "Campus Coffee Shop Campaign", image: "/placeholder.svg", rating: 5.0 },
        { title: "Student Club Branding", image: "/placeholder.svg", rating: 5.0 },
        { title: "Local Restaurant Social Media", image: "/placeholder.svg", rating: 4.9 },
      ],
      languages: ["English (Native)", "Spanish (Native)"],
      featured: true,
    },
    {
      id: 4,
      name: "Alex Kim",
      avatar: "/placeholder.svg",
      title: "Data Analyst & Python Developer",
      university: "MIT",
      year: "Graduate Student",
      major: "Data Science",
      rating: 4.7,
      reviewCount: 19,
      hourlyRate: 45,
      completedProjects: 12,
      responseTime: "3 hours",
      availability: "Available in 2 days",
      verified: true,
      skills: ["Python", "R", "SQL", "Machine Learning", "Data Visualization", "Statistics"],
      bio: "Graduate student with strong analytical skills and experience in machine learning. I help businesses make data-driven decisions through clear insights and visualizations.",
      portfolio: [
        { title: "Sales Forecasting Model", image: "/placeholder.svg", rating: 4.8 },
        { title: "Customer Segmentation Analysis", image: "/placeholder.svg", rating: 4.9 },
      ],
      languages: ["English (Fluent)", "Korean (Native)"],
      featured: false,
    },
    {
      id: 5,
      name: "Jordan Smith",
      avatar: "/placeholder.svg",
      title: "Photographer & Video Editor",
      university: "Georgia Tech",
      year: "Junior",
      major: "Digital Media",
      rating: 4.9,
      reviewCount: 35,
      hourlyRate: 30,
      completedProjects: 27,
      responseTime: "1 hour",
      availability: "Available now",
      verified: true,
      skills: ["Photography", "Video Editing", "Adobe Premiere", "Lightroom", "Event Photography", "Drone Operation"],
      bio: "Professional photographer and videographer with experience in events, portraits, and commercial work. I've covered 50+ campus events and worked with local businesses.",
      portfolio: [
        { title: "Tech Conference Coverage", image: "/placeholder.svg", rating: 5.0 },
        { title: "Graduation Portraits", image: "/placeholder.svg", rating: 4.9 },
        { title: "Campus Promotional Video", image: "/placeholder.svg", rating: 5.0 },
      ],
      languages: ["English (Native)"],
      featured: false,
    },
  ]

  const skillOptions = [
    "UI/UX Design",
    "Web Development",
    "Mobile Development",
    "React",
    "Node.js",
    "Python",
    "Graphic Design",
    "Photography",
    "Video Editing",
    "Social Media",
    "Content Writing",
    "Data Analysis",
    "Machine Learning",
    "Marketing",
    "Copywriting",
    "Translation",
  ]

  const campuses = [
    "All Campuses",
    "Stanford University",
    "UC Berkeley",
    "MIT",
    "NYU",
    "Harvard University",
    "Georgia Tech",
  ]

  const filteredFreelancers = freelancers.filter((freelancer) => {
    const matchesSearch =
      freelancer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      freelancer.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      freelancer.skills.some((skill) => skill.toLowerCase().includes(filters.search.toLowerCase())) ||
      freelancer.university.toLowerCase().includes(filters.search.toLowerCase())

    const matchesSkills =
      !filters.skills || freelancer.skills.some((skill) => skill.toLowerCase().includes(filters.skills.toLowerCase()))

    const matchesCampus =
      !filters.campus || filters.campus === "All Campuses" || freelancer.university === filters.campus

    const matchesRate = freelancer.hourlyRate >= filters.hourlyRate[0] && freelancer.hourlyRate <= filters.hourlyRate[1]

    return matchesSearch && matchesSkills && matchesCampus && matchesRate
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Student Freelancers</h1>
          <p className="text-muted-foreground">Discover talented verified students for your projects</p>
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
                      placeholder="Search freelancers..."
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Skills</label>
                  <Select onValueChange={(value) => setFilters({ ...filters, skills: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any skill" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any-skill">Any skill</SelectItem>
                      {skillOptions.map((skill) => (
                        <SelectItem key={skill} value={skill}>
                          {skill}
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

                {/* Hourly Rate */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hourly Rate</label>
                  <div className="px-2">
                    <Slider
                      value={filters.hourlyRate}
                      onValueChange={(value) => setFilters({ ...filters, hourlyRate: value })}
                      max={100}
                      min={10}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>${filters.hourlyRate[0]}/hr</span>
                      <span>${filters.hourlyRate[1]}/hr</span>
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Availability</label>
                  <Select onValueChange={(value) => setFilters({ ...filters, availability: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any-availability">Any availability</SelectItem>
                      <SelectItem value="available-now">Available now</SelectItem>
                      <SelectItem value="this-week">Available this week</SelectItem>
                      <SelectItem value="next-week">Available next week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() =>
                    setFilters({
                      search: "",
                      skills: "",
                      campus: "",
                      hourlyRate: [10, 100],
                      rating: "",
                      availability: "",
                    })
                  }
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Freelancer Listings */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Showing {filteredFreelancers.length} of {freelancers.length} freelancers
              </p>
              <Select defaultValue="rating">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="rate-low">Lowest Rate</SelectItem>
                  <SelectItem value="rate-high">Highest Rate</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-6">
              {filteredFreelancers.map((freelancer) => (
                <Card
                  key={freelancer.id}
                  className={`hover:shadow-lg transition-shadow cursor-pointer ${
                    freelancer.featured ? "border-primary/50 bg-primary/5" : ""
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Avatar and Basic Info */}
                      <div className="flex-shrink-0">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={freelancer.avatar || "/placeholder.svg"} alt={freelancer.name} />
                          <AvatarFallback className="text-lg">
                            {freelancer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>

                      {/* Main Content */}
                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold hover:text-primary transition-colors">
                                {freelancer.name}
                              </h3>
                              {freelancer.verified && (
                                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                              {freelancer.featured && (
                                <Badge variant="default" className="text-xs">
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground font-medium">{freelancer.title}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{freelancer.university}</span>
                              </div>
                              <span>•</span>
                              <span>
                                {freelancer.year} • {freelancer.major}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-primary">${freelancer.hourlyRate}/hr</div>
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{freelancer.rating}</span>
                              <span className="text-muted-foreground">({freelancer.reviewCount})</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">{freelancer.bio}</p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1">
                          {freelancer.skills.slice(0, 6).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {freelancer.skills.length > 6 && (
                            <Badge variant="outline" className="text-xs">
                              +{freelancer.skills.length - 6} more
                            </Badge>
                          )}
                        </div>

                        {/* Stats and Actions */}
                        <div className="flex justify-between items-center pt-2 border-t">
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{freelancer.completedProjects} projects</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>Responds in {freelancer.responseTime}</span>
                            </div>
                            <Badge
                              variant={freelancer.availability === "Available now" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {freelancer.availability}
                            </Badge>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Heart className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                            <Button size="sm" onClick={() => setSelectedFreelancer(freelancer)}>
                              View Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredFreelancers.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No freelancers found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search terms to find more freelancers.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Freelancer Detail Modal */}
      <FreelancerDetailModal
        freelancer={selectedFreelancer}
        open={!!selectedFreelancer}
        onOpenChange={(open) => !open && setSelectedFreelancer(null)}
      />
    </div>
  )
}
