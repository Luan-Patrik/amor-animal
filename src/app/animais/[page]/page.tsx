import PaginatedAnimals from '@/components/PaginatedAnimals'
import prisma from '@/lib/db'

const AnimalsPage = async ({ params }: { params: { page: string } }) => {
  const { page } = params
  const totalItems = await prisma.animals.count()

  return <PaginatedAnimals page={page} totalItems={totalItems} />
}

export default AnimalsPage
