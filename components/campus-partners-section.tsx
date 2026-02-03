import { Badge } from "@/components/ui/badge"

export function CampusPartnersSection() {
  const partners = [
    { name: "Stanford University", logo: "/stanford-university-logo.jpg" },
    { name: "UC Berkeley", logo: "/uc-berkeley-logo.png" },
    { name: "MIT", logo: "/mit-logo.png" },
    { name: "Harvard University", logo: "/harvard-university-logo.png" },
    { name: "NYU", logo: "/nyu-logo.jpg" },
    { name: "UCLA", logo: "/ucla-logo.png" },
    { name: "University of Texas", logo: "/university-of-texas-logo.jpg" },
    { name: "Georgia Tech", logo: "/georgia-tech-logo.jpg" },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Campus Partners
          </Badge>
          <h2 className="text-2xl font-semibold mb-4">Trusted by leading universities nationwide</h2>
          <p className="text-muted-foreground">
            We partner with top universities to verify student credentials and ensure quality
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center opacity-60">
          {partners.map((partner, index) => (
            <div key={index} className="flex items-center justify-center">
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
