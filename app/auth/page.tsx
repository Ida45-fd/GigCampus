"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Users, Briefcase } from "lucide-react"
import { StudentSignup } from "@/components/auth/student-signup"
import { ClientSignup } from "@/components/auth/client-signup"
import { LoginForm } from "@/components/auth/login-form"

type AuthMode = "login" | "student-signup" | "client-signup"

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("login")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">GigCampus</span>
          </div>
          <p className="text-muted-foreground">
            {mode === "login" && "Welcome back to your campus freelance hub"}
            {mode === "student-signup" && "Join as a student freelancer"}
            {mode === "client-signup" && "Join as a client"}
          </p>
        </div>

        {/* Mode Selection */}
        {mode === "login" && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button
              variant="outline"
              onClick={() => setMode("student-signup")}
              className="flex items-center gap-2 h-auto p-4 flex-col"
            >
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm">Join as Student</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => setMode("client-signup")}
              className="flex items-center gap-2 h-auto p-4 flex-col"
            >
              <Briefcase className="h-5 w-5 text-accent" />
              <span className="text-sm">Join as Client</span>
            </Button>
          </div>
        )}

        {/* Auth Forms */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {mode === "login" && "Sign In"}
              {mode === "student-signup" && (
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Student Registration
                </div>
              )}
              {mode === "client-signup" && (
                <div className="flex items-center justify-center gap-2">
                  <Briefcase className="h-5 w-5 text-accent" />
                  Client Registration
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mode === "login" && <LoginForm />}
            {mode === "student-signup" && <StudentSignup />}
            {mode === "client-signup" && <ClientSignup />}

            {/* Mode Switcher */}
            <div className="mt-6 text-center space-y-2">
              {mode !== "login" && (
                <Button variant="ghost" onClick={() => setMode("login")} className="text-sm">
                  Already have an account? Sign in
                </Button>
              )}

              {mode === "student-signup" && (
                <Button variant="ghost" onClick={() => setMode("client-signup")} className="text-sm">
                  Looking to hire? Join as client
                </Button>
              )}

              {mode === "client-signup" && (
                <Button variant="ghost" onClick={() => setMode("student-signup")} className="text-sm">
                  Are you a student? Join as freelancer
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <Badge variant="secondary" className="text-xs">
              🔒 Secure & Private
            </Badge>
            <Badge variant="secondary" className="text-xs">
              ✅ Verified Students Only
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
