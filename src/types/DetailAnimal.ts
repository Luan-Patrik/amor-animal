import { Animals } from '@prisma/client'

export type ExtendedDetailAnimal = Animals & {
  user: {
    id: string
    nickname: string
    phone: string
  }
}
