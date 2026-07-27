import MarketingLayout from '@/Layouts/MarketingLayout';
import { Container, Section } from '@/Components/Website/Container';
import { MarketingButton } from '@/Components/Website/MarketingButton';
import { PageHero } from '@/Components/Website/PageHero';
import { type SeoData } from '@/content/website';

interface AboutProps {
    seo: SeoData;
}

const roadmap = [
    { quarter: 'Q3 2026', items: ['SMTP relay', 'Advanced segmentation', 'A/B testing'] },
    { quarter: 'Q4 2026', items: ['Dedicated IPs', 'Team permissions', 'Audit logs'] },
    { quarter: '2027', items: ['Multi-region delivery', 'Enterprise SSO', 'SOC 2 Type II'] },
];

export default function About({ seo }: AboutProps) {
    return (
        <MarketingLayout seo={seo}>
            <PageHero
                eyebrow="About"
                title="Building email infrastructure developers love"
                description="MailerMine exists because sending email shouldn't require three tools, a deliverability consultant, and a prayer."
            />

            <Section className="pt-0">
                <Container className="max-w-3xl">
                    <div className="space-y-16">
                        <div>
                            <h2 className="font-display text-2xl tracking-tight">Our mission</h2>
                            <p className="mt-4 text-lg leading-relaxed text-zinc-400">
                                Make email infrastructure as delightful as the rest of the modern developer stack. One API, one dashboard, one platform for transactional and marketing email.
                            </p>
                        </div>
                        <div>
                            <h2 className="font-display text-2xl tracking-tight">Our vision</h2>
                            <p className="mt-4 text-lg leading-relaxed text-zinc-400">
                                Every developer should be able to send email in minutes, not weeks. MailerMine combines the simplicity of a modern API with the power of enterprise-grade deliverability.
                            </p>
                        </div>
                        <div>
                            <h2 className="font-display text-2xl tracking-tight">Why MailerMine</h2>
                            <p className="mt-4 leading-relaxed text-zinc-400">
                                We started MailerMine after spending years wrestling with email providers that were either too complex or too limited. Transactional email lived in one tool. Marketing lived in another. Analytics were an afterthought. Webhooks were unreliable.
                            </p>
                            <p className="mt-4 leading-relaxed text-zinc-400">
                                MailerMine unifies everything on a single event-driven architecture. Send via API, track with webhooks, manage campaigns from the dashboard, and scale without changing your integration.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            <Section className="bg-[#0a0a0a]">
                <Container>
                    <h2 className="mb-12 text-center font-display text-3xl tracking-tight">Roadmap</h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {roadmap.map((phase) => (
                            <div key={phase.quarter} className="marketing-card p-6">
                                <p className="text-sm font-medium text-zinc-500">{phase.quarter}</p>
                                <ul className="mt-4 space-y-2">
                                    {phase.items.map((item) => (
                                        <li key={item} className="text-sm text-zinc-400">• {item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            <Section>
                <Container className="text-center">
                    <h2 className="font-display text-3xl tracking-tight">Join us</h2>
                    <p className="mx-auto mt-4 max-w-lg text-zinc-400">We're building the future of developer email. Start sending today.</p>
                    <MarketingButton href="/signup" className="mt-8">Get started</MarketingButton>
                </Container>
            </Section>
        </MarketingLayout>
    );
}
