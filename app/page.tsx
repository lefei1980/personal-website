import { Container, Section, Button, Card, Heading } from '@/components/ui'
import { getHomeContent } from '@/lib/markdown'

export default async function Home() {
  const home = await getHomeContent()
  return (
    <Container>
      {/* Hero Section */}
      <Section className="py-20 md:py-32">
        <div className="max-w-3xl">
          <Heading level="h1" className="mb-6">
            Hi, I'm <span className="text-primary">{home?.name || 'Your Name'}</span>
          </Heading>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {home?.tagline || 'Developer, creator, and lifelong learner. I build web applications and share my journey through code.'}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/about" size="lg">
              About Me
            </Button>
            <Button href="/blog" variant="secondary" size="lg">
              Read Blog
            </Button>
            <Button href="/apps" variant="outline" size="lg">
              View Apps
            </Button>
          </div>
        </div>
      </Section>

      {/* Featured Section */}
      <Section className="border-t border-gray-200 dark:border-gray-700">
        <Heading level="h2" className="mb-8">
          Featured
        </Heading>
        <div className="grid md:grid-cols-3 gap-8">
          {/* About Card */}
          <Card href="/about">
            <div className="text-4xl mb-4">{home?.featured.about.emoji || '👤'}</div>
            <Heading level="h3" className="mb-3 group-hover:text-primary transition-colors">
              {home?.featured.about.title || 'About Me'}
            </Heading>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {home?.featured.about.description || 'Learn about my background, skills, and experience.'}
            </p>
          </Card>

          {/* Blog Card */}
          <Card href="/blog">
            <div className="text-4xl mb-4">{home?.featured.blog.emoji || '📝'}</div>
            <Heading level="h3" className="mb-3 group-hover:text-primary transition-colors">
              {home?.featured.blog.title || 'Blog'}
            </Heading>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {home?.featured.blog.description || 'Thoughts on development and tutorials.'}
            </p>
          </Card>

          {/* Apps Card */}
          <Card href="/apps">
            <div className="text-4xl mb-4">{home?.featured.apps.emoji || '🚀'}</div>
            <Heading level="h3" className="mb-3 group-hover:text-primary transition-colors">
              {home?.featured.apps.title || 'Applications'}
            </Heading>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {home?.featured.apps.description || 'Explore the web applications I\'ve built.'}
            </p>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="border-t border-gray-200 dark:border-gray-700">
        <div className="text-center max-w-2xl mx-auto">
          <Heading level="h2" className="mb-4">
            {home?.cta.heading || "Let's Connect"}
          </Heading>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {home?.cta.description || 'Interested in collaborating or just want to say hi? Feel free to reach out.'}
          </p>
          <div className="flex justify-center gap-4">
            {home?.cta.github && (
              <Button
                href={home.cta.github}
                size="lg"
              >
                GitHub
              </Button>
            )}
            {home?.cta.email && (
              <Button
                href={`mailto:${home.cta.email}`}
                variant="outline"
                size="lg"
              >
                Email
              </Button>
            )}
          </div>
        </div>
      </Section>
    </Container>
  )
}
