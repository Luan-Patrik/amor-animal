import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'

interface AnimalCardImageProps {
  image: string
  virtualIndex: number
}

const AnimalCardImage = ({ image, virtualIndex }: AnimalCardImageProps) => {
  return (
    <SwiperSlide
      virtualIndex={virtualIndex}
      className='relative block h-[12.5rem] select-none overflow-hidden rounded-md bg-muted ring-1'>
      <Image
        src={image}
        placeholder='blur'
        blurDataURL={image}
        alt=''
        fill
        className='object-cover'
      />
    </SwiperSlide>
  )
}

export default AnimalCardImage
