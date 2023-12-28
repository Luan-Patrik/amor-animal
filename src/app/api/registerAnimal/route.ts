import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import { RegisterAnimalValidator } from '@/lib/validators/RegisterAnimalValidator'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session)
      return new NextResponse(
        'Você não pode cadastrar animais não estando logado.',
        {
          status: 400
        }
      )

    const body = await req.json()

    const { name, description, files } = RegisterAnimalValidator.parse(body)

    await prisma.animals.create({
      data: {
        userId: session.user.id,
        name,
        description,
        files
      }
    })

    return new NextResponse('Cadastrado efetuado com sucesso.', { status: 201 })
  } catch (error) {
    return new NextResponse(
      'Ops! Algo deu errado. Por favor, tente novamente mais tarde.',
      {
        status: 500
      }
    )
  }
}
