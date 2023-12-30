import DetailAnimal from '@/components/DetailAnimal'

export default function DetailAnimalPage({
  params
}: {
  params: { id: string }
}) {
  const { id } = params

  return <DetailAnimal id={id} />
}
