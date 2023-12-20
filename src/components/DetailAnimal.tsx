'use client'

import { useGetDetailAnimal } from '@/hooks/use-get-detail-animal'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card'
import { SwiperSlide } from 'swiper/react'
import { Slider } from './Slider'
import Image from 'next/image'
import DetailAnimalSkeleton from './DetailAnimalSkeleton'
import OwnerAnimalContact from './OwnerAnimalContact'

interface DetailAnimalProps {
  name: string
  id: string
}

const DetailAnimal = ({ name, id }: DetailAnimalProps) => {
  const { data, isLoading } = useGetDetailAnimal(name, id)

  if (isLoading) return <DetailAnimalSkeleton />

  if (!data) return

  return (
    <section className='container flex flex-col gap-2 lg:flex-row'>
      <Card className='w-full overflow-hidden'>
        <CardHeader>
          <CardTitle className='break-words'>{data.name}</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <CardDescription className='break-words text-foreground '>
            {data.description}
          </CardDescription>
          <Slider haveAutoplay>
            {data.files.map((image, i) => (
              <SwiperSlide
                key={i}
                virtualIndex={i}
                className='relative block h-96 select-none rounded-md bg-muted'>
                <Image
                  src={image}
                  alt='Imagem do pet'
                  fill
                  className='rounded-md object-contain p-2'
                />
              </SwiperSlide>
            ))}
          </Slider>
        </CardContent>
      </Card>
      <OwnerAnimalContact
        nickname={data.User.nickname}
        phone={data.User.phone}
      />
    </section>
  )
}

export default DetailAnimal
