'use client'

import { useGetAnimals } from '@/hooks/use-get-animals'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Icons } from './ui/Icons'
import { buttonVariants } from './ui/button'
import AnimalsSkeleton from './AnimalsSkeleton'

interface AnimalsProps {
  page: string | number
  postsPerPage: string | number
}

const Animals = ({ page, postsPerPage }: AnimalsProps) => {
  const { data, isLoading } = useGetAnimals(page, postsPerPage)

  if (isLoading) return <AnimalsSkeleton items={Number(postsPerPage)} />

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
          <Swiper
            modules={[Pagination]}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
              bulletClass: 'bg-border ring-1 cursor-pointer',
              bulletActiveClass: '!bg-ring !cursor-default',
              renderBullet(index: number, className: string) {
                return `
                  <span
                  key=${index}
                  class="${cn('block h-2 w-2 rounded-full', className)}"></span>
                    `
              }
            }}
            spaceBetween={20}
            slidesPerView={1}
            grabCursor={true}
            centeredSlides={true}
            wrapperClass='inline-flex'
            className='relative'>
            {item.files.map((image, i) => (
              <SwiperSlide
                key={i}
                virtualIndex={i}
                className='relative block h-[12.5rem] w-[19rem] select-none rounded-md bg-muted ring-1'>
                <Image
                  src={image}
                  placeholder='blur'
                  blurDataURL={image}
                  alt=''
                  fill
                  className='object-contain'
                />
              </SwiperSlide>
            ))}
            <div className='swiper-pagination my-1 flex flex-row justify-center gap-1'></div>
            <div className='flex flex-col items-center justify-center gap-2 very-xs:flex-row very-xs:justify-between'>
              <Link
                href={`/animal/${item.id}`}
                target='_blank'
                referrerPolicy='no-referrer'
                rel='noopener noreferrer'
                className={cn(
                  buttonVariants({ variant: 'link' }),
                  'h-auto p-0 text-lg font-bold leading-relaxed ring-offset-muted first-letter:uppercase'
                )}>
                {item.name}
              </Link>
              <Link
                href={`https://api.whatsapp.com/send?phone=55${item.User.phone.replace(
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
                {item.User.phone}
              </Link>
            </div>
          </Swiper>
        </div>
      ))}
    </div>
  )
}

export default Animals
