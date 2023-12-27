'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ReactNode, useState } from 'react'

/**
 * Create a Provider component that wraps the given children with the necessary providers.
 *
 * @param {ReactNode} children - The children components to be wrapped by the providers.
 * @return {ReactNode} The wrapped children components.
 */

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000 // 1 minute,
          }
        }
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  )
}
