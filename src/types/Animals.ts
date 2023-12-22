import { Animals } from '@prisma/client'

export type ExtendedAnimals = Animals & {
  user: {
    id: string
    nickname: string
    phone: string
  }
}
