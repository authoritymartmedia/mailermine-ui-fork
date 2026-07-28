import { motion } from 'framer-motion';
import MarketingLayout from '@/Layouts/MarketingLayout';
import { Container, Section } from '@/Components/Website/Container';
import { FaqAccordion } from '@/Components/Website/FaqAccordion';
import { MarketingButton } from '@/Components/Website/MarketingButton';
import { HeroSection } from '@/Components/Website/HeroSection';
import { QuickstartSection } from '@/Components/Website/QuickstartSection';
import { AnimatedShowcase } from '@/Components/Website/AnimatedShowcase';
import { StackConsolidationSection } from '@/Components/Website/StackConsolidationSection';
import { MoatSection } from '@/Components/Website/MoatSection';
import { TrustSignalsSection } from '@/Components/Website/TrustSignalsSection';
import { RoiSection } from '@/Components/Website/RoiSection';
import { AlternatingFeature } from '@/Components/Website/AlternatingFeature';
import { ChooseLanguageSection } from '@/Components/Website/ChooseLanguageSection';
import { SectionHeader } from '@/Components/Website/PageHero';
import { PricingPlanGrid, type PublicPricingPlan } from '@/Components/Website/PricingPlanGrid';
import {
    faqItems,
    performanceMetrics,
    whyMailerMineSections,
    type SeoData,
} from '@/content/website';

interface HomeProps {
    seo: SeoData;
    plans: PublicPricingPlan[];
}

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.5 },
};

export default function Home({ seo, plans }: HomeProps) {
    return (
        <MarketingLayout seo={seo}>
            {/* 1. Hook: what it is, what it costs to try, how to start */}
            <HeroSection />

            {/* 2. Time to value, answered immediately after the promise */}
            <QuickstartSection />

            {/* 3. Proof by product: the animated tour of the real dashboard */}
            <AnimatedShowcase />

            {/* 4. The core value argument: one platform instead of a stack */}
            <StackConsolidationSection />

            {/* 5. Differentiation, stated plainly */}
            <MoatSection />

            {/* 6. Depth for evaluators who want the mechanics */}
            <Section id="how-it-works" className="marketing-section-alt pb-10 sm:pb-14 lg:pb-16">
                <Container className="mb-8 text-center lg:mb-10">
                    <SectionHeader
                        eyebrow="Under the hood"
                        title="Built for developers who ship fast"
                        description="Every feature designed around how modern teams build, send, and measure email."
                    />
                </Container>
                {whyMailerMineSections.map((section, i) => (
                    <AlternatingFeature
                        key={section.title}
                        {...section}
                        reversed={i % 2 === 1}
                        tinted={i % 2 === 1}
                    />
                ))}
            </Section>

            {/* 7. Risk reversal: deliverability and security safeguards */}
            <TrustSignalsSection />

            <ChooseLanguageSection />

            {/* 8. Scale evidence */}
            <Section id="performance" className="marketing-section-alt">
                <Container>
                    <SectionHeader
                        eyebrow="Performance"
                        title="Built for scale from day one"
                        description="Infrastructure designed to handle millions of emails with sub-second event delivery."
                    />
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {performanceMetrics.map((metric, i) => (
                            <motion.div
                                key={metric.label}
                                {...fadeUp}
                                transition={{ delay: i * 0.05 }}
                                className="metric-card text-left"
                            >
                                <p className="text-3xl font-medium tracking-tight">{metric.value}</p>
                                <p className="mt-2 text-sm font-medium">{metric.label}</p>
                                <p className="mt-1 text-xs text-zinc-500">{metric.sub}</p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* 9. Money: what it costs at their volume, then the plans */}
            <RoiSection plans={plans} />

            <Section id="pricing">
                <Container>
                    <SectionHeader
                        eyebrow="Pricing"
                        title="Start free, scale as you grow"
                        description="Transparent pricing with no hidden fees. No credit card required to start."
                    />
                    <PricingPlanGrid plans={plans} columns="home" compact />
                    <div className="mt-12 text-center">
                        <MarketingButton variant="secondary" href="/pricing">
                            View full pricing
                        </MarketingButton>
                    </div>
                </Container>
            </Section>

            {/* 10. Objection handling, last thing before the ask */}
            <Section id="faq" className="marketing-section-alt">
                <Container className="max-w-3xl">
                    <SectionHeader title="Frequently asked questions" />
                    <FaqAccordion items={faqItems} />
                </Container>
            </Section>

            {/* 11. Close */}
            <Section className="pb-32">
                <Container>
                    <motion.div
                        {...fadeUp}
                        className="marketing-gradient-glow relative overflow-hidden rounded-3xl border border-white/[0.06] px-4 py-16 text-center sm:px-8 sm:py-24 lg:py-32"
                    >
                        <div className="hero-orb hero-orb--purple pointer-events-none absolute left-1/4 top-0 h-64 w-64 -translate-x-1/2" aria-hidden />
                        <h2 className="relative font-display text-4xl tracking-tight sm:text-5xl lg:text-6xl">
                            Send your first email in the next ten minutes
                        </h2>
                        <p className="relative mx-auto mt-6 max-w-lg text-lg text-zinc-400">
                            Create a free account, verify your domain, and start sending. 3,000 emails a month free, no
                            credit card required.
                        </p>
                        <div className="relative mt-12 flex flex-wrap justify-center gap-4">
                            <MarketingButton size="lg" href="/signup">Start sending free</MarketingButton>
                            <MarketingButton variant="secondary" size="lg" href="/docs">Read documentation</MarketingButton>
                        </div>
                    </motion.div>
                </Container>
            </Section>
        </MarketingLayout>
    );
}
