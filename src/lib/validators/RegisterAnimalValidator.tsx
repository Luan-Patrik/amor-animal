import z from 'zod'

export const RegisterAnimalValidator = z.object({
  name: z
    .string()
    .min(1, { message: 'Deve conter no mínimo 1 caractere.' })
    .max(255, { message: 'Deve conter no máximo 255 caracteres.' }),
  description: z
    .string()
    .min(4, { message: 'Deve conter no mínimo 4 caracteres.' })
    .max(2000, { message: 'Deve conter no máximo 2000 caracteres.' }),
  files: z
    .any()
    .array()
    .min(1, { message: 'Deve conter no mínimo 1 imagem.' })
    .max(5, { message: 'Deve conter no máximo 5 imagens.' })
})

export type RegisterAnimalRequest = z.infer<typeof RegisterAnimalValidator>
