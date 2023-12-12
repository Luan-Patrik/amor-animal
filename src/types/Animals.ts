import { Animals } from '@prisma/client'

export type ExtendedAnimals = Animals & {
  User: {
    id: string
    nickname: string
    phone: string
  }
}
