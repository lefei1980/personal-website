export interface TravelLocation {
  name: string
  country: string
  type: 'home' | 'tourism'
  coordinates: { lat: number; lng: number } | [number, number] // Support both formats
  startYear?: number // For home locations - year you started living there
  endYear?: number // For home locations - year you left (empty = Present)
  description?: string
  folder?: string // Also used as unique identifier (no separate id needed)
  slug?: string // Generated from filename
}

export interface TravelData {
  locations: TravelLocation[]
}

export interface PhotoInfo {
  url: string
  filename: string
  dateTaken: string | null // ISO date string from EXIF, null if not available
}

export interface TravelPhotosManifest {
  [folder: string]: PhotoInfo[] // folder name -> array of photo info
}
