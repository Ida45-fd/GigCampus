import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireUser, createApiResponse, createApiError } from '@/lib/auth-helpers'
import { createProjectSchema } from '@/lib/validations'

export async function GET(req: NextRequest) {
  try {
    const user = await requireUser()
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') || 'OPEN'

    let projects

    if (user.role === 'CLIENT') {
      // Clients see their own projects
      projects = await prisma.project.findMany({
        where: {
          clientId: user.id,
          ...(status && { status: status as any }),
        },
        include: {
          client: {
            select: { id: true, name: true, email: true },
          },
          bids: {
            include: {
              student: {
                select: { id: true, name: true, email: true },
              },
            },
          },
          _count: { select: { bids: true } },
        },
        orderBy: { createdAt: 'desc' },
      })
    } else {
      // Students see all open projects
      projects = await prisma.project.findMany({
        where: {
          status: 'OPEN',
        },
        include: {
          client: {
            select: { id: true, name: true, email: true },
          },
          _count: { select: { bids: true } },
        },
        orderBy: { createdAt: 'desc' },
      })
    }

    return createApiResponse(projects)
  } catch (error) {
    console.error('Get projects error:', error)
    return createApiError('Failed to fetch projects', 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser(req, ['CLIENT'])
    const body = await req.json()
    const validatedData = createProjectSchema.parse(body)

    const project = await prisma.project.create({
      data: {
        ...validatedData,
        deadline: validatedData.deadline ? new Date(validatedData.deadline) : null,
        clientId: user.id,
      },
      include: {
        client: {
          select: { id: true, name: true, email: true },
        },
      },
    })

    return createApiResponse(project, 201)
  } catch (error) {
    console.error('Create project error:', error)
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return createApiError('Unauthorized', 401)
    }
    return createApiError('Failed to create project', 500)
  }
}