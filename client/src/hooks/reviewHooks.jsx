import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useReviewQuery(locationId) {
  return useQuery({
    queryKey: ['reviews', locationId],
    queryFn: () =>
      axios.get(`/api/reviews/marker/${locationId}`).then(res => res.data),
    retry: false,
  })
}
