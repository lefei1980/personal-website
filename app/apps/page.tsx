import type { Metadata } from 'next'
import { Container, Section, Heading, Card, Badge, Button } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Apps | Personal Website',
  description: 'Web applications and projects I have built',
}

// Mock apps data (will be replaced with real data later)
const apps = [
  {
    name: 'Task Manager Pro',
    description:
      'A full-featured task management application with real-time collaboration, built with React and Firebase.',
    link: 'https://example.com/task-manager',
    tech: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
    status: 'Live',
  },
  {
    name: 'Weather Dashboard',
    description:
      'Beautiful weather forecasting app with interactive charts and location-based recommendations.',
    link: 'https://example.com/weather',
    tech: ['Next.js', 'OpenWeather API', 'Chart.js'],
    status: 'Live',
  },
  {
    name: 'Code Snippet Manager',
    description:
      'Organize and share your favorite code snippets with syntax highlighting and tagging.',
    link: 'https://example.com/snippets',
    tech: ['Next.js', 'PostgreSQL', 'Prisma', 'Vercel'],
    status: 'In Development',
  },
  {
    name: 'Portfolio Analytics',
    description:
      'Track and analyze your portfolio performance with real-time data visualization.',
    link: 'https://example.com/analytics',
    tech: ['React', 'D3.js', 'Node.js', 'MongoDB'],
    status: 'Live',
  },
]

export default function Apps() {
  return (
    <Container>
      <Section>
        {/* Header */}
        <div className="mb-12">
          <Heading level="h1" className="mb-4">
            Applications
          </Heading>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Web applications and projects I've built and deployed
          </p>
        </div>

        {/* Apps Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {apps.map(app => (
            <Card key={app.name} hover={true}>
              {/* Status Badge */}
              <div className="flex justify-between items-start mb-4">
                <Badge
                  variant={app.status === 'Live' ? 'success' : 'warning'}
                >
                  {app.status}
                </Badge>
              </div>

              {/* App Info */}
              <Heading level="h3" className="mb-3">
                {app.name}
              </Heading>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{app.description}</p>

              {/* Tech Stack */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {app.tech.map(tech => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-secondary text-gray-600 dark:text-gray-400 text-sm rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Link */}
              <a
                href={app.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary font-medium hover:text-primary-700 hover:underline group transition-colors"
              >
                View App
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card hover={false} className="text-center bg-secondary/30 dark:bg-gray-700/30">
          <Heading level="h2" className="mb-4">
            Have a project idea?
          </Heading>
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <Button href="mailto:your.email@example.com" size="lg">
            Get in Touch
          </Button>
        </Card>
      </Section>
    </Container>
  )
}
