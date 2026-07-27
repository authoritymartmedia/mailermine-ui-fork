import MarketingLayout from '@/Layouts/MarketingLayout';
import { Container, Section } from '@/Components/Website/Container';
import { FaqAccordion } from '@/Components/Website/FaqAccordion';
import { MarketingButton } from '@/Components/Website/MarketingButton';
import { PageHero } from '@/Components/Website/PageHero';
import { PricingPlanGrid, type PublicPricingPlan } from '@/Components/Website/PricingPlanGrid';
import { faqItems, type SeoData } from '@/content/website';

interface PricingProps {
    seo: SeoData;
    plans: PublicPricingPlan[];
}

export default function Pricing({ seo, plans }: PricingProps) {
    return (
        <MarketingLayout seo={seo}>
            <PageHero
                eyebrow="Pricing"
                title="Simple, transparent pricing"
                description="Start free and scale as your product grows. No hidden fees, no surprises."
            />

            <Section className="pt-0">
                <Container>
                    <PricingPlanGrid plans={plans} />
                </Container>
            </Section>

            <Section className="bg-[#0a0a0a]">
                <Container className="max-w-3xl">
                    <h2 className="mb-10 text-center font-display text-3xl tracking-tight">FAQ</h2>
                    <FaqAccordion items={faqItems} />
                </Container>
            </Section>

            <Section>
                <Container className="text-center">
                    <div className="marketing-card mx-auto max-w-2xl p-12">
                        <h2 className="font-display text-3xl tracking-tight">Need a custom plan?</h2>
                        <p className="mt-4 text-zinc-400">
                            Enterprise customers get dedicated infrastructure, custom contracts, and 24/7 support.
                        </p>
                        <MarketingButton href="/contact" className="mt-8">Talk to sales</MarketingButton>
                    </div>
                </Container>
            </Section>
        </MarketingLayout>
    );
}
