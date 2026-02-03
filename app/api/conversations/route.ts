import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireUser, createApiResponse, createApiError } from '@/lib/auth-helpers'

export async function GET(req: NextRequest) {
  try {
    const user = await requireUser()

    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: { userId: user.id },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: { id: true, name: true, email: true, image: true },
            },
          },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            sender: {
              select: { id: true, name: true },
            },
          },
        },
        project: {
          select: { id: true, title: true },
        },
        _count: {
          select: {
            messages: {
              where: {
                receiverId: user.id,
                isRead: false,
              },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    })

    return createApiResponse(conversations)
  } catch (error) {
    console.error('Get conversations error:', error)
    return createApiError('Failed to fetch conversations', 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser()
    const body = await req.json()
    const { participantId, projectId } = body

    if (!participantId) {
      return createApiError('Participant ID is required', 400)
    }

    // Check if conversation already exists
    const existingConversation = await prisma.conversation.findFirst({
      where: {
        AND: [
          { participants: { some: { userId: user.id } } },
          { participants: { some: { userId: participantId } } },
          ...(projectId ? [{ projectId }] : []),
        ],
      },
      include: {
        participants: {
          include: {
            user: {
              select: { id: true, name: true, email: true, image: true },
            },
          },
        },
      },
    })

    if (existingConversation) {
      return createApiResponse(existingConversation)
    }

    // Create new conversation
    const conversation = await prisma.conversation.create({
      data: {
        projectId,
        participants: {
          createMany: {
            data: [
              { userId: user.id },
              { userId: participantId },
            ],
          },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: { id: true, name: true, email: true, image: true },
            },
          },
        },
        project: {
          select: { id: true, title: true },
        },
      },
    })

    return createApiResponse(conversation, 201)
  } catch (error) {
    console.error('Create conversation error:', error)
    return createApiError('Failed to create conversation', 500)
  }
}