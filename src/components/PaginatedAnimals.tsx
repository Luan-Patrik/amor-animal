'use client'

import { notFound } from 'next/navigation'
import Animals from './Animals'
import PaginationPage from './PaginationPage'

interface PaginatedAnimalsProps {
  page: string | number
  totalItems: number
}

const PaginatedAnimals = ({ page, totalItems }: PaginatedAnimalsProps) => {
  if (Number(page) < 1 || !Number(page)) return notFound()

  return (
    <>
      <Animals page={page} postsPerPage={12} />
      <PaginationPage
        currentPage={Number(page)}
        postsPerPage={12}
        totalItems={totalItems}
        renderPageLink={(page) => `/animais/${page}`}
      />
    </>
  )
}

export default PaginatedAnimals
