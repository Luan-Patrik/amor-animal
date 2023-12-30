import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

const AnimalCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'container flex flex-wrap justify-center gap-2',
          className
        )}
        {...props}
      />
    )
  }
)

AnimalCard.displayName = 'AnimalCard'

const AnimalItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex h-auto w-[19rem] flex-col overflow-x-hidden rounded-md bg-muted p-2',
          className
        )}
        {...props}
      />
    )
  }
)

AnimalItem.displayName = 'AnimalItem'

export { AnimalCard, AnimalItem }
