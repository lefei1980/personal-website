export interface TravelLocation {
  name: string
  country: string
  type: 'home' | 'tourism'
  coordinates: [number, number] // [latitude, longitude]
  years?: string // For home locations - when you lived there
  description: string
  folder: string // Also used as unique identifier (no separate id needed)
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
