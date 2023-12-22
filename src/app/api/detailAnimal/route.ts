import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET(req: Request) {
  const url = new URL(req.url)

  const { id } = z
    .object({
      id: z.string().regex(/^[0-9a-fA-F]+$/)
    })
    .parse({
      id: url.searchParams.get('id')
    })

  try {
    const detailAnimal = await prisma.animals.findFirst({
      where: {
        id: id
      },
      include: {
        user: {
          select: {
            id: true,
            nickname: true,
            phone: true
          }
        }
      }
    })

    return new NextResponse(JSON.stringify(detailAnimal), { status: 200 })
  } catch (error) {
    return new NextResponse(
      'Ops! Algo deu errado. Por favor, tente novamente mais tarde.',
      {
        status: 500
      }
    )
  }
}
