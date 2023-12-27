'use client'

import { useGetAnimals } from '@/hooks/use-get-animals'
import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'
import AnimalCardInformation from './AnimalCardInformation'
import AnimalsSkeleton from './AnimalsSkeleton'
import { Slider } from './Slider'

interface AnimalsProps {
  page: string | number
  postsPerPage: string | number
  totalItems: number
}

const Animals = ({ page, postsPerPage, totalItems }: AnimalsProps) => {
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
    <div className='container flex flex-wrap justify-center gap-2'>
      {data.map((item) => (
        <div
          key={item.id}
          className='flex h-auto w-[19rem] flex-col overflow-x-hidden rounded-md bg-muted p-2'>
          <Slider>
            {item.files.map((image, i) => (
              <SwiperSlide
                key={i}
                virtualIndex={i}
                className='relative block h-[12.5rem] w-full select-none overflow-hidden rounded-md bg-muted ring-1'>
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
        </div>
      ))}
    </div>
  )
}

export default Animals
