import MarketingLayout from '@/Layouts/MarketingLayout'
import { Container, Section } from '@/Components/Website/Container'
import { MarketingButton } from '@/Components/Website/MarketingButton'
import { makeSeo } from '@/data/mock'

export default function NotFound() {
  return (
    <MarketingLayout
      seo={makeSeo('Page not found — MailerMine', 'The page you requested could not be found.', '/404')}
    >
      <Section className="pt-28 lg:pt-36">
        <Container className="max-w-xl text-center">
          <p className="font-mono text-sm text-zinc-500">404</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <MarketingButton href="/">Go home</MarketingButton>
            <MarketingButton href="/docs" variant="secondary">
              Browse docs
            </MarketingButton>
          </div>
        </Container>
      </Section>
    </MarketingLayout>
  )
}
