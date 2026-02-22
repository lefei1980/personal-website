---
title: "Travel Book Generator"
description: "Convert structured itinerary input into a downloadable, professionally formatted, map-rich PDF travel guide with automated geocoding, routing, and Wikipedia enrichment."
url: "https://travel-book-generator.vercel.app/"
github: "https://github.com/lefei1980/travel-book-generator"
tech:
  - "Next.js"
  - "React"
  - "TypeScript"
  - "FastAPI"
  - "Python"
  - "Playwright"
  - "Leaflet"
  - "SQLite"
  - "Groq LLM"
image: ""
status: "active"
---

TravelBook Generator is a full-stack application that transforms structured travel itineraries into professional, map-rich PDF travel guides. Simply input your trip details, and the app automatically geocodes locations, calculates routes, enriches with Wikipedia content and images, and generates a beautifully formatted PDF.

## How It Works

The application uses a sophisticated background processing pipeline:

1. **User Input**: Submit trip details including destinations, attractions, and restaurants
2. **Geocoding**: Automatically converts location names to coordinates using Nominatim (with caching)
3. **Routing**: Calculates optimal routes between locations using OSRM
4. **Enrichment**: Fetches Wikipedia summaries and Wikimedia Commons images for each location
5. **Rendering**: Generates interactive Leaflet maps embedded in HTML
6. **PDF Generation**: Converts HTML to PDF using Playwright (no intermediate image files)

## Architecture

**Frontend** (Next.js)
- POST to create trip (returns trip ID immediately)
- Polls for status updates
- Downloads PDF when ready

**Backend** (FastAPI)
- Saves trip with `pending` status
- Launches background processing pipeline
- Stores enriched data as JSON in SQLite
- Renders HTML with embedded Leaflet maps
- Converts directly to PDF using Playwright

**LLM Integration** (Groq)
- Uses Llama 3.3 70B for intelligent content generation
- Free tier with 30 RPM, 1,000 requests/day

## Key Features

- **Automated Pipeline**: Full geocoding → routing → enrichment → PDF workflow
- **Direct PDF Rendering**: HTML + Leaflet maps render directly to PDF (no intermediate PNGs)
- **Smart Caching**: SQLite database caches geocoding results for performance
- **Rate Limiting**: Respects Nominatim's 1 req/sec limit with custom User-Agent
- **Attribution**: Only uses CC/public domain images with proper attribution
- **Deployment**: Frontend on Vercel, backend on Oracle Cloud Always Free VM

## Status Lifecycle

Trips progress through states: `pending → geocoding → routing → enriching → rendering → complete`

Users can track progress in real-time as the backend processes their itinerary.
