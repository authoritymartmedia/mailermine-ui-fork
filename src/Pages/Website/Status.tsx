import { CheckCircle } from 'lucide-react';
import MarketingLayout from '@/Layouts/MarketingLayout';
import { Container, Section } from '@/Components/Website/Container';
import { PageHero } from '@/Components/Website/PageHero';
import { statusServices, type SeoData } from '@/content/website';

interface StatusProps {
    seo: SeoData;
}

export default function Status({ seo }: StatusProps) {
    return (
        <MarketingLayout seo={seo}>
            <PageHero
                eyebrow="Status"
                title="All systems operational"
                description="Real-time status for MailerMine API, SMTP, dashboard, and webhooks."
            />

            <Section className="pt-0">
                <Container className="max-w-3xl">
                    <div className="marketing-card mb-8 flex items-center gap-3 p-6">
                        <CheckCircle className="h-5 w-5 text-emerald-400" />
                        <div>
                            <p className="font-medium">No incidents reported</p>
                            <p className="text-sm text-zinc-500">Last checked: just now</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {statusServices.map((service) => (
                            <div
                                key={service.name}
                                className="marketing-card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                                    <span className="font-medium">{service.name}</span>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pl-5 text-sm text-zinc-500 sm:gap-6 sm:pl-0">
                                    <span className="capitalize">{service.status}</span>
                                    <span>{service.uptime} uptime</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12">
                        <h2 className="text-lg font-medium">Historical uptime</h2>
                        <div className="mt-4 flex gap-0.5">
                            {Array.from({ length: 90 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-8 flex-1 rounded-sm bg-emerald-500/60"
                                    title={`Day ${i + 1}`}
                                />
                            ))}
                        </div>
                        <p className="mt-2 text-xs text-zinc-600">90-day uptime history</p>
                    </div>
                </Container>
            </Section>
        </MarketingLayout>
    );
}
