import { getServerSession } from "next-auth/next"
import { NextRequest } from "next/server"
import { authOptions } from "@/lib/auth"

export async function requireUser(
  req: NextRequest,
  allowedRoles?: string[]
) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  if (
    allowedRoles &&
    !allowedRoles.includes((session.user as any).role)
  ) {
    throw new Error("Insufficient permissions")
  }

  return session.user
}

export function createApiResponse(data: any, status = 200) {
  return Response.json(data, { status })
}

export function createApiError(message: string, status = 400) {
  return Response.json({ error: message }, { status })
}
