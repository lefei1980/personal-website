'use client'

import { useEffect, useState } from 'react'
import type { TravelLocation, TravelPhotosManifest, PhotoInfo } from '@/lib/types'

interface PhotoGalleryProps {
  location: TravelLocation
  onClose: () => void
}

export default function PhotoGallery({ location, onClose }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [photos, setPhotos] = useState<PhotoInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load photos from manifest
    fetch('/travel-photos-manifest.json')
      .then(res => res.json())
      .then((manifest: TravelPhotosManifest) => {
        const folderPhotos = location.folder ? (manifest[location.folder] || []) : []
        if (folderPhotos.length === 0) {
          // Fallback to placeholder if no photos found
          setPhotos([{
            url: '/placeholder-photo.jpg',
            filename: 'placeholder.jpg',
            dateTaken: null
          }])
        } else {
          setPhotos(folderPhotos)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load photos:', err)
        setPhotos([{
          url: '/placeholder-photo.jpg',
          filename: 'placeholder.jpg',
          dateTaken: null
        }])
        setLoading(false)
      })
  }, [location])

  useEffect(() => {
    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, photos.length])

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? photos.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prev => (prev === photos.length - 1 ? 0 : prev + 1))
  }

  const formatPhotoDate = (isoDate: string | null) => {
    if (!isoDate) return null
    const date = new Date(isoDate)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading photos...</p>
        </div>
      </div>
    )
  }

  const currentPhoto = photos[currentIndex]

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
        aria-label="Close gallery"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Backdrop click to close */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Close gallery backdrop"
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl w-full">
        {/* Location Info */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">{location.name}</h2>
          <p className="text-gray-300 mb-1">{location.description}</p>
          <p className="text-sm text-gray-400">
            {location.type === 'home' ? (
              <span>🏠 Home • {location.startYear}{location.endYear ? `-${location.endYear}` : '-Present'}</span>
            ) : (
              <span>🌍 {location.country}</span>
            )}
          </p>
        </div>

        {/* Photo Display */}
        <div className="relative bg-gray-900 rounded-lg overflow-hidden">
          {/* Main Photo */}
          <div className="aspect-video bg-gray-800 flex items-center justify-center">
            <img
              src={currentPhoto.url}
              alt={`${location.name} - ${currentPhoto.filename}`}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                // Fallback for missing images
                e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                  <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
                    <rect width="400" height="300" fill="#1f2937"/>
                    <text x="200" y="150" font-family="Arial" font-size="20" fill="#9ca3af" text-anchor="middle">
                      📷 ${location.name}
                    </text>
                    <text x="200" y="180" font-family="Arial" font-size="14" fill="#6b7280" text-anchor="middle">
                      ${currentPhoto.filename}
                    </text>
                  </svg>
                `)}`
              }}
            />
          </div>

          {/* Photo Info Overlay */}
          <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg">
            <p className="text-sm font-medium">{currentPhoto.filename}</p>
            {currentPhoto.dateTaken && (
              <p className="text-xs text-gray-300 mt-1">
                📅 {formatPhotoDate(currentPhoto.dateTaken)}
              </p>
            )}
          </div>

          {/* Navigation Arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                aria-label="Previous photo"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                aria-label="Next photo"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Photo Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
            {currentIndex + 1} / {photos.length}
          </div>
        </div>

        {/* Thumbnail Strip */}
        {photos.length > 1 && (
          <div className="mt-4 flex gap-2 justify-center overflow-x-auto pb-2">
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? 'border-primary scale-105'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                title={photo.dateTaken ? formatPhotoDate(photo.dateTaken) || undefined : undefined}
              >
                <img
                  src={photo.url}
                  alt={photo.filename}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
                        <rect width="80" height="80" fill="#374151"/>
                        <text x="40" y="45" font-family="Arial" font-size="24" fill="#9ca3af" text-anchor="middle">
                          📷
                        </text>
                      </svg>
                    `)}`
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
