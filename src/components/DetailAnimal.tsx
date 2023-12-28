'use client'

import { useGetDetailAnimal } from '@/hooks/use-get-detail-animal'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { SwiperSlide } from 'swiper/react'
import DeleteAnimalPost from './DeleteAnimalPost'
import DetailAnimalSkeleton from './DetailAnimalSkeleton'
import OwnerAnimalContact from './OwnerAnimalContact'
import { Slider } from './Slider'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card'

interface DetailAnimalProps {
  id: string
}

const DetailAnimal = ({ id }: DetailAnimalProps) => {
  const { data, isLoading } = useGetDetailAnimal(id)
  const { data: session } = useSession()

  if (isLoading) return <DetailAnimalSkeleton />

  if (!data) return notFound()

  return (
    <section className='container flex flex-col gap-2 lg:flex-row'>
      <Card className='relative w-full overflow-hidden'>
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
        {session?.user.id === data.userId ? (
          <div className='absolute right-4 top-6'>
            <DeleteAnimalPost id={data.id} />
          </div>
        ) : null}
      </Card>
      <OwnerAnimalContact
        nickname={data.user.nickname}
        phone={data.user.phone}
      />
    </section>
  )
}

export default DetailAnimal
