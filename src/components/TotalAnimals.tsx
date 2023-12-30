'use client'

import { useGetAnimals } from '@/hooks/use-get-animals'
import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'
import AnimalCardInformation from './AnimalCardInformation'
import { AnimalCard, AnimalItem } from './Animals'
import AnimalsSkeleton from './AnimalsSkeleton'
import { Slider } from './Slider'

interface TotalAnimalsProps {
  page: string | number
  postsPerPage: string | number
  totalItems: number
}

const TotalAnimals = ({
  page,
  postsPerPage,
  totalItems
}: TotalAnimalsProps) => {
  const { data, isLoading } = useGetAnimals(page, postsPerPage)

  const remainingPosts = Math.max(
    totalItems - (Number(page) - 1) * Number(postsPerPage),
    0
  )
  const minPosts = Math.min(remainingPosts, Number(postsPerPage))

  if (isLoading) return <AnimalsSkeleton items={minPosts} />

  if (!data) return null

  if (data.length === 0)
    return (
      <h3 className='text-center text-lg font-semibold very-xs:text-xl'>
        Nenhum animal encontrado.
      </h3>
    )

  return (
    <AnimalCard>
      {data.map((item) => (
        <AnimalItem key={item.id}>
          <Slider>
            {item.files.map((image, i) => (
              <SwiperSlide
                key={i}
                virtualIndex={i}
                className='relative block h-[12.5rem] w-full select-none rounded-md border-2 bg-muted'>
                <Image
                  src={image}
                  placeholder='blur'
                  blurDataURL={image}
                  alt=''
                  fill
                  className='object-cover'
                />
              </SwiperSlide>
            ))}
          </Slider>
          <AnimalCardInformation
            name={item.name}
            phone={item.user.phone}
            id={item.id}
          />
        </AnimalItem>
      ))}
    </AnimalCard>
  )
}

export default TotalAnimals
