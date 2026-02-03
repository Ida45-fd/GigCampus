import { z } from 'zod'

export const createProjectSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(10).max(5000),
  budget: z.number().positive(),
  deadline: z.string().datetime().optional(),
  skills: z.array(z.string()).min(1),
})

export const createBidSchema = z.object({
  amount: z.number().positive(),
  proposal: z.string().min(10).max(2000),
  deliveryTime: z.number().int().positive(),
})

export const createMessageSchema = z.object({
  content: z.string().min(1).max(1000),
  receiverId: z.string().cuid(),
  attachmentUrl: z.string().url().optional(),
})

export const updateNotificationSchema = z.object({
  isRead: z.boolean(),
})