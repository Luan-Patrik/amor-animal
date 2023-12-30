import AnimalsUser from '@/components/AnimalsUser'
import { POSTS_PER_PAGE } from '@/config'
import prisma from '@/lib/db'

export default async function UserPage({
  params
}: {
  params: { nickname: string }
}) {
  const { nickname } = params

  const totalItems = await prisma.animals.count({
    where: {
      user: {
        nickname: nickname
      }
    }
  })

  return (
    <AnimalsUser
      nickname={nickname}
      page={1}
      postsPerPage={POSTS_PER_PAGE}
      totalItems={totalItems}
    />
  )
}
