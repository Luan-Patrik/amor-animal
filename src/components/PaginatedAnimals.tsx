'use client'

import { notFound } from 'next/navigation'
import Animals from './Animals'
import PaginationPage from './PaginationPage'
import { POSTS_PER_PAGE } from '@/config'

interface PaginatedAnimalsProps {
  page: string | number
  totalItems: number
}

const PaginatedAnimals = ({ page, totalItems }: PaginatedAnimalsProps) => {
  if (Number(page) < 1 || !Number(page)) return notFound()

  return (
    <>
      <Animals
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
