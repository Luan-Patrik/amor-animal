import { Animals } from '@prisma/client'

export type ExtendedDetailAnimal = Animals & {
  User: {
    id: string
    nickname: string
    phone: string
  }
}
