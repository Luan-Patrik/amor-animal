'use client'

import { POSTS_PER_PAGE } from '@/config'
import { useGetUserAnimals } from '@/hooks/use-get-user-animals'
import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'
import AnimalCardInformation from './AnimalCardInformation'
import { AnimalCard, AnimalItem } from './Animals'
import AnimalsSkeleton from './AnimalsSkeleton'
import PaginationPage from './PaginationPage'
import { Slider } from './Slider'

interface AnimalsUserProps {
  nickname: string
  page: string | number
  postsPerPage: string | number
  totalItems: number
}

const AnimalsUser = ({
  nickname,
  page,
  postsPerPage,
  totalItems
}: AnimalsUserProps) => {
  const { data, isLoading } = useGetUserAnimals(nickname, page, postsPerPage)

  const remainingPosts = Math.max(
    totalItems - (Number(page) - 1) * Number(postsPerPage),
    0
  )
  const minPosts = Math.min(remainingPosts, Number(postsPerPage))

  if (isLoading) return <AnimalsSkeleton items={minPosts} />

  if (!data) return null

  if (data.animals.length === 0)
    return (
      <h3 className='text-center text-lg font-semibold very-xs:text-xl'>
        Nenhum animal encontrado.
      </h3>
    )

  return (
    <>
      <AnimalCard>
        {data.animals.map((item) => (
          <AnimalItem key={item.id}>
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
              phone={data.phone}
              id={item.id}
            />
          </AnimalItem>
        ))}
      </AnimalCard>
      <PaginationPage
        currentPage={Number(page)}
        postsPerPage={POSTS_PER_PAGE}
        totalItems={totalItems}
        renderPageLink={(page) => `/${nickname}/${page}`}
      />
    </>
  )
}

export default AnimalsUser
