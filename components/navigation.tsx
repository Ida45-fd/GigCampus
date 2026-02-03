"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, GraduationCap, Bell, User, MessageSquare } from "lucide-react"
import Link from "next/link"

export function Navigation() {
  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">GigCampus</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search skills, projects, or campus..." className="pl-10 bg-background" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            <Link href="/marketplace">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Browse Projects
              </Button>
            </Link>
            <Link href="/freelancers">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Find Freelancers
              </Button>
            </Link>
            <Link href="/chat">
              <Button variant="ghost" className="hidden sm:inline-flex">
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
              </Button>
            </Link>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">3</Badge>
            </Button>

            {/* User Menu */}
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>

            {/* CTA Buttons */}
            <Button variant="outline" className="hidden sm:inline-flex bg-transparent">
              Post Project
            </Button>
            <Link href="/auth">
              <Button>Join as Freelancer</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
