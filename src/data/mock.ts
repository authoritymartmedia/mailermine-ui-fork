import type { SeoData } from '@/content/website'
import type { PublicPricingPlan } from '@/Components/Website/PricingPlanGrid'

export function makeSeo(
  title: string,
  description: string,
  path = '/',
): SeoData {
  return {
    title,
    description,
    canonical: `https://mailermine.com${path}`,
    ogImage: '/images/brand/logo-white.png',
  }
}

/** Static snapshot matching PublicPlanCatalog serialize() shape. */
export const mockPlans: PublicPricingPlan[] = [
  {
    uuid: 'plan-free',
    slug: 'free',
    name: 'Free',
    description: 'For side projects and exploration.',
    price: '$0',
    period: 'forever',
    emails: 3000,
    emails_label: '3,000 emails / mo',
    emails_note: null,
    features: [
      '1 domain',
      '1 project',
      'API access',
      'Dashboard',
      'Community support',
    ],
    cta: 'Get started',
    cta_href: '/signup',
    highlighted: false,
    badge_label: null,
    is_enterprise: false,
  },
  {
    uuid: 'plan-pro',
    slug: 'pro',
    name: 'Pro',
    description: 'For growing products and startups.',
    price: '$29',
    period: '/month',
    emails: 50000,
    emails_label: '50,000 emails / mo',
    emails_note: null,
    features: [
      'Unlimited domains',
      'Unlimited projects',
      'Webhooks & analytics',
      'Team seats',
      'Priority support',
    ],
    cta: 'Start Pro',
    cta_href: '/signup',
    highlighted: true,
    badge_label: 'Most popular',
    is_enterprise: false,
  },
  {
    uuid: 'plan-scale',
    slug: 'scale',
    name: 'Scale',
    description: 'For high-volume sending teams.',
    price: '$99',
    period: '/month',
    emails: 250000,
    emails_label: '250,000 emails / mo',
    emails_note: null,
    features: [
      'Dedicated IP option',
      'Advanced analytics',
      'Custom limits',
      'SLA',
      '24/7 support',
    ],
    cta: 'Start Scale',
    cta_href: '/signup',
    highlighted: false,
    badge_label: null,
    is_enterprise: false,
  },
  {
    uuid: 'plan-enterprise',
    slug: 'enterprise',
    name: 'Enterprise',
    description: 'Custom volume, contracts, and support.',
    price: 'Custom',
    period: '',
    emails: null,
    emails_label: 'Custom volume for your needs',
    emails_note: null,
    features: [
      'Dedicated infrastructure',
      'Custom contracts',
      'SSO',
      'Security reviews',
      '24/7 support',
    ],
    cta: 'Contact sales',
    cta_href: '/contact',
    highlighted: false,
    badge_label: null,
    is_enterprise: true,
  },
]

export type BlogPostCard = {
  uuid: string
  title: string
  slug: string
  excerpt: string | null
  featured_image_url: string | null
  author_name: string
  reading_time_minutes: number | null
  published_at_human: string | null
  category: { name: string; slug: string } | null
}

export type BlogPostDetail = BlogPostCard & {
  body: string
}

export const mockBlogCategories = [
  { name: 'Product', slug: 'product' },
  { name: 'Guides', slug: 'guides' },
  { name: 'Engineering', slug: 'engineering' },
]

export const mockBlogPosts: BlogPostDetail[] = [
  {
    uuid: 'post-1',
    title: 'Introducing MailerMine: Email infrastructure for developers',
    slug: 'introducing-mailermine',
    excerpt: 'Why we built MailerMine and what makes it different.',
    featured_image_url: null,
    author_name: 'MailerMine Team',
    reading_time_minutes: 5,
    published_at_human: 'Jul 1, 2026',
    category: { name: 'Product', slug: 'product' },
    body: `<p>MailerMine combines transactional and marketing email in one developer-first platform.</p><p>This is static demo content for the standalone public UI project.</p>`,
  },
  {
    uuid: 'post-2',
    title: 'Transactional vs marketing email: a practical guide',
    slug: 'transactional-vs-marketing',
    excerpt: 'When to use each, and how MailerMine handles both.',
    featured_image_url: null,
    author_name: 'Sarah Chen',
    reading_time_minutes: 8,
    published_at_human: 'Jun 28, 2026',
    category: { name: 'Guides', slug: 'guides' },
    body: `<p>Transactional email is triggered by user actions. Marketing email is broadcast to audiences.</p><p>MailerMine supports both on the same delivery pipeline.</p>`,
  },
  {
    uuid: 'post-3',
    title: 'Webhooks deep dive: building reliable event handlers',
    slug: 'webhooks-deep-dive',
    excerpt: 'Signature verification, retries, and idempotency patterns.',
    featured_image_url: null,
    author_name: 'Marcus Webb',
    reading_time_minutes: 12,
    published_at_human: 'Jun 20, 2026',
    category: { name: 'Engineering', slug: 'engineering' },
    body: `<p>Always verify HMAC signatures. Retry with backoff. Make handlers idempotent.</p>`,
  },
]

export function getBlogListData(category: string | null) {
  const filtered = category
    ? mockBlogPosts.filter((p) => p.category?.slug === category)
    : mockBlogPosts

  const cards = filtered.map(({ body: _body, ...card }) => card)
  const featured = cards[0] ?? null

  return {
    posts: {
      data: cards,
      links: [
        { url: null, label: '&laquo; Previous', active: false },
        { url: '/blog', label: '1', active: true },
        { url: null, label: 'Next &raquo;', active: false },
      ],
    },
    featured,
    categories: mockBlogCategories,
    filters: { category },
  }
}

export function getBlogPost(slug: string) {
  const post = mockBlogPosts.find((p) => p.slug === slug)
  if (!post) return null
  const related = mockBlogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3)
    .map(({ body: _body, ...card }) => card)
  return { post, related }
}
