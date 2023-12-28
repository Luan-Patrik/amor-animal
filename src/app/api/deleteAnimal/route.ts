import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import { AnimalValidator } from '@/lib/validators/AnimalValidator'
import { NextResponse } from 'next/server'

export async function DELETE(req: Request) {
  try {
    const session = await auth()

    if (!session) {
      return new NextResponse('Você precisa estar logado.', { status: 401 })
    }

    const body = await req.json()

    const { id } = AnimalValidator.parse(body)

    await prisma.animals.delete({
      where: {
        userId: session.user.id,
        id: id
      }
    })

    return new NextResponse('Animal excluído com sucesso.', { status: 200 })
  } catch (error) {
    return new NextResponse(
      'Ops! Algo deu errado. Por favor, tente novamente mais tarde.',
      {
        status: 500
      }
    )
  }
}
