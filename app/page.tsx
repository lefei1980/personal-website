import { Container, Section, Button, Card, Heading } from '@/components/ui'

export default function Home() {
  return (
    <Container>
      {/* Hero Section */}
      <Section className="py-20 md:py-32">
        <div className="max-w-3xl">
          <Heading level="h1" className="mb-6">
            Hi, I'm <span className="text-primary">Your Name</span>
          </Heading>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Developer, creator, and lifelong learner. I build web applications
            and share my journey through code.
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
      <Section className="border-t border-gray-200">
        <Heading level="h2" className="mb-8">
          Featured
        </Heading>
        <div className="grid md:grid-cols-3 gap-8">
          {/* About Card */}
          <Card href="/about">
            <div className="text-4xl mb-4">👤</div>
            <Heading level="h3" className="mb-3 group-hover:text-primary transition-colors">
              About Me
            </Heading>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Learn about my background, skills, and experience. View my resume
              and travel photos.
            </p>
          </Card>

          {/* Blog Card */}
          <Card href="/blog">
            <div className="text-4xl mb-4">📝</div>
            <Heading level="h3" className="mb-3 group-hover:text-primary transition-colors">
              Blog
            </Heading>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Thoughts on development, tutorials, and personal experiences.
              Updated regularly.
            </p>
          </Card>

          {/* Apps Card */}
          <Card href="/apps">
            <div className="text-4xl mb-4">🚀</div>
            <Heading level="h3" className="mb-3 group-hover:text-primary transition-colors">
              Applications
            </Heading>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Explore the web applications and projects I've built and
              deployed.
            </p>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="border-t border-gray-200">
        <div className="text-center max-w-2xl mx-auto">
          <Heading level="h2" className="mb-4">
            Let's Connect
          </Heading>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Interested in collaborating or just want to say hi? Feel free to
            reach out.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              href="https://github.com/lefei1980"
              size="lg"
            >
              GitHub
            </Button>
            <Button
              href="mailto:your.email@example.com"
              variant="outline"
              size="lg"
            >
              Email
            </Button>
          </div>
        </div>
      </Section>
    </Container>
  )
}
