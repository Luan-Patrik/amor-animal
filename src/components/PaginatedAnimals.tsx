'use client'

import { POSTS_PER_PAGE } from '@/config'
import { notFound } from 'next/navigation'
import PaginationPage from './PaginationPage'
import TotalAnimals from './TotalAnimals'

interface PaginatedAnimalsProps {
  page: string | number
  totalItems: number
}

const PaginatedAnimals = ({ page, totalItems }: PaginatedAnimalsProps) => {
  if (Number(page) < 1 || !Number(page)) return notFound()

  return (
    <>
      <TotalAnimals
        page={page}
        postsPerPage={POSTS_PER_PAGE}
        totalItems={totalItems}
      />
      <PaginationPage
        currentPage={Number(page)}
        postsPerPage={POSTS_PER_PAGE}
        totalItems={totalItems}
        renderPageLink={(page) => `/animais/${page}`}
      />
    </>
  )
}

export default PaginatedAnimals
