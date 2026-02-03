// Authentication utilities and user type management
export type UserType = "student" | "client"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  userType: UserType
  isVerified: boolean
  university?: string
  organization?: string
}

// Mock authentication - replace with real auth service
export const mockUsers: User[] = [
  {
    id: "1",
    email: "alex@stanford.edu",
    firstName: "Alex",
    lastName: "Chen",
    userType: "student",
    isVerified: true,
    university: "Stanford University",
  },
  {
    id: "2",
    email: "jane@company.com",
    firstName: "Jane",
    lastName: "Smith",
    userType: "client",
    isVerified: true,
    organization: "Tech Startup Inc",
  },
]

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = mockUsers.find((u) => u.email === email)
  return user || null
}

export const createUser = async (userData: Partial<User>): Promise<User> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newUser: User = {
    id: Date.now().toString(),
    email: userData.email!,
    firstName: userData.firstName!,
    lastName: userData.lastName!,
    userType: userData.userType!,
    isVerified: false,
    university: userData.university,
    organization: userData.organization,
  }

  mockUsers.push(newUser)
  return newUser
}

export const getRedirectPath = (userType: UserType): string => {
  return userType === "student" ? "/dashboard/student" : "/dashboard/client"
}
