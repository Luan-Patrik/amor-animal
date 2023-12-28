import { auth } from '@/lib/auth'
import prisma from '@/lib/db'
import { SignUpValidator } from '@/lib/validators/AuthValidator'
import bcryptjs from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (session)
      return new NextResponse('Você não pode se cadastrar estando logado.', {
        status: 400
      })

    const body = await req.json()

    const { name, nickname, email, phone, password } =
      SignUpValidator.parse(body)

    const nicknameExist = await prisma.user.findUnique({
      where: {
        nickname
      }
    })

    if (nicknameExist) {
      return new NextResponse('Apelido já cadastrado, tente usar outro.', {
        status: 409
      })
    }

    const emailExist = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (emailExist) {
      return new NextResponse('Email já cadastrado, tente usar outro.', {
        status: 409
      })
    }

    const phoneExist = await prisma.user.findUnique({
      where: {
        phone
      }
    })

    if (phoneExist) {
      return new NextResponse('Telefone já cadastrado, tente usar outro.', {
        status: 409
      })
    }

    const hashedPassword = await bcryptjs.hash(password, 12)

    await prisma.user.create({
      data: {
        name,
        nickname,
        email,
        phone,
        password: hashedPassword
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
