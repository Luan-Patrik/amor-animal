import { Skeleton } from './ui/skeleton'

const DetailAnimalSkeleton = () => {
  return (
    <div className='container flex flex-col gap-2 lg:flex-row'>
      <Skeleton className='flex w-full flex-col gap-6 p-6'>
        <Skeleton className='h-8 w-full bg-foreground/30' />
        <div className='flex flex-col gap-1'>
          <Skeleton className='h-4 w-full bg-foreground/30' />
          <Skeleton className='h-4 w-full bg-foreground/30' />
        </div>
        <div className='flex flex-col gap-2'>
          <Skeleton className='h-96 w-full bg-foreground/30' />
          <div className='flex justify-center gap-2'>
            <Skeleton className='h-2.5 w-2.5 rounded-full bg-foreground/30' />
            <Skeleton className='h-2.5 w-2.5 rounded-full bg-foreground/30' />
            <Skeleton className='h-2.5 w-2.5 rounded-full bg-foreground/30' />
          </div>
        </div>
      </Skeleton>
      <Skeleton className='flex h-fit w-full flex-col gap-6 px-2 py-6 lg:w-[28rem]'>
        <Skeleton className='h-8 w-full bg-foreground/30' />
        <div className='flex flex-col gap-1'>
          <Skeleton className='h-4 w-full bg-foreground/30' />
          <Skeleton className='h-4 w-full space-y-2 bg-foreground/30' />
        </div>
        <Skeleton className='h-4 w-full bg-foreground/30' />
      </Skeleton>
    </div>
  )
}

export default DetailAnimalSkeleton
