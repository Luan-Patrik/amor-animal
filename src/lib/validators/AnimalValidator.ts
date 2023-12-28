import z from 'zod'

export const AnimalValidator = z.object({
  id: z.string().regex(/^[0-9a-fA-F]+$/)
})

export type AnimalRequest = z.infer<typeof AnimalValidator>
