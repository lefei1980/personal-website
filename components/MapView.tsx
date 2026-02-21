'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'
import type { TravelLocation } from '@/lib/types'
import 'leaflet/dist/leaflet.css'

interface MapViewProps {
  locations: TravelLocation[]
  onLocationClick: (location: TravelLocation) => void
}

// Custom marker icons
const homeIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#2563eb">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

const tourismIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#ef4444">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

export default function MapView({ locations, onLocationClick }: MapViewProps) {
  // Helper to format coordinates to [lat, lng] array
  const getCoordinates = (coords: any): [number, number] => {
    if (Array.isArray(coords)) return coords as [number, number]
    return [coords.lat, coords.lng]
  }

  // Helper to format year range for home locations
  const formatYears = (startYear?: number, endYear?: number) => {
    if (!startYear) return ''
    const end = endYear || 'Present'
    return `${startYear}–${end}`
  }

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map(location => (
          <Marker
            key={location.folder || location.slug}
            position={getCoordinates(location.coordinates)}
            icon={location.type === 'home' ? homeIcon : tourismIcon}
          >
            <Popup>
              <div className="text-center min-w-[200px]">
                <h3 className="font-semibold text-gray-900 mb-1">{location.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{location.country}</p>
                {location.type === 'home' && location.startYear && (
                  <p className="text-xs text-gray-500 mb-2">
                    🏠 {formatYears(location.startYear, location.endYear)}
                  </p>
                )}
                {location.description && (
                  <p className="text-xs text-gray-600 mb-3 italic">{location.description}</p>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onLocationClick(location)
                  }}
                  className="mt-2 px-4 py-1 text-xs bg-primary text-white rounded hover:bg-primary/90 transition-colors"
                >
                  View Photos
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
