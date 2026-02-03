import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireUser, createApiResponse, createApiError } from '@/lib/auth-helpers'

export async function PATCH(req: NextRequest) {
  try {
    const user = await requireUser()

    await prisma.notification.updateMany({
      where: {
        userId: user.id,
        isRead: false,
      },
      data: { isRead: true },
    })

    return createApiResponse({ message: 'All notifications marked as read' })
  } catch (error) {
    console.error('Mark all read error:', error)
    return createApiError('Failed to mark notifications as read', 500)
  }
}