---
title: "Building Interactive Maps with Leaflet and React"
date: "2026-02-18"
description: "A technical guide to creating beautiful, interactive maps in React using Leaflet.js and OpenStreetMap."
tags: ["react", "maps", "leaflet", "tutorial"]
---

# Building Interactive Maps with Leaflet and React

Interactive maps can transform a static website into an engaging, visual experience. In this tutorial, I'll show you how to integrate Leaflet.js with React to create beautiful, customizable maps.

## Why Leaflet?

Leaflet is a lightweight, open-source JavaScript library for interactive maps. Key advantages:

- **Free and open-source** - No API keys or usage limits
- **Lightweight** - Only 42KB gzipped
- **Mobile-friendly** - Works great on touch devices
- **Customizable** - Full control over appearance and behavior

## Installation

First, install the required dependencies:

```bash
npm install leaflet react-leaflet
npm install -D @types/leaflet
```

## Basic Setup

Here's a minimal map component:

```tsx
'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function SimpleMap() {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A sample marker!
        </Popup>
      </Marker>
    </MapContainer>
  )
}
```

## Custom Markers

You can create custom SVG markers for different location types:

```tsx
import { Icon } from 'leaflet'

const customIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
      <circle cx="16" cy="16" r="12" fill="#ef4444"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
})
```

## Next.js Considerations

When using Leaflet with Next.js, remember to:

1. **Use dynamic imports** to avoid SSR issues
2. **Add 'use client'** directive for client components
3. **Import CSS** in the component file

```tsx
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div>Loading map...</div>
})
```

## Result

The final result is a fully interactive map that users can pan, zoom, and explore. Perfect for travel blogs, store locators, or data visualization!

## Resources

- [Leaflet Documentation](https://leafletjs.com/)
- [React Leaflet](https://react-leaflet.js.org/)
- [OpenStreetMap](https://www.openstreetmap.org/)

Happy mapping!
