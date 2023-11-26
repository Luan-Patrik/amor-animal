import z from 'zod'

export const SignInValidator = z.object({
  email: z.string().email({ message: ' ' }).min(1, { message: ' ' }).max(255),
  password: z.string().min(1)
})

export const SignUpValidator = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: 'Deve conter pelo menos 2 caracteres.' })
      .max(16, { message: 'Deve conter no máximo 16 caracteres.' }),

    nickname: z
      .string()
      .trim()
      .regex(/^[a-zA-Z0-9]+$/, {
        message: 'Use somente caracteres alfanuméricos.'
      })
      .min(6, { message: 'Deve conter pelo menos 6 caracteres.' })
      .max(16, { message: 'Deve conter no máximo 16 caracteres.' }),
    email: z
      .string()
      .email({ message: 'Email inválido.' })
      .min(1, { message: 'Deve conter no mínimo 6 caracteres.' })
      .max(255, { message: 'Deve conter no máximo 255 caracteres.' }),
    password: z
      .string()
      .min(8, { message: 'Deve conter no mínimo 8 caracteres.' })
      .regex(
        new RegExp('.*[A-Z].*'),
        'Deve conter no mínimo 1 caractere maiúsculo.'
      )
      .regex(
        new RegExp('.*[a-z].*'),
        'Deve conter no mínimo 1 caractere minúsculo.'
      )
      .regex(new RegExp('.*\\d.*'), 'Deve conter no mínimo 1 número.')
      .regex(
        new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
        'Deve conter no mínimo 1 caractere especial.'
      ),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Senhas não correspondem.'
  })

export type SignInRequest = z.infer<typeof SignInValidator>
export type SignUpRequest = z.infer<typeof SignUpValidator>
