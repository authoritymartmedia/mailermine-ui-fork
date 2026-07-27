import { motion } from 'framer-motion';
import {
    BarChart3, FileText, Filter, Globe, Key, Mail, Megaphone, Shield, Sparkles, Users, Wand2, Webhook, type LucideIcon,
} from 'lucide-react';
import MarketingLayout from '@/Layouts/MarketingLayout';
import { Container, Section } from '@/Components/Website/Container';
import { FeaturePreview } from '@/Components/Website/FeaturePreview';
import { MarketingButton } from '@/Components/Website/MarketingButton';
import { PageHero } from '@/Components/Website/PageHero';
import { productFeatures, type SeoData } from '@/content/website';

const iconMap: Record<string, LucideIcon> = {
    Mail, Megaphone, Sparkles, Wand2, Users, Filter, FileText, Webhook, BarChart3, Globe, Key, Shield,
};

const deepFeatures = productFeatures.map((f) => ({
    ...f,
    details: f.details ?? [
        'Production-ready API with predictable responses',
        'Real-time event tracking and webhooks',
        'Dashboard for monitoring and management',
    ],
}));

interface FeaturesProps {
    seo: SeoData;
}

export default function Features({ seo }: FeaturesProps) {
    return (
        <MarketingLayout seo={seo}>
            <PageHero
                eyebrow="Features"
                title="Everything you need to send email at scale"
                description="Transactional delivery, marketing campaigns, AI intelligence, analytics, and deliverability — unified in one developer-first platform."
            >
                <MarketingButton href="/signup">Get started free</MarketingButton>
            </PageHero>

            {deepFeatures.map((feature, i) => {
                const Icon = iconMap[feature.icon] ?? Mail;
                const reversed = i % 2 === 1;
                return (
                    <Section key={feature.title} className={i % 2 === 0 ? '' : 'bg-[#0a0a0a]'}>
                        <Container>
                            <div className={`grid items-start gap-12 lg:grid-cols-2 lg:gap-16 ${reversed ? 'lg:[direction:rtl]' : ''}`}>
                                <motion.div
                                    initial={{ opacity: 0, x: reversed ? 20 : -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="lg:[direction:ltr]"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.05]">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h2 className="mt-6 font-display text-3xl tracking-tight sm:text-4xl">{feature.title}</h2>
                                    <p className="mt-4 text-lg text-zinc-400">{feature.description}</p>
                                    <ul className="mt-6 space-y-3">
                                        {feature.details.map((d) => (
                                            <li key={d} className="flex items-start gap-3 text-sm text-zinc-400">
                                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="marketing-card group overflow-hidden transition-transform duration-300 hover:scale-[1.01] lg:[direction:ltr]"
                                >
                                    <FeaturePreview type={feature.preview} size="large" />
                                </motion.div>
                            </div>
                        </Container>
                    </Section>
                );
            })}

            <Section>
                <Container className="text-center">
                    <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Ready to get started?</h2>
                    <p className="mx-auto mt-4 max-w-lg text-zinc-400">Create a free account and send your first email in minutes.</p>
                    <MarketingButton href="/signup" className="mt-8">Start free</MarketingButton>
                </Container>
            </Section>
        </MarketingLayout>
    );
}
