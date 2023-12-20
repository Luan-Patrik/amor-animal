import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET(req: Request) {
  const url = new URL(req.url)

  const { name, id } = z
    .object({
      name: z.string(),
      id: z.string().regex(/^[0-9a-fA-F]+$/)
    })
    .parse({
      name: url.searchParams.get('name'),
      id: url.searchParams.get('id')
    })

  try {
    const detailAnimal = await prisma.animals.findFirst({
      where: {
        name: name,
        id: id
      },
      include: {
        User: {
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
