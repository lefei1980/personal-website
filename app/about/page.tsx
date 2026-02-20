'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { Container, Section, Heading, Button, Badge, Card } from '@/components/ui'
import TravelMap from '@/components/TravelMap'
import PhotoGallery from '@/components/PhotoGallery'
import type { TravelLocation } from '@/lib/types'

export default function About() {
  const [selectedLocation, setSelectedLocation] = useState<TravelLocation | null>(null)

  return (
    <>
      <Container size="md">
        <Section>
          {/* Header */}
          <div className="mb-12">
            <Heading level="h1" className="mb-4">
              About Me
            </Heading>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Developer, traveler, and continuous learner
            </p>
          </div>

          {/* Bio Section */}
          <div className="mb-16">
            <Heading level="h2" className="mb-6">
              Bio
            </Heading>
            <div className="prose prose-lg max-w-none space-y-4">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I'm a passionate developer with a love for building elegant
                solutions to complex problems. With expertise in modern web
                technologies, I specialize in creating fast, scalable, and
                user-friendly applications.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                When I'm not coding, you can find me exploring new places,
                experimenting with new technologies, or sharing what I've learned
                through blog posts and open-source contributions.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I believe in continuous learning and the power of the developer
                community. This website serves as my digital garden where I share
                my journey, projects, and insights.
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-16">
            <Heading level="h2" className="mb-6">
              Skills & Technologies
            </Heading>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Heading level="h3" className="mb-4">
                  Frontend
                </Heading>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript'].map(
                    skill => (
                      <Badge key={skill} variant="primary">
                        {skill}
                      </Badge>
                    )
                  )}
                </div>
              </div>
              <div>
                <Heading level="h3" className="mb-4">
                  Tools & Platforms
                </Heading>
                <div className="flex flex-wrap gap-2">
                  {['Git', 'GitHub', 'VS Code', 'Cloudflare', 'Vercel'].map(
                    skill => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Resume Section */}
          <div className="mb-16">
            <Heading level="h2" className="mb-6">
              Resume
            </Heading>
            <Card hover={false} className="bg-secondary/30 dark:bg-gray-700/30">
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Interested in my professional experience? Download my resume or view
                it online.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button>Download Resume (PDF)</Button>
                <Button variant="secondary">View Online</Button>
              </div>
            </Card>
          </div>

          {/* Travel Map Section */}
          <div className="mb-16">
            <Heading level="h2" className="mb-4">
              Travel Map
            </Heading>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Explore the places I've visited and called home. Click on any pin to view photos!
            </p>
            <div className="mb-4">
              <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">🏠</span>
                  <span>Home/Residence</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-600">📍</span>
                  <span>Places Visited</span>
                </div>
              </div>
            </div>
            <TravelMap onLocationClick={setSelectedLocation} />
          </div>

          {/* Traditional Folder Gallery */}
          <div>
            <Heading level="h2" className="mb-6">
              Photo Folders
            </Heading>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {/* Placeholder folder cards */}
              {['Yellowstone', 'Tokyo', 'Paris', 'Boston', 'Atlanta', 'More...'].map((folder, i) => (
                <div
                  key={i}
                  className="aspect-square bg-secondary dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer group"
                >
                  <div className="text-center">
                    <span className="text-5xl mb-2 block">📁</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                      {folder}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-center text-sm italic">
              Click folders to browse photos, or use the interactive map above
            </p>
          </div>
        </Section>
      </Container>

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
