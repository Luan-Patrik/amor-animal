import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper } from 'swiper/react'

interface SliderProps {
  children: ReactNode
  haveAutoplay?: boolean
}
const Slider = ({ children, haveAutoplay }: SliderProps) => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      pagination={{
        clickable: true,
        el: '.swiper-pagination',
        bulletClass: 'bg-border ring-1 cursor-pointer',
        bulletActiveClass: '!bg-blue-500 !cursor-default',
        renderBullet(index: number, className: string) {
          return `
          <span
          key=${index}
          class="${cn('block h-2 w-2 rounded-full', className)}"></span>
            `
        }
      }}
      loop={true}
      autoplay={
        haveAutoplay ? { delay: 3000, disableOnInteraction: false } : false
      }
      spaceBetween={30}
      slidesPerView={1}
      grabCursor={true}
      centeredSlides={true}
      wrapperClass='inline-flex'
      className='relative'>
      {children}
      <div className='swiper-pagination my-1 flex flex-row justify-center gap-2'></div>
    </Swiper>
  )
}

Slider.displayName = 'Slider'

export { Slider }
