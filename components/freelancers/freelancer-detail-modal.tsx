"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Star, CheckCircle, MessageSquare, Heart, ExternalLink, Globe } from "lucide-react"

interface FreelancerDetailModalProps {
  freelancer: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FreelancerDetailModal({ freelancer, open, onOpenChange }: FreelancerDetailModalProps) {
  const [message, setMessage] = useState("")

  if (!freelancer) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {freelancer.name}'s Profile
            {freelancer.featured && (
              <Badge variant="default" className="text-xs">
                Featured
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* About */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">About</h3>
                    <p className="text-muted-foreground leading-relaxed">{freelancer.bio}</p>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Skills & Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {freelancer.skills.map((skill: string) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Education */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Education</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{freelancer.university}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {freelancer.year} • {freelancer.major}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Languages */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Languages</h3>
                    <div className="space-y-2">
                      {freelancer.languages.map((language: string) => (
                        <div key={language} className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{language}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {freelancer.portfolio.map((item: any, index: number) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="aspect-video bg-muted flex items-center justify-center">
                        <ExternalLink className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{item.title}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-muted-foreground">{item.rating} rating</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                {/* Sample Reviews */}
                {[1, 2, 3].map((review) => (
                  <Card key={review}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>C{review}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">Client {review}</span>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            "Excellent work! {freelancer.name} delivered exactly what we needed and was very
                            professional throughout the project."
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">2 weeks ago</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Freelancer Info */}
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarImage src={freelancer.avatar || "/placeholder.svg"} alt={freelancer.name} />
                  <AvatarFallback className="text-lg">
                    {freelancer.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold mb-1">{freelancer.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{freelancer.title}</p>

                <div className="flex items-center justify-center gap-2 mb-4">
                  {freelancer.verified && (
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{freelancer.rating}</span>
                    <span className="text-muted-foreground">({freelancer.reviewCount} reviews)</span>
                  </div>
                  <div className="text-2xl font-bold text-primary">${freelancer.hourlyRate}/hr</div>
                  <Badge
                    variant={freelancer.availability === "Available now" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {freelancer.availability}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Projects Completed</span>
                    <span className="font-medium">{freelancer.completedProjects}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="font-medium">{freelancer.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Success Rate</span>
                    <span className="font-medium">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">On-time Delivery</span>
                    <span className="font-medium">95%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Actions */}
            <div className="space-y-3">
              <Button className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact {freelancer.name}
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Heart className="h-4 w-4 mr-2" />
                Save to Favorites
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Invite to Project
              </Button>
            </div>

            {/* Message Form */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Send a Message</h3>
                <div className="space-y-3">
                  <Textarea
                    placeholder="Hi! I'm interested in working with you on..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                  <Button className="w-full">Send Message</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
