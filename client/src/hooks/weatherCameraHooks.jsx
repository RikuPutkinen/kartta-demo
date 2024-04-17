import { useQuery } from '@tanstack/react-query'
import weatherCameraRequests from '../requests/weatherCameraRequests'

export function useWeatherCameras() {
  return useQuery({
    queryKey: ['weatherCams'],
    queryFn: weatherCameraRequests.getAll,
  })
}
