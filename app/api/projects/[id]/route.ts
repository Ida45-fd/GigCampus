import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireUser, createApiResponse, createApiError } from '@/lib/auth-helpers'

interface Params {
  params: { id: string }
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const user = await requireUser()
    
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: {
        client: {
          select: { id: true, name: true, email: true, image: true },
        },
        bids: {
          include: {
            student: {
              select: { id: true, name: true, email: true, image: true, hourlyRate: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!project) {
      return createApiError('Project not found', 404)
    }

    // Check permissions
    if (user.role === 'CLIENT' && project.clientId !== user.id) {
      return createApiError('Unauthorized', 403)
    }

    return createApiResponse(project)
  } catch (error) {
    console.error('Get project error:', error)
    return createApiError('Failed to fetch project', 500)
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const user = await requireUser(req, ['CLIENT'])
    const body = await req.json()

    const project = await prisma.project.findUnique({
      where: { id: params.id },
    })

    if (!project) {
      return createApiError('Project not found', 404)
    }

    if (project.clientId !== user.id) {
      return createApiError('Unauthorized', 403)
    }

    const updatedProject = await prisma.project.update({
      where: { id: params.id },
      data: body,
      include: {
        client: {
          select: { id: true, name: true, email: true },
        },
      },
    })

    return createApiResponse(updatedProject)
  } catch (error) {
    console.error('Update project error:', error)
    return createApiError('Failed to update project', 500)
  }
}