import DetailAnimal from '@/components/DetailAnimal'

const DetailAnimalPage = ({ params }: { params: { id: string } }) => {
  const { id } = params

  return <DetailAnimal id={id} />
}

export default DetailAnimalPage
