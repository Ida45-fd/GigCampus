import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireUser, createApiResponse, createApiError } from '@/lib/auth-helpers'
import { createMessageSchema } from '@/lib/validations'
import { pusherServer } from '@/lib/pusher'

interface Params {
  params: { id: string }
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const user = await requireUser()
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    // Check if user is participant
    const isParticipant = await prisma.conversationParticipant.findFirst({
      where: {
        conversationId: params.id,
        userId: user.id,
      },
    })

    if (!isParticipant) {
      return createApiError('Unauthorized', 403)
    }

    const messages = await prisma.message.findMany({
      where: { conversationId: params.id },
      include: {
        sender: {
          select: { id: true, name: true, image: true },
        },
        receiver: {
          select: { id: true, name: true, image: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    })

    // Mark messages as read
    await prisma.message.updateMany({
      where: {
        conversationId: params.id,
        receiverId: user.id,
        isRead: false,
      },
      data: { isRead: true },
    })

    return createApiResponse({
      messages: messages.reverse(),
      hasMore: messages.length === limit,
    })
  } catch (error) {
    console.error('Get messages error:', error)
    return createApiError('Failed to fetch messages', 500)
  }
}

export async function POST(req: NextRequest, { params }: Params) {
  try {
    const user = await requireUser()
    const body = await req.json()
    const validatedData = createMessageSchema.parse(body)

    // Check if user is participant
    const isParticipant = await prisma.conversationParticipant.findFirst({
      where: {
        conversationId: params.id,
        userId: user.id,
      },
    })

    if (!isParticipant) {
      return createApiError('Unauthorized', 403)
    }

    const message = await prisma.message.create({
      data: {
        ...validatedData,
        conversationId: params.id,
        senderId: user.id,
      },
      include: {
        sender: {
          select: { id: true, name: true, image: true },
        },
        receiver: {
          select: { id: true, name: true, image: true },
        },
      },
    })

    // Update conversation timestamp
    await prisma.conversation.update({
      where: { id: params.id },
      data: { updatedAt: new Date() },
    })

    // Create notification for receiver
    const notification = await prisma.notification.create({
      data: {
        type: 'NEW_MESSAGE',
        title: 'New Message',
        message: `${user.name} sent you a message`,
        userId: validatedData.receiverId,
        data: {
          conversationId: params.id,
          messageId: message.id,
          senderId: user.id,
        },
      },
    })

    // Send real-time updates
    await pusherServer.trigger(`conversation-${params.id}`, 'message', message)
    await pusherServer.trigger(`user-${validatedData.receiverId}`, 'notification', {
      notification,
      message,
    })

    return createApiResponse(message, 201)
  } catch (error) {
    console.error('Send message error:', error)
    return createApiError('Failed to send message', 500)
  }
}