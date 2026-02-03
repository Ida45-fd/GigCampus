import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, Shield, FileText, DollarSign, Users, Clock, ArrowRight, CheckCircle } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Micro-Gigs",
      description: "Quick tasks completed in under an hour",
      details: ["Logo design", "Social media posts", "Data entry", "Quick research"],
      price: "₹200-₹1000",
      color: "text-yellow-600",
    },
    {
      icon: Shield,
      title: "Verified Students",
      description: "All freelancers verified with .edu emails",
      details: ["Student ID verification", "University enrollment check", "Skill assessments", "Background screening"],
      price: "100% Verified",
      color: "text-primary",
    },
    {
      icon: FileText,
      title: "Portfolio → CV Export",
      description: "Automatically build your professional portfolio",
      details: ["LinkedIn integration", "PDF export", "Project showcases", "Client testimonials"],
      price: "Free Feature",
      color: "text-accent",
    },
    {
      icon: DollarSign,
      title: "Low Commission",
      description: "Keep more of what you earn",
      details: ["Only 5% platform fee", "No hidden charges", "Instant payouts", "Secure escrow"],
      price: "5% Fee Only",
      color: "text-green-600",
    },
    {
      icon: Users,
      title: "Campus Projects",
      description: "Connect with your local campus community",
      details: ["Club projects", "Student organizations", "Campus events", "Local businesses"],
      price: "Local Focus",
      color: "text-blue-600",
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Students work around their schedules",
      details: ["24-48 hour delivery", "Weekend availability", "Flexible timelines", "Rush options"],
      price: "Quick Turnaround",
      color: "text-purple-600",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Why Choose GigCampus
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything you need for successful campus freelancing</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From quick micro-gigs to complex projects, we've built the perfect platform for students and clients to
            collaborate effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="relative group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center`}>
                      <IconComponent className={`h-5 w-5 ${feature.color}`} />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feature.price}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="group">
            Get Started Today
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
