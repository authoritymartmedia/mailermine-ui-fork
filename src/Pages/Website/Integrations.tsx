import MarketingLayout from '@/Layouts/MarketingLayout';
import { Container, Section } from '@/Components/Website/Container';
import { PageHero } from '@/Components/Website/PageHero';
import { integrations, type SeoData } from '@/content/website';

interface IntegrationsProps {
    seo: SeoData;
}

export default function Integrations({ seo }: IntegrationsProps) {
    return (
        <MarketingLayout seo={seo}>
            <PageHero
                eyebrow="Integrations"
                title="Works with your stack"
                description="Official SDKs, framework guides, and automation connectors."
            />

            <Section className="pt-0">
                <Container>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {integrations.map((item) => (
                            <div key={item.name} className="marketing-card-hover flex items-center justify-between p-6">
                                <div>
                                    <h3 className="font-medium">{item.name}</h3>
                                    <p className="mt-1 text-sm text-zinc-500">{item.category}</p>
                                </div>
                                <span className={`rounded-full px-2.5 py-1 text-xs ${
                                    item.status === 'available'
                                        ? 'bg-emerald-500/10 text-emerald-400'
                                        : 'bg-zinc-500/10 text-zinc-500'
                                }`}>
                                    {item.status === 'available' ? 'Available' : 'Coming soon'}
                                </span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-12 text-center text-sm text-zinc-500">
                        More integrations on the way. <a href="/contact" className="text-white hover:underline">Request one</a>
                    </p>
                </Container>
            </Section>
        </MarketingLayout>
    );
}
