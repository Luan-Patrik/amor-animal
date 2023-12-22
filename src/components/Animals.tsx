'use client'

import { useGetAnimals } from '@/hooks/use-get-animals'
import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Icons } from './ui/Icons'
import { buttonVariants } from './ui/button'
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
      <h1 className='text-center text-lg font-semibold very-xs:text-xl'>
        Nenhum animal encontrado.
      </h1>
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
                className='relative block h-[12.5rem] w-[19rem] select-none overflow-hidden rounded-md bg-muted ring-1'>
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
          <div className='flex flex-col items-center justify-center gap-2 very-xs:flex-row very-xs:justify-between'>
            <Link
              href={`/animal/${item.id}`}
              className={cn(
                buttonVariants({ variant: 'link' }),
                'h-auto overflow-hidden p-0 ring-offset-muted '
              )}>
              <p className='w-full overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold first-letter:uppercase'>
                {item.name}
              </p>
            </Link>
            <Link
              href={`https://api.whatsapp.com/send?phone=55${item.user.phone.replace(
                /\D/g,
                ''
              )}`}
              target='_blank'
              referrerPolicy='no-referrer'
              rel='noopener noreferrer'
              className={cn(
                buttonVariants({ variant: 'link' }),
                'h-auto gap-0.5 p-0 leading-relaxed ring-offset-muted'
              )}>
              <Icons.whatsapp className='h-[1.2rem] w-[1.2rem] fill-green-500' />
              {item.user.phone}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Animals
