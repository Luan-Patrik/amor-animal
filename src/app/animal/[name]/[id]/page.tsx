import DetailAnimal from '@/components/DetailAnimal'

const DetailAnimalPage = ({
  params
}: {
  params: { name: string; id: string }
}) => {
  const { name, id } = params

  return <DetailAnimal name={name} id={id} />
}

export default DetailAnimalPage
