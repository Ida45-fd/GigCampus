import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireUser, createApiResponse, createApiError } from '@/lib/auth-helpers'
import { updateNotificationSchema } from '@/lib/validations'

interface Params {
  params: { id: string }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const user = await requireUser()
    const body = await req.json()
    const validatedData = updateNotificationSchema.parse(body)

    const notification = await prisma.notification.findUnique({
      where: { id: params.id },
    })

    if (!notification) {
      return createApiError('Notification not found', 404)
    }

    if (notification.userId !== user.id) {
      return createApiError('Unauthorized', 403)
    }

    const updatedNotification = await prisma.notification.update({
      where: { id: params.id },
      data: validatedData,
    })

    return createApiResponse(updatedNotification)
  } catch (error) {
    console.error('Update notification error:', error)
    return createApiError('Failed to update notification', 500)
  }
}