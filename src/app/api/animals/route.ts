import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET(req: Request) {
  const url = new URL(req.url)

  const { page, postsPerPage } = z
    .object({
      page: z.string(),
      postsPerPage: z.string()
    })
    .parse({
      page: url.searchParams.get('page') ?? '1',
      postsPerPage: url.searchParams.get('postsPerPage') ?? '12'
    })

  try {
    const animals = await prisma.animals.findMany({
      skip: (Number(page) - 1) * Number(postsPerPage),
      take: Number(postsPerPage),
      select: {
        id: true,
        name: true,
        files: true,
        userId: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            nickname: true,
            phone: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return new NextResponse(JSON.stringify(animals), { status: 200 })
  } catch (error) {
    return new NextResponse(
      'Ops! Algo deu errado. Por favor, tente novamente mais tarde.',
      {
        status: 500
      }
    )
  }
}
