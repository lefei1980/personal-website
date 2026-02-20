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
            key={location.folder}
            position={location.coordinates}
            icon={location.type === 'home' ? homeIcon : tourismIcon}
            eventHandlers={{
              click: () => onLocationClick(location),
            }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900">{location.name}</h3>
                <p className="text-sm text-gray-600">{location.country}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {location.type === 'home' ? `🏠 ${location.years}` : `🌍 ${location.country}`}
                </p>
                <button className="mt-2 text-xs text-primary hover:underline">
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
