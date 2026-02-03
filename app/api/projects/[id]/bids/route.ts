import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireUser, createApiResponse, createApiError } from '@/lib/auth-helpers'
import { createBidSchema } from '@/lib/validations'
import { pusherServer } from '@/lib/pusher'

interface Params {
  params: { id: string }
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const user = await requireUser(req)
    
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      select: { clientId: true },
    })

    if (!project) {
      return createApiError('Project not found', 404)
    }

    // Only project owner can see all bids
    if (user.role === 'CLIENT' && project.clientId !== user.id) {
      return createApiError('Unauthorized', 403)
    }

    const bids = await prisma.bid.findMany({
      where: { 
        projectId: params.id,
        ...(user.role === 'STUDENT' && { studentId: user.id }),
      },
      include: {
        student: {
          select: { id: true, name: true, email: true, image: true, hourlyRate: true, skills: true },
        },
        project: {
          select: { id: true, title: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return createApiResponse(bids)
  } catch (error) {
    console.error('Get bids error:', error)
    return createApiError('Failed to fetch bids', 500)
  }
}

export async function POST(req: NextRequest, { params }: Params) {
  try {
    const user = await requireUser(req, ['STUDENT'])
    const body = await req.json()
    const validatedData = createBidSchema.parse(body)

    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: { client: true },
    })

    if (!project) {
      return createApiError('Project not found', 404)
    }

    if (project.status !== 'OPEN') {
      return createApiError('Project is no longer accepting bids', 400)
    }

    // Check if user already bid on this project
    const existingBid = await prisma.bid.findUnique({
      where: {
        projectId_studentId: {
          projectId: params.id,
          studentId: user.id,
        },
      },
    })

    if (existingBid) {
      return createApiError('You have already bid on this project', 400)
    }

    const bid = await prisma.bid.create({
      data: {
        ...validatedData,
        projectId: params.id,
        studentId: user.id,
      },
      include: {
        student: {
          select: { id: true, name: true, email: true, image: true },
        },
        project: {
          select: { id: true, title: true },
        },
      },
    })

    // Create notification for client
    const notification = await prisma.notification.create({
      data: {
        type: 'NEW_BID',
        title: 'New Bid Received',
        message: `${user.name} submitted a bid on your project "${project.title}"`,
        userId: project.clientId,
        data: {
          projectId: params.id,
          bidId: bid.id,
          studentId: user.id,
        },
      },
    })

    // Send real-time notification
    await pusherServer.trigger(`user-${project.clientId}`, 'notification', {
      notification,
      bid,
    })

    return createApiResponse(bid, 201)
  } catch (error) {
    console.error('Create bid error:', error)
    return createApiError('Failed to create bid', 500)
  }
}