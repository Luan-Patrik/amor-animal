import { POSTS_PER_PAGE } from '@/config'
import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET(req: Request) {
  const url = new URL(req.url)

  const { nickname, page, postsPerPage } = z
    .object({
      nickname: z.string(),
      page: z.string(),
      postsPerPage: z.string()
    })
    .parse({
      nickname: url.searchParams.get('nickname'),
      page: url.searchParams.get('page') ?? '1',
      postsPerPage: url.searchParams.get('postsPerPage') ?? POSTS_PER_PAGE
    })

  try {
    const userAnimals = await prisma.user.findFirst({
      where: {
        nickname: nickname
      },
      select: {
        name: true,
        nickname: true,
        phone: true,
        animals: {
          skip: (Number(page) - 1) * Number(postsPerPage),
          take: Number(postsPerPage),
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            animals: true
          }
        }
      }
    })

    return new NextResponse(JSON.stringify(userAnimals), { status: 200 })
  } catch (error) {
    return new NextResponse(
      'Ops! Algo deu errado. Por favor, tente novamente mais tarde.',
      {
        status: 500
      }
    )
  }
}
