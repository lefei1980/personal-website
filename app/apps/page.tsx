import type { Metadata } from 'next'
import { Container, Section, Heading, Card, Badge, Button } from '@/components/ui'
import { getAllApps } from '@/lib/markdown'

export const metadata: Metadata = {
  title: 'Apps | Personal Website',
  description: 'Web applications and projects I have built',
}

export default async function Apps() {
  const apps = await getAllApps()
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
          {apps.length > 0 ? (
            apps.map(app => (
              <Card key={app.slug} hover={true}>
                {/* Status Badge */}
                <div className="flex justify-between items-start mb-4">
                  <Badge
                    variant={
                      app.status === 'active'
                        ? 'success'
                        : app.status === 'maintenance'
                        ? 'warning'
                        : 'secondary'
                    }
                  >
                    {app.status === 'active' ? 'Live' : app.status === 'maintenance' ? 'Maintenance' : 'Archived'}
                  </Badge>
                </div>

                {/* App Info */}
                <Heading level="h3" className="mb-3">
                  {app.title}
                </Heading>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {app.description}
                </p>

                {/* Tech Stack */}
                {app.tech && app.tech.length > 0 && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {app.tech.map(tech => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-secondary dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="flex flex-wrap gap-4">
                  {app.url && (
                    <a
                      href={app.url}
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
                  )}
                  {app.github && (
                    <a
                      href={app.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-gray-600 dark:text-gray-400 font-medium hover:text-gray-900 dark:hover:text-gray-200 hover:underline transition-colors"
                    >
                      GitHub
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No apps yet. Add some via the CMS!
              </p>
            </div>
          )}
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
