import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireUser, createApiResponse, createApiError } from '@/lib/auth-helpers'
import { pusherServer } from '@/lib/pusher'

interface Params {
  params: { id: string }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const user = await requireUser(req, ['CLIENT'])
    const body = await req.json()
    const { status } = body

    if (!['ACCEPTED', 'REJECTED'].includes(status)) {
      return createApiError('Invalid status', 400)
    }

    const bid = await prisma.bid.findUnique({
      where: { id: params.id },
      include: {
        project: {
          include: { client: true },
        },
        student: true,
      },
    })

    if (!bid) {
      return createApiError('Bid not found', 404)
    }

    if (bid.project.clientId !== user.id) {
      return createApiError('Unauthorized', 403)
    }

    const updatedBid = await prisma.$transaction(async (prisma) => {
      const updatedBid = await prisma.bid.update({
        where: { id: params.id },
        data: { status },
        include: {
          student: {
            select: { id: true, name: true, email: true },
          },
          project: {
            select: { id: true, title: true },
          },
        },
      })

      if (status === 'ACCEPTED') {
        // Update project status and reject other bids
        await prisma.project.update({
          where: { id: bid.projectId },
          data: { status: 'IN_PROGRESS' },
        })

        await prisma.bid.updateMany({
          where: {
            projectId: bid.projectId,
            id: { not: params.id },
            status: 'PENDING',
          },
          data: { status: 'REJECTED' },
        })
      }

      return updatedBid
    })

    // Create notification for student
    const notification = await prisma.notification.create({
      data: {
        type: status === 'ACCEPTED' ? 'BID_ACCEPTED' : 'BID_REJECTED',
        title: `Bid ${status}`,
        message: `Your bid on "${bid.project.title}" has been ${status.toLowerCase()}`,
        userId: bid.studentId,
        data: {
          projectId: bid.projectId,
          bidId: bid.id,
        },
      },
    })

    // Send real-time notification
    await pusherServer.trigger(`user-${bid.studentId}`, 'notification', {
      notification,
      bid: updatedBid,
    })

    return createApiResponse(updatedBid)
  } catch (error) {
    console.error('Update bid error:', error)
    return createApiError('Failed to update bid', 500)
  }
}