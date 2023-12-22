import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse
} from 'next'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getServerSession } from 'next-auth/next'
import bcryptjs from 'bcryptjs'
import { NextAuthOptions } from 'next-auth'
import prisma from './db'

export const config = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      id: 'credentials',
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Credenciais inválidas.')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user?.password) {
          throw new Error('Credenciais inválidas.')
        }

        const isCorrectPassword = await bcryptjs.compare(
          credentials.password,
          user.password
        )

        if (!isCorrectPassword) {
          throw new Error('Credenciais inválidas.')
        }

        return user
      }
    })
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.nickname = token.nickname
        session.user.email = token.email
        session.user.image = token.picture
      }
      return session
    },
    async jwt({ token, user }) {
      const db = await prisma.user.findFirst({
        where: {
          email: token.email
        }
      })

      if (!db) {
        token.id = user.id
        return token
      }

      return {
        id: db.id,
        name: db.name,
        nickname: db.nickname,
        email: db.email,
        picture: db.image
      }
    }
  },
  pages: {
    signIn: '/entrar',
    error: '/entrar',
    signOut: '/'
  },

  secret: process.env.NEXT_SECRET
} satisfies NextAuthOptions

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config)
}
