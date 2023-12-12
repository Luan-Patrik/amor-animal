import { Skeleton } from './ui/skeleton'

interface AnimalsSkeletonProps {
  items: number
  havePagination?: boolean
}

const AnimalsSkeleton = ({ items }: AnimalsSkeletonProps) => {
  const itemsArray = Array.from({ length: items })

  return (
    <div className='container flex flex-wrap items-center justify-center gap-2'>
      {itemsArray.map((_, index) => (
        <Skeleton
          key={index}
          className='flex h-auto w-[19rem] flex-col gap-2 p-2'>
          <Skeleton className='h-[12.5rem] w-full bg-foreground/30' />
          <div className='flex justify-center gap-0.5'>
            <Skeleton className='h-2 w-2 rounded-full bg-foreground/30' />
            <Skeleton className='h-2 w-2 rounded-full bg-foreground/30' />
            <Skeleton className='h-2 w-2 rounded-full bg-foreground/30' />
          </div>
          <div className='flex flex-col items-center gap-2 very-xs:flex-row'>
            <Skeleton className='h-6 w-full bg-foreground/30' />
            <Skeleton className='h-6 w-full bg-foreground/30' />
          </div>
        </Skeleton>
      ))}
    </div>
  )
}

export default AnimalsSkeleton
