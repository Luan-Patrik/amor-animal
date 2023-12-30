import AnimalsUser from '@/components/AnimalsUser'
import prisma from '@/lib/db'
import { notFound } from 'next/navigation'

export default async function UserPage({
  params
}: {
  params: { nickname: string; page: string }
}) {
  const { nickname, page } = params
  const totalItems = await prisma.animals.count({
    where: {
      user: {
        nickname: nickname
      }
    }
  })

  if (Number(page) < 1 || !Number(page)) return notFound()

  return (
    <AnimalsUser
      nickname={nickname}
      page={page}
      postsPerPage={5}
      totalItems={totalItems}
    />
  )
}
