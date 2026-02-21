'use client'

import { useEffect, useState } from 'react'
import type { TravelLocation } from '@/lib/types'
import dynamic from 'next/dynamic'

// Dynamically import map to avoid SSR issues
const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-secondary dark:bg-gray-800 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
      </div>
    </div>
  ),
})

interface TravelMapProps {
  locations: any[]
  onLocationClick: (location: TravelLocation) => void
}

export default function TravelMap({ locations: initialLocations, onLocationClick }: TravelMapProps) {
  const [locations, setLocations] = useState<TravelLocation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Use provided locations
    setLocations(initialLocations as TravelLocation[])
    setLoading(false)
  }, [initialLocations])

  if (loading) {
    return (
      <div className="w-full h-[500px] bg-secondary dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading map...</p>
        </div>
      </div>
    )
  }

  return <MapView locations={locations} onLocationClick={onLocationClick} />
}
