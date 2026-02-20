import type { Metadata } from 'next'
import { Container, Section, Heading, Button, Badge, Card } from '@/components/ui'

export const metadata: Metadata = {
  title: 'About | Personal Website',
  description: 'Learn more about me, my background, and experience',
}

export default function About() {
  return (
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

        {/* Travel Photos Section */}
        <div>
          <Heading level="h2" className="mb-6">
            Travel Gallery
          </Heading>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {/* Placeholder cards for travel photos */}
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div
                key={i}
                className="aspect-square bg-secondary dark:bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <span className="text-5xl">📷</span>
              </div>
            ))}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-center italic">
            Interactive travel map coming in Phase 2.5!
          </p>
        </div>
      </Section>
    </Container>
  )
}
