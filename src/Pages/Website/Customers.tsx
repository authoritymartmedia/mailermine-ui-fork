import MarketingLayout from '@/Layouts/MarketingLayout';
import { Container, Section } from '@/Components/Website/Container';
import { MarketingButton } from '@/Components/Website/MarketingButton';
import { PageHero } from '@/Components/Website/PageHero';
import { testimonials, type SeoData } from '@/content/website';

interface CustomersProps {
    seo: SeoData;
}

const stats = [
    { value: '10M+', label: 'Emails delivered' },
    { value: '2,500+', label: 'Developers' },
    { value: '99.9%', label: 'Uptime' },
    { value: '<50ms', label: 'API latency' },
];

const caseStudies = [
    {
        company: 'Launchpad',
        industry: 'SaaS',
        quote: 'MailerMine replaced three tools for us. We went from juggling SendGrid, Mailchimp, and a custom webhook handler to one platform.',
        metric: '60% reduction in email-related engineering time',
    },
    {
        company: 'Stackform',
        industry: 'Developer Tools',
        quote: 'We migrated from SendGrid in a weekend. The API is predictable, the docs are excellent, and the dashboard is beautiful.',
        metric: 'Migrated 2M monthly emails in 3 days',
    },
    {
        company: 'DevMail',
        industry: 'Startup',
        quote: 'Finally an email platform that feels built for developers. Our team ships faster because email just works.',
        metric: 'First email sent in 12 minutes',
    },
];

export default function Customers({ seo }: CustomersProps) {
    return (
        <MarketingLayout seo={seo}>
            <PageHero
                eyebrow="Customers"
                title="Trusted by developers and startups"
                description="From indie hackers to funded startups, teams choose MailerMine for reliable email infrastructure."
            />

            <Section className="border-y border-white/[0.04] py-16">
                <Container>
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="text-3xl font-medium sm:text-4xl">{stat.value}</p>
                                <p className="mt-2 text-sm text-zinc-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            <Section>
                <Container>
                    <h2 className="mb-12 text-center font-display text-3xl tracking-tight">Case studies</h2>
                    <div className="grid gap-8 lg:grid-cols-3">
                        {caseStudies.map((study) => (
                            <div key={study.company} className="marketing-card p-8">
                                <p className="text-sm text-zinc-500">{study.industry}</p>
                                <h3 className="mt-2 text-xl font-medium">{study.company}</h3>
                                <p className="mt-4 text-sm leading-relaxed text-zinc-400">&ldquo;{study.quote}&rdquo;</p>
                                <p className="mt-6 text-sm font-medium text-emerald-400">{study.metric}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            <Section className="bg-[#0a0a0a]">
                <Container>
                    <h2 className="mb-12 text-center font-display text-3xl tracking-tight">What developers say</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        {testimonials.map((t) => (
                            <blockquote key={t.author} className="marketing-card p-6">
                                <p className="text-sm leading-relaxed text-zinc-300">&ldquo;{t.quote}&rdquo;</p>
                                <footer className="mt-6">
                                    <p className="text-sm font-medium">{t.author}</p>
                                    <p className="text-xs text-zinc-500">{t.role}</p>
                                </footer>
                            </blockquote>
                        ))}
                    </div>
                </Container>
            </Section>

            <Section>
                <Container className="text-center">
                    <MarketingButton href="/signup" size="lg">Start sending with MailerMine</MarketingButton>
                </Container>
            </Section>
        </MarketingLayout>
    );
}
