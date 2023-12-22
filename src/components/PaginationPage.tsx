import usePagination from '@/hooks/use-pagination'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { POSTS_PER_PAGE } from '@/config'

export interface PaginationProps {
  totalItems: number
  currentPage: number
  postsPerPage: number
  renderPageLink: (page: number) => string
}

export const dotts = '...'

const PaginationPage = ({
  totalItems,
  currentPage,
  postsPerPage = POSTS_PER_PAGE,
  renderPageLink
}: PaginationProps) => {
  const pages = usePagination(totalItems, currentPage, postsPerPage)

  return (
    <div className='my-8 flex flex-wrap items-center justify-center gap-2'>
      {pages.map((pageNumber, i) =>
        pageNumber === dotts ? (
          <span
            key={i}
            className='rounded-full px-4 py-2 text-sm font-semibold text-black'>
            {pageNumber}
          </span>
        ) : (
          <Link
            key={i}
            href={renderPageLink(pageNumber as number)}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'icon' })
            )}>
            {pageNumber}
          </Link>
        )
      )}
    </div>
  )
}

export default PaginationPage
