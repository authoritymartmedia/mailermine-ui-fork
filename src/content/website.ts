export interface SeoData {
    title: string;
    description: string;
    canonical: string;
    ogImage?: string;
}

export const trustedLogos = [
    { name: 'Supabase' },
    { name: 'Cal.com' },
    { name: 'Payload CMS' },
    { name: 'Better Stack' },
    { name: 'Appwrite' },
    { name: 'Coolify' },
    { name: 'MedusaJS' },
    { name: 'Directus' },
    { name: 'Plausible' },
    { name: 'Trigger.dev' },
    { name: 'Dub.co' },
    { name: 'Railway' },
];

export const codeExamples: Record<string, string> = {
    node: `import { MailerMine } from '@mailermine/node';

const mm = new MailerMine({
  apiKey: process.env.MAILERMINE_API_KEY!,
});

const sent = await mm.emails.send({
  from: 'onboarding@mailermine.dev',
  to: 'delivered@mailermine.dev',
  subject: 'Hello World',
  html: '<strong>it works!</strong>',
  text: 'it works!',
});

console.log(sent);`,
    serverless: `// Vercel / AWS Lambda
import { MailerMine } from '@mailermine/node';

const mm = new MailerMine({ apiKey: process.env.MAILERMINE_API_KEY! });

export default async function handler(req, res) {
  const sent = await mm.emails.send({
    from: 'hello@mailermine.dev',
    to: 'user@example.com',
    subject: 'Hello from serverless',
    html: '<p>Sent from a function.</p>',
  });
  res.status(200).json(sent);
}`,
    ruby: `require 'mailermine'

mailermine = MailerMine::Client.new(api_key: ENV['MAILERMINE_API_KEY'])

mailermine.emails.send(
  from: 'hello@mailermine.dev',
  to: 'user@example.com',
  subject: 'Hello World',
  html: '<strong>it works!</strong>'
)`,
    python: `import os
from mailermine import MailerMine

client = MailerMine(api_key=os.environ["MAILERMINE_API_KEY"])

response = client.emails.send(
    from_="hello@mailermine.dev",
    to="user@example.com",
    subject="Hello World",
    html="<strong>it works!</strong>",
)

print(response)`,
    php: `<?php

use MailerMine\\Client;

$mm = new Client(getenv('MAILERMINE_API_KEY'));

$response = $mm->emails()->send([
    'from' => 'hello@mailermine.dev',
    'to' => 'user@example.com',
    'subject' => 'Hello World',
    'html' => '<strong>it works!</strong>',
]);`,
    cli: `$ mailermine emails send \\
  --from hello@mailermine.dev \\
  --to user@example.com \\
  --subject "Hello World" \\
  --html "<strong>it works!</strong>"`,
    go: `package main

import "github.com/mailermine/sdk-go"

func main() {
    client := mailermine.NewClient(os.Getenv("MAILERMINE_API_KEY"))
    client.Emails.Send(&mailermine.SendParams{
        From:    "hello@mailermine.dev",
        To:      "user@example.com",
        Subject: "Hello World",
        HTML:    "<strong>it works!</strong>",
    })
}`,
    rust: `use mailermine::MailerMine;

#[tokio::main]
async fn main() {
    let mailermine = MailerMine::new(std::env::var("MAILERMINE_API_KEY").unwrap());
    mailermine.emails().send(Email {
        from: "hello@mailermine.dev".into(),
        to: "user@example.com".into(),
        subject: "Hello World".into(),
        html: "<strong>it works!</strong>".into(),
    }).await;
}`,
    java: `var mailermine = MailerMineClient.builder()
    .apiKey(System.getenv("MAILERMINE_API_KEY"))
    .build();

mailermine.emails().send(EmailRequest.builder()
    .from("hello@mailermine.dev")
    .to("user@example.com")
    .subject("Hello World")
    .html("<strong>it works!</strong>")
    .build());`,
    elixir: `{:ok, _} = MailerMine.Emails.send(%{
  from: "hello@mailermine.dev",
  to: "user@example.com",
  subject: "Hello World",
  html: "<strong>it works!</strong>"
})`,
    dotnet: `using MailerMine;

var mailermine = new MailerMineClient(Environment.GetEnvironmentVariable("MAILERMINE_API_KEY"));

await mailermine.Emails.SendAsync(new EmailRequest {
    From = "hello@mailermine.dev",
    To = "user@example.com",
    Subject = "Hello World",
    Html = "<strong>it works!</strong>"
});`,
    rest: `POST https://api.mailermine.com/v1/emails
Authorization: Bearer mailermine_xxxx
Content-Type: application/json

{
  "from": "hello@mailermine.dev",
  "to": "user@example.com",
  "subject": "Hello World",
  "html": "<strong>it works!</strong>"
}`,
    smtp: `Host: smtp.mailermine.com
Port: 587
Username: mailermine
Password: mailermine_xxxx

From: hello@mailermine.dev
To: user@example.com
Subject: Hello World`,
    laravel: `<?php

use MailerMine\\Facades\\MailerMine;

MailerMine::emails()->send([
    'from' => 'hello@mailermine.dev',
    'to' => 'user@example.com',
    'subject' => 'Hello World',
    'html' => '<strong>it works!</strong>',
]);`,
    curl: `curl -X POST 'https://api.mailermine.com/v1/emails' \\
  -H 'Authorization: Bearer mailermine_xxxx' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "from": "hello@mailermine.dev",
    "to": "user@example.com",
    "subject": "Hello World",
    "html": "<strong>it works!</strong>"
  }'`,
};

export const integrationLanguages = [
    { id: 'node', label: 'Node.js', icon: 'JS' },
    { id: 'serverless', label: 'Serverless', icon: 'λ' },
    { id: 'ruby', label: 'Ruby', icon: '◆' },
    { id: 'python', label: 'Python', icon: 'Py' },
    { id: 'php', label: 'PHP', icon: 'PHP' },
    { id: 'cli', label: 'CLI', icon: '>_'},
    { id: 'go', label: 'Go', icon: 'Go' },
    { id: 'rust', label: 'Rust', icon: 'Rs' },
    { id: 'java', label: 'Java', icon: 'J' },
    { id: 'elixir', label: 'Elixir', icon: 'Ex' },
    { id: 'dotnet', label: '.NET', icon: '.N' },
    { id: 'rest', label: 'REST', icon: '{}' },
    { id: 'smtp', label: 'SMTP', icon: '@' },
] as const;

export const nodeFrameworks = [
    { id: 'node', label: 'Node.js', icon: 'JS' },
    { id: 'nextjs', label: 'Next.js', icon: 'N' },
    { id: 'remix', label: 'Remix', icon: 'R' },
    { id: 'nuxt', label: 'Nuxt', icon: 'Nu' },
    { id: 'express', label: 'Express', icon: 'Ex' },
    { id: 'hono', label: 'Hono', icon: 'H' },
    { id: 'redwood', label: 'Redwood', icon: 'Rw' },
    { id: 'bun', label: 'Bun', icon: 'Bn' },
    { id: 'astro', label: 'Astro', icon: 'As' },
] as const;

export const productFeatures = [
    {
        icon: 'Mail',
        title: 'Transactional Email',
        description: 'Send password resets, receipts, and notifications with a simple REST API.',
        preview: 'transactional',
        details: [
            'Production-ready REST API with predictable responses',
            'Idempotent sends with request IDs',
            'Full per-message event timeline',
        ],
    },
    {
        icon: 'Megaphone',
        title: 'Marketing Campaigns',
        description: 'Broadcast to audiences with a visual campaign builder and scheduling.',
        preview: 'campaigns',
        details: [
            'Audience, design, schedule, and review wizard',
            'Segment targeting with live recipient counts',
            'Draft, schedule, and send from one flow',
        ],
    },
    {
        icon: 'Sparkles',
        title: 'AI Campaign Analyzer',
        description: 'Score every campaign before you send — deliverability, spam risk, CTAs, and predicted engagement.',
        preview: 'ai-campaign',
        details: [
            'Overall score with category breakdowns',
            'Predicted open, click, and inbox placement',
            'Actionable suggestions from rules + AI review',
        ],
    },
    {
        icon: 'Wand2',
        title: 'AI Template Builder',
        description: 'Generate production-ready emails from a prompt — then refine tone, CTAs, and subjects in the studio.',
        preview: 'ai-templates',
        details: [
            'Prompt-to-email with theme, tone, and layout controls',
            'Improve drafts and generate subject lines in-studio',
            'Editable blocks with template score and variables',
        ],
    },
    {
        icon: 'Users',
        title: 'Contacts',
        description: 'Manage subscribers, custom fields, tags, and CSV imports.',
        preview: 'contacts',
        details: [
            'CSV and XLSX import with field mapping',
            'Custom fields, tags, and suppression lists',
            'Duplicate handling at scale',
        ],
    },
    {
        icon: 'Filter',
        title: 'Audiences',
        description: 'Lists and dynamic segments to target the right people.',
        preview: 'audiences',
        details: [
            'Static lists and dynamic segments',
            'Live contact counts as rules change',
            'Reuse audiences across campaigns',
        ],
    },
    {
        icon: 'FileText',
        title: 'Templates',
        description: 'Reusable HTML and text templates with variable substitution.',
        preview: 'templates',
        details: [
            'Visual Email Studio with live preview',
            'Variables with auto-detection',
            'Test send to any inbox',
        ],
    },
    {
        icon: 'Webhook',
        title: 'Webhooks',
        description: 'Real-time events for sent, delivered, opened, clicked, and bounced.',
        preview: 'webhooks',
        details: [
            'HMAC-signed event delivery',
            'Automatic retries with backoff',
            'Replay failed deliveries from the dashboard',
        ],
    },
    {
        icon: 'BarChart3',
        title: 'Analytics',
        description: 'Delivery, open, click, and bounce rates with per-campaign insights.',
        preview: 'analytics',
        details: [
            'Real-time delivery and engagement metrics',
            'Per-campaign breakdowns',
            'Export-ready event history',
        ],
    },
    {
        icon: 'Globe',
        title: 'Domains',
        description: 'SPF, DKIM, and DMARC verification with guided DNS setup.',
        preview: 'domains',
        details: [
            'Guided DNS setup for SPF, DKIM, and DMARC',
            'Domain health and reputation signals',
            'Multiple sending domains per project',
        ],
    },
    {
        icon: 'Key',
        title: 'API Keys',
        description: 'Project-scoped keys with rotation and usage tracking.',
        preview: 'apikeys',
        details: [
            'Project-scoped production and test keys',
            'Rotation without downtime',
            'Usage tracking and last-used timestamps',
        ],
    },
    {
        icon: 'Shield',
        title: 'Deliverability',
        description: 'Reliable delivery with event tracking and reputation monitoring.',
        preview: 'deliverability',
        details: [
            'Bounce and complaint suppression',
            'Inbox placement and reputation monitoring',
            'Built on proven sending infrastructure',
        ],
    },
];

export const flowSteps = [
    { step: 1, title: 'Verify domain', description: 'Add DNS records and verify your sending domain.' },
    { step: 2, title: 'Generate API key', description: 'Create a project and generate your API key.' },
    { step: 3, title: 'Send email', description: 'Call the API or use an SDK to send your first email.' },
    { step: 4, title: 'Track events', description: 'Monitor delivery, opens, and clicks in real time.' },
    { step: 5, title: 'Scale', description: 'Grow from prototype to production without changing your integration.' },
];

export const sdks = ['PHP', 'Laravel', 'Node.js', 'TypeScript', 'Python', 'Go', 'Java', 'cURL'];

export const quickstartSteps = [
    {
        step: '01',
        title: 'Verify your domain',
        description: 'Paste three DNS records. We check SPF, DKIM, and DMARC and tell you the moment they resolve.',
        meta: '~2 minutes',
    },
    {
        step: '02',
        title: 'Create an API key',
        description: 'Project-scoped test and production keys, so nothing you try locally can touch real recipients.',
        meta: '~30 seconds',
    },
    {
        step: '03',
        title: 'Send your first email',
        description: 'One POST request, or a single call through the SDK for your language. Same payload either way.',
        meta: '~1 minute',
    },
    {
        step: '04',
        title: 'Watch the events land',
        description: 'Delivery, opens, clicks, and bounces stream into the dashboard and your webhook endpoint in real time.',
        meta: 'Instant',
    },
];

export const trustSignals = [
    {
        icon: 'ShieldCheck',
        title: 'Authenticated on every send',
        description: 'Guided SPF, DKIM, and DMARC setup with continuous domain verification, so your mail is signed correctly every time.',
    },
    {
        icon: 'Lock',
        title: 'HMAC-signed webhooks',
        description: 'Every event is signed and retried with automatic backoff, and you can replay any failed delivery from the dashboard.',
    },
    {
        icon: 'Filter',
        title: 'Automatic suppression',
        description: 'Bounces and complaints are suppressed for you, which protects your sending reputation without any extra code.',
    },
    {
        icon: 'Key',
        title: 'Scoped, rotatable keys',
        description: 'Separate test and production keys per project, rotated without downtime and tracked with last-used timestamps.',
    },
];

/**
 * Tabs for the animated product showcase. `preview` maps to a FeaturePreview
 * type and the grouping mirrors the dashboard's own sidebar so the landing page
 * and the product describe the same surface in the same order.
 */
export const showcaseFeatures = [
    {
        id: 'transactional',
        group: 'Core',
        label: 'Transactional',
        title: 'Every message, fully traceable',
        description: 'Send receipts, password resets, and alerts through one REST call, then inspect any message down to its individual delivery events.',
        preview: 'transactional',
        highlights: ['Idempotent sends with request IDs', 'Per-message event timeline', 'Searchable logs across projects'],
    },
    {
        id: 'campaigns',
        group: 'Marketing',
        label: 'Campaigns',
        title: 'Broadcasts without a second vendor',
        description: 'A four-step builder takes you from audience to schedule to review, sending on the same authenticated pipeline as your transactional mail.',
        preview: 'campaigns',
        highlights: ['Audience, design, schedule, review', 'Live recipient counts', 'Drafts and scheduled sends'],
    },
    {
        id: 'ai-campaign',
        group: 'AI',
        label: 'AI Analyzer',
        title: 'Catch problems before you hit send',
        description: 'Every campaign is scored for deliverability, spam risk, and CTA strength, with predicted open and click rates and specific fixes to apply.',
        preview: 'ai-campaign',
        highlights: ['Overall score with category breakdown', 'Predicted inbox placement', 'Concrete, applyable suggestions'],
    },
    {
        id: 'ai-templates',
        group: 'AI',
        label: 'AI Studio',
        title: 'From prompt to production email',
        description: 'Describe the email you need and get a full layout with copy, CTAs, and variables, then refine tone and subject lines in the studio.',
        preview: 'ai-templates',
        highlights: ['Prompt-to-email generation', 'Improve drafts and subject lines', 'Editable blocks with template scoring'],
    },
    {
        id: 'contacts',
        group: 'Marketing',
        label: 'Contacts',
        title: 'Import at scale without cleanup work',
        description: 'CSV and XLSX imports with field mapping and duplicate handling, plus custom fields and tags that stay queryable as your list grows.',
        preview: 'contacts',
        highlights: ['CSV and XLSX field mapping', 'Custom fields and tags', 'Suppression handled automatically'],
    },
    {
        id: 'audiences',
        group: 'Marketing',
        label: 'Audiences',
        title: 'Segments that update themselves',
        description: 'Build static lists or dynamic segments whose membership recalculates as contact data changes, with live counts as you edit rules.',
        preview: 'audiences',
        highlights: ['Static lists and dynamic segments', 'Live counts while editing rules', 'Reusable across campaigns'],
    },
    {
        id: 'templates',
        group: 'Core',
        label: 'Templates',
        title: 'One template library for everything',
        description: 'Reusable HTML and text templates with auto-detected variables, desktop and mobile preview, and test sends to any inbox.',
        preview: 'templates',
        highlights: ['Variables with auto-detection', 'Desktop and mobile preview', 'Test send before release'],
    },
    {
        id: 'webhooks',
        group: 'Core',
        label: 'Webhooks',
        title: 'Events you can actually trust',
        description: 'HMAC-signed events for every state change, retried with backoff, and replayable from the dashboard when your endpoint was down.',
        preview: 'webhooks',
        highlights: ['HMAC-signed payloads', 'Automatic retries with backoff', 'Replay failed deliveries'],
    },
    {
        id: 'analytics',
        group: 'Core',
        label: 'Analytics',
        title: 'One view across both send types',
        description: 'Delivery, opens, clicks, and bounces in real time, broken down per campaign and per domain instead of split across two dashboards.',
        preview: 'analytics',
        highlights: ['Real-time engagement metrics', 'Per-campaign breakdowns', 'Export-ready event history'],
    },
    {
        id: 'domains',
        group: 'Platform',
        label: 'Domains',
        title: 'DNS setup that tells you what is wrong',
        description: 'Guided SPF, DKIM, and DMARC records with continuous verification and domain health signals, across multiple sending domains per project.',
        preview: 'domains',
        highlights: ['Guided SPF, DKIM, DMARC', 'Continuous verification', 'Health and reputation signals'],
    },
    {
        id: 'apikeys',
        group: 'Platform',
        label: 'API Keys',
        title: 'Test keys that cannot email customers',
        description: 'Project-scoped production and test keys with rotation that never drops a send, plus usage tracking and last-used timestamps.',
        preview: 'apikeys',
        highlights: ['Separate test and production keys', 'Rotation without downtime', 'Usage and last-used tracking'],
    },
];

export const moatPillars = [
    {
        icon: 'Layers',
        title: 'Transactional and marketing on one pipeline',
        description: 'Competing products pick a side: an API for developers, or a campaign tool for marketers. Running both on one pipeline means a single sending reputation, one suppression list, and analytics that actually reconcile.',
        proof: 'One bill, one reputation, one event stream',
    },
    {
        icon: 'Sparkles',
        title: 'AI that reviews the send, not just writes it',
        description: 'Generating email copy is now commodity. Scoring a campaign for deliverability, spam risk, and predicted engagement before it goes out is the part that protects your domain and your numbers.',
        proof: 'Pre-send scoring with applyable fixes',
    },
    {
        icon: 'Gauge',
        title: 'Built to be integrated in an afternoon',
        description: 'An OpenAPI spec, SDKs for every major language, HMAC-signed webhooks, and test keys that cannot reach real recipients. The integration is boring on purpose.',
        proof: 'OpenAPI 3.1, SDKs, signed webhooks',
    },
    {
        icon: 'Wallet',
        title: 'Pricing that does not punish growth',
        description: 'Volume tiers with a genuinely usable free plan, so you can prototype, launch, and scale on the same integration without a pricing conversation at every step.',
        proof: 'Free through 3,000 emails a month',
    },
];

export const stackConsolidation = {
    before: {
        label: 'The usual setup',
        items: [
            'A transactional provider for receipts and password resets',
            'A separate marketing tool for campaigns and broadcasts',
            'A third dashboard to stitch delivery and engagement data together',
            'Two sending reputations, two suppression lists, two bills',
        ],
    },
    after: {
        label: 'With MailerMine',
        items: [
            'One API for transactional and marketing email',
            'Campaigns, contacts, and segments on the same delivery pipeline',
            'One event stream and one analytics view across everything you send',
            'One reputation, one suppression list, one bill',
        ],
    },
};

export interface Testimonial {
    quote: string;
    author: string;
    role: string;
    company: string;
}

/**
 * Real customer quotes only. Add an entry once the customer has agreed in
 * writing to be quoted publicly. Sections that render testimonials hide
 * themselves while this list is empty rather than showing placeholders.
 */
export const testimonials: Testimonial[] = [];

export const whyMailerMineSections = [
    {
        eyebrow: 'Developer-first',
        title: 'One API for every email you send',
        description: 'Transactional receipts, password resets, and product updates — all through a clean REST API with predictable responses and meaningful errors.',
        bullets: ['REST API with OpenAPI spec', 'SDKs for every major language', 'Sub-100ms API responses', 'Idempotent sends with request IDs'],
        preview: 'transactional',
        cta: { label: 'View API docs', href: '/docs' },
    },
    {
        eyebrow: 'Deliverability',
        title: 'Reach the inbox, not the spam folder',
        description: 'Built on proven infrastructure with SPF, DKIM, DMARC verification, bounce handling, and real-time reputation monitoring.',
        bullets: ['99.2% average delivery rate', 'Automatic bounce suppression', 'Complaint handling', 'Domain health dashboard'],
        preview: 'deliverability',
        cta: { label: 'Learn about domains', href: '/features' },
    },
    {
        eyebrow: 'Observability',
        title: 'Know exactly what happens after send',
        description: 'Every email gets a full event timeline — queued, sent, delivered, opened, clicked, bounced. Stream events to your app with webhooks.',
        bullets: ['Real-time webhook events', 'Per-message event timeline', 'Open and click tracking', 'Campaign-level analytics'],
        preview: 'webhooks',
        cta: { label: 'Explore webhooks', href: '/features' },
    },
];

export const productShowcaseItems = [
    { title: 'Campaign dashboard', description: 'Build, schedule, and monitor marketing broadcasts with a visual campaign builder.', preview: 'campaigns' },
    { title: 'AI Campaign Analyzer', description: 'Score deliverability, spam risk, CTAs, and predicted opens before you hit send — with clear fixes to ship better emails.', preview: 'ai-campaign' },
    { title: 'Template editor', description: 'Design beautiful emails with variables, live preview, and test sends.', preview: 'templates' },
    { title: 'AI Template Builder', description: 'Describe the email you need. Get a full layout with copy, CTAs, and variables — then refine it in Email Studio.', preview: 'ai-templates' },
    { title: 'Email logs', description: 'Search and inspect every message with full delivery status and event history.', preview: 'transactional' },
    { title: 'Analytics', description: 'Delivery, open, click, and bounce rates with per-campaign breakdowns.', preview: 'analytics' },
    { title: 'Contacts', description: 'Import thousands of contacts with field mapping, tags, and audience assignment.', preview: 'contacts' },
    { title: 'Domains', description: 'Verify SPF, DKIM, and DMARC with guided DNS setup.', preview: 'domains' },
    { title: 'API Keys', description: 'Project-scoped keys with rotation, scopes, and usage tracking.', preview: 'apikeys' },
];

export const marketingAutomationFeatures = [
    { title: 'Campaign builder', description: 'Four-step wizard: audience, design, schedule, review.', preview: 'campaigns' },
    { title: 'Contact import', description: 'CSV, XLSX, field mapping, and duplicate handling at scale.', preview: 'contacts' },
    { title: 'Segments & audiences', description: 'Static lists and dynamic segments with live counts.', preview: 'audiences' },
    { title: 'Email designer', description: 'Premium template editor with variables and live preview.', preview: 'templates' },
];

export const templateHighlights = [
    'Variables with auto-detection',
    'Live preview (desktop & mobile)',
    'Test send to any inbox',
    'Versioning & drafts',
    'AI generate, improve, and subject lines',
];

export const performanceMetrics = [
    { label: 'Emails delivered', value: '10M+', sub: 'per month capacity' },
    { label: 'Uptime SLA', value: '99.99%', sub: 'API availability' },
    { label: 'Event latency', value: '<2s', sub: 'webhook delivery' },
    { label: 'Queue throughput', value: '50k/s', sub: 'background processing' },
    { label: 'API response', value: '<100ms', sub: 'p95 latency' },
    { label: 'Webhook retry', value: '3x', sub: 'automatic backoff' },
];

export const devExperienceFeatures = [
    'API-first architecture',
    'OpenAPI 3.1 specification',
    'Official SDKs for PHP, Node.js, and Python',
    'Real-time webhooks with HMAC',
    'SMTP relay (coming soon)',
];

export const faqItems = [
    { question: 'Is there a free plan?', answer: 'Yes. The free plan includes 3,000 emails a month with API access, one domain, and the full dashboard. No credit card is required to start, and you only move to a paid plan when you outgrow it.' },
    { question: 'How long does setup take?', answer: 'Most teams are sending in well under ten minutes: add three DNS records to verify your domain, generate an API key, then make a single API call. Delivery events start appearing in the dashboard immediately.' },
    { question: 'How is MailerMine different from a transactional-only provider?', answer: 'MailerMine combines transactional and marketing email in one platform — API sending, contacts, campaigns, templates, and analytics — so you are not paying for two products, managing two sending reputations, or reconciling two sets of delivery data.' },
    { question: 'Do you handle bounces and unsubscribes for me?', answer: 'Yes. Bounces and spam complaints are suppressed automatically, and suppression applies across both transactional and marketing sends so a hard bounce in one never gets retried by the other.' },
    { question: 'Can I use my own domain?', answer: 'Absolutely. Verify your domain with SPF, DKIM, and DMARC records through the dashboard. MailerMine handles the DNS guidance and verification flow, and supports multiple sending domains per project.' },
    { question: 'Do you support marketing email?', answer: 'Yes. MailerMine includes contacts, audiences, segments, campaigns, templates, and analytics — all on the same delivery pipeline as transactional email.' },
    { question: 'Do you support SMTP?', answer: 'SMTP relay is on our roadmap. Today you can send via REST API, official SDKs, or the Laravel mail driver.' },
    { question: 'How hard is it to migrate from my current provider?', answer: 'The API will look familiar if you are coming from a modern transactional provider, and we publish migration guides for domains, templates, and webhook endpoints. You can run MailerMine alongside your existing setup and move traffic over gradually rather than cutting over all at once.' },
];

export const blogPosts = [
    { slug: 'introducing-relay', title: 'Introducing MailerMine: Email infrastructure for developers', excerpt: 'Why we built MailerMine and what makes it different.', category: 'Product', author: 'MailerMine Team', date: 'Jul 1, 2026', readTime: '5 min' },
    { slug: 'transactional-vs-marketing', title: 'Transactional vs marketing email: a practical guide', excerpt: 'When to use each, and how MailerMine handles both.', category: 'Guides', author: 'Sarah Chen', date: 'Jun 28, 2026', readTime: '8 min' },
    { slug: 'webhooks-deep-dive', title: 'Webhooks deep dive: building reliable event handlers', excerpt: 'Signature verification, retries, and idempotency patterns.', category: 'Engineering', author: 'Marcus Webb', date: 'Jun 20, 2026', readTime: '12 min' },
];

export const integrations = [
    { name: 'Laravel', category: 'Framework', status: 'available' },
    { name: 'PHP', category: 'Language', status: 'available' },
    { name: 'Node.js', category: 'Language', status: 'available' },
    { name: 'Next.js', category: 'Framework', status: 'available' },
    { name: 'React', category: 'Framework', status: 'available' },
    { name: 'Vue', category: 'Framework', status: 'coming' },
    { name: 'Nuxt', category: 'Framework', status: 'coming' },
    { name: 'Python', category: 'Language', status: 'available' },
    { name: 'Go', category: 'Language', status: 'coming' },
    { name: 'Java', category: 'Language', status: 'coming' },
    { name: 'SMTP', category: 'Protocol', status: 'coming' },
    { name: 'Webhooks', category: 'Events', status: 'available' },
    { name: 'Zapier', category: 'Automation', status: 'coming' },
    { name: 'n8n', category: 'Automation', status: 'coming' },
    { name: 'Make', category: 'Automation', status: 'coming' },
];

export const statusServices = [
    { name: 'API', status: 'operational', uptime: '99.99%' },
    { name: 'SMTP', status: 'operational', uptime: '99.98%' },
    { name: 'Dashboard', status: 'operational', uptime: '100%' },
    { name: 'Marketing', status: 'operational', uptime: '99.97%' },
    { name: 'Analytics', status: 'operational', uptime: '99.99%' },
    { name: 'Webhooks', status: 'operational', uptime: '99.96%' },
];

export const changelogEntries = [
    { version: '0.5.0', date: 'Jul 2, 2026', title: 'Event Platform', type: 'feature', items: ['Unified email events', 'Open & click tracking', 'Campaign analytics API'] },
    { version: '0.4.0', date: 'Jun 15, 2026', title: 'Marketing Campaigns', type: 'feature', items: ['Campaign builder', 'CSV import', 'Audience segments'] },
    { version: '0.3.0', date: 'May 28, 2026', title: 'Webhooks', type: 'feature', items: ['Webhook endpoints', 'HMAC signatures', 'Delivery replay'] },
    { version: '0.2.1', date: 'May 10, 2026', title: 'Bug fixes', type: 'fix', items: ['Fixed domain verification race condition', 'Improved error messages for template variables'] },
];

export const docCategories = [
    { title: 'Getting Started', links: [{ label: 'Introduction', href: '/developers/docs/getting-started' }, { label: 'Quickstart', href: '/developers/docs/quickstart' }, { label: 'Authentication', href: '/developers/docs/authentication' }] },
    { title: 'API', links: [{ label: 'API Playground', href: '/developers/docs/playground' }, { label: 'API Reference', href: '/developers/docs/api-reference' }, { label: 'Transactional Email', href: '/developers/docs/transactional-email' }, { label: 'Webhooks', href: '/developers/docs/webhooks' }] },
    { title: 'Marketing', links: [{ label: 'Campaigns', href: '/developers/docs/campaigns' }, { label: 'Contacts', href: '/developers/docs/marketing' }, { label: 'Analytics', href: '/developers/docs/analytics' }] },
    { title: 'Platform', links: [{ label: 'Domains', href: '/developers/docs/domains' }, { label: 'Templates', href: '/developers/docs/templates' }, { label: 'SDKs', href: '/developers/docs/sdks' }] },
];
