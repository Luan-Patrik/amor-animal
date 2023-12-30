import { Animals } from '@prisma/client'

type User = {
  id: string
  nickname: string
  phone: string
}

export type ExtendedAnimals = Animals & {
  user: User
}

export type ExtendedUserAnimals = User & {
  animals: Animals[]
  _count: {
    animals: number
  }
}
