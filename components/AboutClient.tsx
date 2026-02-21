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

      {/* Photo Folders - Same data as map pins */}
      {locations && locations.length > 0 && (
        <div className="mt-16">
          <Heading level="h2" className="mb-6">
            Photo Folders
          </Heading>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {locations
              .filter((loc: any) => loc.folder) // Only show locations with photo folders
              .map((location: any, i: number) => (
                <div
                  key={location.slug || i}
                  onClick={() => handleFolderClick(location)}
                  className="aspect-square bg-secondary dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer group"
                >
                  <div className="text-center">
                    <span className="text-5xl mb-2 block">
                      {location.type === 'home' ? '🏠' : '📁'}
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                      {location.name}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-center text-sm italic">
            Click folders to browse photos, or use the interactive map above
          </p>
        </div>
      )}

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
