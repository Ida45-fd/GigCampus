"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  GraduationCap,
  Home,
  Search,
  FileText,
  DollarSign,
  Star,
  Settings,
  Bell,
  User,
  LogOut,
  Briefcase,
  Users,
  BarChart3,
  Plus,
} from "lucide-react"
import Link from "next/link"
import type { User as UserType } from "@/lib/auth-utils"

interface DashboardLayoutProps {
  children: React.ReactNode
  userType: "student" | "client"
}

export function DashboardLayout({ children, userType }: DashboardLayoutProps) {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (userData) {
      const user = JSON.parse(userData)
      setCurrentUser(user)

      // Verify user type matches the dashboard
      if (user.userType !== userType) {
        router.push(`/dashboard/${user.userType}`)
      }
    } else {
      // Redirect to auth if no user found
      router.push("/auth")
    }
  }, [userType, router])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/")
  }

  if (!currentUser) {
    return <div>Loading...</div>
  }

  const studentNavItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard/student", active: true },
    { icon: Search, label: "Browse Projects", href: "/marketplace" },
    { icon: FileText, label: "My Proposals", href: "/proposals" },
    { icon: Briefcase, label: "Active Gigs", href: "/gigs" },
    { icon: DollarSign, label: "Earnings", href: "/payments" },
    { icon: Star, label: "Portfolio", href: "/portfolio" },
    { icon: BarChart3, label: "Analytics", href: "/analytics" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  const clientNavItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard/client", active: true },
    { icon: Plus, label: "Post Project", href: "/post-project" },
    { icon: Search, label: "Find Freelancers", href: "/freelancers" },
    { icon: FileText, label: "My Projects", href: "/my-projects" },
    { icon: Users, label: "Proposals", href: "/proposals" },
    { icon: DollarSign, label: "Payments", href: "/payments" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ]

  const navItems = userType === "student" ? studentNavItems : clientNavItems

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">GigCampus</span>
            </Link>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  3
                </Badge>
              </Button>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>
                        {currentUser.firstName[0]}
                        {currentUser.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {currentUser.firstName} {currentUser.lastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-card border-r">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>
                  {currentUser.firstName[0]}
                  {currentUser.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {currentUser.firstName} {currentUser.lastName}
                </p>
                <Badge variant="secondary" className="text-xs">
                  {userType === "student" ? "Student" : "Client"}
                </Badge>
              </div>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link key={item.href} href={item.href}>
                    <Button variant={item.active ? "secondary" : "ghost"} className="w-full justify-start" size="sm">
                      <IconComponent className="mr-2 h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
