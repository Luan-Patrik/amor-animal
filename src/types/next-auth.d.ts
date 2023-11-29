import type { User } from 'next-auth'

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    nickname?: string | null
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string
      nickname?: string | null
    }
  }
}
