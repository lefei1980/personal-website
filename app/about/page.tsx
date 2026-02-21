import type { Metadata } from 'next'
import { Container, Section, Heading, Button, Badge, Card } from '@/components/ui'
import AboutClient from '@/components/AboutClient'
import { getBio, getResume, getTravelLocations } from '@/lib/markdown'

export const metadata: Metadata = {
  title: 'About | Portfolio',
  description: 'Learn more about me, my skills, and my journey',
}

export default async function About() {
  const bio = await getBio()
  const resume = await getResume()
  const travelLocations = getTravelLocations()

  return (
    <>
      <Container size="md">
        <Section>
          {/* Header */}
          <div className="mb-12">
            <Heading level="h1" className="mb-4">
              {bio?.title || 'About Me'}
            </Heading>
            {bio?.intro && (
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {bio.intro}
              </p>
            )}
          </div>

          {/* Bio Section */}
          <div className="mb-16">
            <Heading level="h2" className="mb-6">
              Bio
            </Heading>
            {bio?.content ? (
              <div
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: bio.content }}
              />
            ) : (
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
              </div>
            )}
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
              {resume?.title || 'Resume'}
            </Heading>
            {resume?.content || resume?.pdf ? (
              <Card hover={false} className="bg-secondary/30 dark:bg-gray-700/30">
                {resume.content && (
                  <div
                    className="prose dark:prose-invert max-w-none mb-6"
                    dangerouslySetInnerHTML={{ __html: resume.content }}
                  />
                )}
                {resume.pdf && (
                  <div className="flex flex-wrap gap-4">
                    <a href={resume.pdf} download>
                      <Button>Download Resume (PDF)</Button>
                    </a>
                  </div>
                )}
              </Card>
            ) : (
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
            )}
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
            <AboutClient locations={travelLocations} />
          </div>
        </Section>
      </Container>
    </>
  )
}
