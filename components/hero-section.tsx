import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Star, Shield, Clock, DollarSign } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            🎓 Trusted by 50+ Universities
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
            Hire verified student freelancers from your <span className="text-primary">campus</span>
          </h1>
          <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto mb-8">
            Fast, affordable, and trusted. Connect with talented students for your projects while supporting the next
            generation of professionals.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="What skill or project do you need help with?"
                  className="pl-12 h-14 text-lg bg-card border-2"
                />
              </div>
              <Button size="lg" className="h-14 px-8 text-lg">
                Find Freelancers
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8">
              Post a Project
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
              Join as Student Freelancer
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6 rounded-xl bg-card border">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Verified Students</h3>
            <p className="text-sm text-muted-foreground">All freelancers verified with .edu emails and student IDs</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card border">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold mb-2">Quick Turnaround</h3>
            <p className="text-sm text-muted-foreground">Micro-gigs completed in hours, larger projects in days</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card border">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Student-Friendly Rates</h3>
            <p className="text-sm text-muted-foreground">Affordable pricing that fits student budgets and timelines</p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card border">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold mb-2">Portfolio Building</h3>
            <p className="text-sm text-muted-foreground">Export completed projects to LinkedIn and CV automatically</p>
          </div>
        </div>
      </div>
    </section>
  )
}
