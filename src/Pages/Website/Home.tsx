import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import MarketingLayout from '@/Layouts/MarketingLayout';
import { Container, Section } from '@/Components/Website/Container';
import { FeaturePreview } from '@/Components/Website/FeaturePreview';
import { BrowserMockup } from '@/Components/Website/BrowserMockup';
import { FaqAccordion } from '@/Components/Website/FaqAccordion';
import { MarketingButton } from '@/Components/Website/MarketingButton';
import { TrustedBy } from '@/Components/Website/TrustedBy';
import { HeroSection } from '@/Components/Website/HeroSection';
import { AlternatingFeature } from '@/Components/Website/AlternatingFeature';
import { DevExperienceSection } from '@/Components/Website/DevExperienceSection';
import { BeyondEditingSection } from '@/Components/Website/BeyondEditingSection';
import { ChooseLanguageSection } from '@/Components/Website/ChooseLanguageSection';
import { SectionHeader } from '@/Components/Website/PageHero';
import { PricingPlanGrid, type PublicPricingPlan } from '@/Components/Website/PricingPlanGrid';
import {
    faqItems,
    marketingAutomationFeatures,
    performanceMetrics,
    productShowcaseItems,
    templateHighlights,
    testimonials,
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

const analyticsMetrics = [
    { label: 'Delivery', value: '99.2%', tone: 'emerald' },
    { label: 'Open', value: '68.4%', tone: 'emerald' },
    { label: 'Click', value: '24.1%', tone: 'amber' },
    { label: 'Bounce', value: '0.3%', tone: 'red' },
    { label: 'Realtime', value: '<2s', tone: 'emerald' },
    { label: 'Webhook', value: '3x retry', tone: 'zinc' },
];

export default function Home({ seo, plans }: HomeProps) {
    return (
        <MarketingLayout seo={seo}>
            <HeroSection />
            <TrustedBy />

            {/* Why MailerMine */}
            <Section id="why-mailermine" className="pb-10 sm:pb-14 lg:pb-16">
                <Container className="mb-8 text-center lg:mb-10">
                    <SectionHeader
                        eyebrow="Why MailerMine"
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

            {/* Product Showcase */}
            <Section id="product" className="marketing-section-alt">
                <Container>
                    <SectionHeader
                        eyebrow="Product"
                        title="Everything in one platform"
                        description="From your first API call to million-email campaigns — MailerMine grows with you."
                    />
                    <div className="mt-16 space-y-24 lg:space-y-28">
                        {productShowcaseItems.map((item, i) => {
                            const reversed = i % 2 === 1;
                            return (
                                <motion.div
                                    key={item.title}
                                    {...fadeUp}
                                    transition={{ duration: 0.5, delay: 0.05 }}
                                    className={`flex flex-col items-center gap-10 lg:gap-16 ${
                                        reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
                                    }`}
                                >
                                    <div
                                        className={`showcase-card w-full lg:w-1/2 ${
                                            reversed ? 'lg:translate-x-4' : 'lg:-translate-x-4'
                                        }`}
                                    >
                                        <BrowserMockup glow={false} url={`app.mailermine.dev/${item.preview}`}>
                                            <FeaturePreview type={item.preview} size="large" />
                                        </BrowserMockup>
                                    </div>
                                    <div
                                        className={`w-full lg:w-1/2 ${
                                            reversed ? 'lg:pr-8' : 'lg:pl-8'
                                        }`}
                                    >
                                        <h3 className="font-display text-2xl tracking-tight sm:text-3xl">{item.title}</h3>
                                        <p className="mt-4 text-lg leading-relaxed text-zinc-400">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </Container>
            </Section>

            <DevExperienceSection />
            <ChooseLanguageSection />

            {/* Marketing Automation */}
            <Section id="marketing">
                <Container>
                    <SectionHeader
                        eyebrow="Marketing automation"
                        title="Campaigns that scale with your product"
                        description="Import contacts, build segments, design emails, and measure results — without switching tools."
                    />
                    <div className="mt-16 space-y-20">
                        {marketingAutomationFeatures.map((feature, i) => {
                            const reversed = i % 2 === 1;
                            return (
                                <motion.div
                                    key={feature.title}
                                    {...fadeUp}
                                    className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${reversed ? 'lg:[direction:rtl]' : ''}`}
                                >
                                    <div className="lg:[direction:ltr]">
                                        <BrowserMockup>
                                            <FeaturePreview type={feature.preview} size="large" />
                                        </BrowserMockup>
                                    </div>
                                    <div className="lg:[direction:ltr]">
                                        <h3 className="font-display text-2xl tracking-tight sm:text-3xl">{feature.title}</h3>
                                        <p className="mt-4 text-lg text-zinc-400">{feature.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </Container>
            </Section>

            <BeyondEditingSection />

            {/* Analytics */}
            <Section id="analytics" className="bg-[#0a0a0a]">
                <Container>
                    <SectionHeader
                        eyebrow="Analytics"
                        title="Know what happens after send"
                        description="Delivery, opens, clicks, bounces — tracked in real time with per-campaign breakdowns."
                    />
                    <motion.div {...fadeUp} className="mt-16">
                        <BrowserMockup className="mx-auto max-w-4xl">
                            <FeaturePreview type="analytics" size="large" />
                        </BrowserMockup>
                        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6">
                            {analyticsMetrics.map((metric) => (
                                <div key={metric.label} className="metric-card">
                                    <p className="text-xl font-medium sm:text-2xl">{metric.value}</p>
                                    <p className="mt-1 text-xs text-zinc-500">{metric.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </Container>
            </Section>

            {/* Template Builder */}
            <Section id="templates">
                <Container>
                    <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
                        <BrowserMockup>
                            <FeaturePreview type="templates" size="large" />
                        </BrowserMockup>
                        <div>
                            <SectionHeader
                                align="left"
                                eyebrow="Template builder"
                                title="Design emails developers love"
                                description="A premium editor with variables, live preview, and test sends — built for teams who care about craft."
                            />
                            <ul className="mt-8 space-y-3">
                                {templateHighlights.map((highlight) => (
                                    <li key={highlight} className="flex items-center gap-3 text-sm text-zinc-300">
                                        <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Performance */}
            <Section id="performance" className="bg-[#0a0a0a]">
                <Container>
                    <SectionHeader
                        eyebrow="Performance"
                        title="Built for scale from day one"
                        description="Infrastructure designed to handle millions of emails with sub-second event delivery."
                    />
                    <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {performanceMetrics.map((metric, i) => (
                            <motion.div
                                key={metric.label}
                                {...fadeUp}
                                transition={{ delay: i * 0.05 }}
                                className="metric-card text-left"
                            >
                                <p className="text-3xl font-medium tracking-tight">{metric.value}</p>
                                <p className="mt-2 text-sm font-medium text-white">{metric.label}</p>
                                <p className="mt-1 text-xs text-zinc-500">{metric.sub}</p>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Pricing Preview */}
            <Section id="pricing">
                <Container>
                    <SectionHeader
                        eyebrow="Pricing"
                        title="Start free, scale as you grow"
                        description="Transparent pricing with no hidden fees. Upgrade when you're ready."
                    />
                    <div className="mt-16">
                        <PricingPlanGrid plans={plans} columns="home" compact />
                    </div>
                    <div className="mt-12 text-center">
                        <MarketingButton variant="secondary" href="/pricing">
                            View full pricing
                        </MarketingButton>
                    </div>
                </Container>
            </Section>

            {/* Testimonials */}
            <Section id="testimonials" className="bg-[#0a0a0a]">
                <Container>
                    <SectionHeader
                        title="Trusted by builders"
                        description="Developers, founders, and CTOs choose MailerMine for email that just works."
                    />
                    <div className="mt-16 grid gap-6 md:grid-cols-3">
                        {testimonials.map((t, i) => (
                            <motion.blockquote
                                key={t.author}
                                {...fadeUp}
                                transition={{ delay: i * 0.08 }}
                                className="marketing-card flex flex-col p-8"
                            >
                                <p className="flex-1 text-sm leading-relaxed text-zinc-300">&ldquo;{t.quote}&rdquo;</p>
                                <footer className="mt-8 border-t border-white/[0.06] pt-6">
                                    <p className="text-sm font-medium">{t.author}</p>
                                    <p className="text-xs text-zinc-500">{t.role}</p>
                                </footer>
                            </motion.blockquote>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* FAQ */}
            <Section id="faq">
                <Container className="max-w-3xl">
                    <SectionHeader title="Frequently asked questions" />
                    <FaqAccordion items={faqItems} />
                </Container>
            </Section>

            {/* CTA */}
            <Section className="pb-32">
                <Container>
                    <motion.div
                        {...fadeUp}
                        className="marketing-gradient-glow relative overflow-hidden rounded-3xl border border-white/[0.06] px-4 py-16 text-center sm:px-8 sm:py-24 lg:py-32"
                    >
                        <div className="hero-orb hero-orb--purple pointer-events-none absolute left-1/4 top-0 h-64 w-64 -translate-x-1/2" aria-hidden />
                        <h2 className="relative font-display text-4xl tracking-tight sm:text-5xl lg:text-6xl">
                            Ready to send your first million emails?
                        </h2>
                        <p className="relative mx-auto mt-6 max-w-lg text-lg text-zinc-400">
                            Create a free account, verify your domain, and send your first email today.
                        </p>
                        <div className="relative mt-12 flex flex-wrap justify-center gap-4">
                            <MarketingButton size="lg" href="/signup">Start free</MarketingButton>
                            <MarketingButton variant="secondary" size="lg" href="/docs">Read documentation</MarketingButton>
                        </div>
                    </motion.div>
                </Container>
            </Section>
        </MarketingLayout>
    );
}
