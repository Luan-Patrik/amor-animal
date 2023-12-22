import { ExtendedAnimals } from '@/types/Animals'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

/**
 * Retrieves animals from the API.
 *
 * @return {QueryResult<ExtendedAnimals[]>} The result of the query.
 */

export const useGetAnimals = (
  page: string | number,
  postsPerPage: string | number
) => {
  return useQuery({
    queryKey: ['animals', page, postsPerPage],
    queryFn: async () => {
      const { data } = await axios.get('/api/animals', {
        params: {
          page,
          postsPerPage
        }
      })

      return data as ExtendedAnimals[]
    }
  })
}
