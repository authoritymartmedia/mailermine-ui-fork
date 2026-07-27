import { useMemo } from 'react'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import HomePage from '@/Pages/Website/Home'
import FeaturesPage from '@/Pages/Website/Features'
import PricingPage from '@/Pages/Website/Pricing'
import DocsPage from '@/Pages/Website/Docs'
import ChangelogPage from '@/Pages/Website/Changelog'
import BlogPage from '@/Pages/Website/Blog'
import BlogShowPage from '@/Pages/Website/BlogShow'
import IntegrationsPage from '@/Pages/Website/Integrations'
import AboutPage from '@/Pages/Website/About'
import CustomersPage from '@/Pages/Website/Customers'
import ContactPage from '@/Pages/Website/Contact'
import PrivacyPage from '@/Pages/Website/Privacy'
import TermsPage from '@/Pages/Website/Terms'
import StatusPage from '@/Pages/Website/Status'
import LoginPage from '@/Pages/Auth/Login'
import RegisterPage from '@/Pages/Auth/Register'
import ForgotPasswordPage from '@/Pages/Auth/ForgotPassword'
import ResetPasswordPage from '@/Pages/Auth/ResetPassword'
import {
  getBlogListData,
  getBlogPost,
  makeSeo,
  mockPlans,
} from '@/data/mock'
import NotFound from '@/Pages/NotFound'

export function Home() {
  return (
    <HomePage
      seo={makeSeo(
        'MailerMine — Developer-first Email API',
        'Reliable transactional and marketing email infrastructure for modern teams.',
        '/',
      )}
      plans={mockPlans}
    />
  )
}

export function Features() {
  return (
    <FeaturesPage
      seo={makeSeo(
        'Features — MailerMine',
        'Transactional email, campaigns, AI tools, webhooks, domains, and analytics.',
        '/features',
      )}
    />
  )
}

export function Pricing() {
  return (
    <PricingPage
      seo={makeSeo(
        'Pricing — MailerMine',
        'Simple, transparent pricing for transactional and marketing email.',
        '/pricing',
      )}
      plans={mockPlans}
    />
  )
}

export function Docs() {
  return (
    <DocsPage
      seo={makeSeo(
        'Documentation — MailerMine',
        'Guides, API reference, SDKs, and examples to integrate MailerMine.',
        '/docs',
      )}
    />
  )
}

export function Changelog() {
  return (
    <ChangelogPage
      seo={makeSeo(
        'Changelog — MailerMine',
        'Latest updates, features, and improvements to the MailerMine platform.',
        '/changelog',
      )}
    />
  )
}

export function Blog() {
  const [params] = useSearchParams()
  const category = params.get('category')
  const data = useMemo(() => getBlogListData(category), [category])

  return (
    <BlogPage
      seo={makeSeo(
        'Blog — MailerMine',
        'Engineering notes, product updates, and email deliverability insights.',
        '/blog',
      )}
      {...data}
    />
  )
}

export function BlogShow() {
  const { slug = '' } = useParams()
  const data = getBlogPost(slug)

  if (!data) {
    return <NotFound />
  }

  return (
    <BlogShowPage
      seo={makeSeo(
        `${data.post.title} — MailerMine Blog`,
        data.post.excerpt || 'Read more on the MailerMine blog.',
        `/blog/${data.post.slug}`,
      )}
      post={data.post}
      related={data.related}
    />
  )
}

export function Integrations() {
  return (
    <IntegrationsPage
      seo={makeSeo(
        'Integrations — MailerMine',
        'Connect MailerMine with Laravel, Node, Python, Go, webhooks, and your favorite tools.',
        '/integrations',
      )}
    />
  )
}

export function About() {
  return (
    <AboutPage
      seo={makeSeo(
        'About — MailerMine',
        'Our mission to build the most developer-friendly email infrastructure.',
        '/about',
      )}
    />
  )
}

export function Customers() {
  return (
    <CustomersPage
      seo={makeSeo(
        'Customers — MailerMine',
        'Teams that trust MailerMine for email infrastructure.',
        '/customers',
      )}
    />
  )
}

export function Contact() {
  return (
    <ContactPage
      seo={makeSeo(
        'Contact — MailerMine',
        'Talk to sales or get support from the MailerMine team.',
        '/contact',
      )}
    />
  )
}

export function Privacy() {
  return (
    <PrivacyPage
      seo={makeSeo(
        'Privacy Policy — MailerMine',
        'How MailerMine collects, uses, and protects your information.',
        '/privacy',
      )}
    />
  )
}

export function Terms() {
  return (
    <TermsPage
      seo={makeSeo(
        'Terms of Service — MailerMine',
        'Terms governing use of the MailerMine platform.',
        '/terms',
      )}
    />
  )
}

export function Status() {
  return (
    <StatusPage
      seo={makeSeo(
        'Status — MailerMine',
        'Real-time status for MailerMine API, SMTP, dashboard, and webhooks.',
        '/status',
      )}
    />
  )
}

export function Login() {
  return <LoginPage canResetPassword status={undefined} />
}

export function Signup() {
  return <RegisterPage />
}

export function ForgotPassword() {
  return <ForgotPasswordPage status={undefined} />
}

export function ResetPassword() {
  const { token = 'demo-token' } = useParams()
  const [params] = useSearchParams()
  return (
    <ResetPasswordPage
      token={token}
      email={params.get('email') ?? ''}
    />
  )
}

export function SignupRedirect() {
  return <Navigate to="/register" replace />
}
