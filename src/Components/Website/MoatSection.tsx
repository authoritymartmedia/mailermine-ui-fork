import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Gauge, Layers, Sparkles, Wallet } from 'lucide-react';
import { Container, Section } from '@/Components/Website/Container';
import { SectionHeader } from '@/Components/Website/PageHero';
import { moatPillars } from '@/content/website';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const icons: Record<string, ComponentType<{ className?: string }>> = {
    Layers,
    Sparkles,
    Gauge,
    Wallet,
};

export function MoatSection() {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    return (
        <Section id="why-different">
            <Container>
                <SectionHeader
                    eyebrow="Why MailerMine wins"
                    title="Four things the alternatives make you choose between"
                    description="Email tooling usually forces a trade: developer-grade API or marketer-grade campaigns, cheap or reliable. These are the places we refuse to split the difference."
                />

                <div className="grid gap-4 md:grid-cols-2">
                    {moatPillars.map((pillar, i) => {
                        const Icon = icons[pillar.icon] ?? Layers;
                        return (
                            <motion.div
                                key={pillar.title}
                                initial={{ opacity: 0, y: 22 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, delay: i * 0.07 }}
                                className="marketing-card marketing-card-hover relative overflow-hidden p-8"
                            >
                                <span
                                    className={cn(
                                        'inline-flex h-11 w-11 items-center justify-center rounded-xl border',
                                        isLight ? 'border-black/[0.08] bg-black/[0.03]' : 'border-white/[0.08] bg-white/[0.04]',
                                    )}
                                >
                                    <Icon className="h-5 w-5 text-emerald-400" />
                                </span>

                                <h3 className="mt-6 text-xl font-medium leading-snug">{pillar.title}</h3>
                                <p
                                    className={cn(
                                        'mt-3 text-sm leading-relaxed',
                                        isLight ? 'text-zinc-600' : 'text-zinc-400',
                                    )}
                                >
                                    {pillar.description}
                                </p>

                                <p
                                    className={cn(
                                        'mt-6 inline-flex rounded-full border px-3 py-1 text-[11px] font-medium',
                                        isLight
                                            ? 'border-emerald-600/20 bg-emerald-500/10 text-emerald-700'
                                            : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
                                    )}
                                >
                                    {pillar.proof}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </Container>
        </Section>
    );
}
