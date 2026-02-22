'use client'

import { useState } from 'react'
import TravelMap from '@/components/TravelMap'
import PhotoGallery from '@/components/PhotoGallery'
import { Heading } from '@/components/ui'
import type { TravelLocation } from '@/lib/types'

interface AboutClientProps {
  locations: any[]
}

export default function AboutClient({ locations }: AboutClientProps) {
  const [selectedLocation, setSelectedLocation] = useState<TravelLocation | null>(null)

  const handleFolderClick = (location: any) => {
    // Convert location to TravelLocation format
    const coords = Array.isArray(location.coordinates)
      ? { lat: location.coordinates[0], lng: location.coordinates[1] }
      : location.coordinates

    setSelectedLocation({
      name: location.name,
      country: location.country,
      type: location.type,
      coordinates: coords,
      folder: location.folder,
      description: location.description || '',
      startYear: location.startYear,
      endYear: location.endYear,
    })
  }

  return (
    <>
      <TravelMap locations={locations} onLocationClick={setSelectedLocation} />

      {/* Photo Folders - Hidden per user request to keep interface clean */}
      {/* Users can click map pins to view photos directly */}

      {/* Photo Gallery Modal */}
      {selectedLocation && (
        <PhotoGallery
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      )}
    </>
  )
}
