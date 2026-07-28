import { motion } from 'framer-motion';
import { Filter, Key, Lock, ShieldCheck } from 'lucide-react';
import type { ComponentType } from 'react';
import { Container, Section } from '@/Components/Website/Container';
import { SectionHeader } from '@/Components/Website/PageHero';
import { trustSignals } from '@/content/website';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const icons: Record<string, ComponentType<{ className?: string }>> = {
    ShieldCheck,
    Lock,
    Filter,
    Key,
};

export function TrustSignalsSection() {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    return (
        <Section id="deliverability">
            <Container>
                <SectionHeader
                    eyebrow="Deliverability & security"
                    title="The boring parts, handled correctly"
                    description="Reputation damage is expensive and slow to undo, so the safeguards are on by default rather than buried in settings."
                />

                <div className="grid gap-4 sm:grid-cols-2">
                    {trustSignals.map((signal, i) => {
                        const Icon = icons[signal.icon] ?? ShieldCheck;
                        return (
                            <motion.div
                                key={signal.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.45, delay: i * 0.06 }}
                                className="marketing-card marketing-card-hover p-7"
                            >
                                <span
                                    className={cn(
                                        'inline-flex h-10 w-10 items-center justify-center rounded-xl border',
                                        isLight
                                            ? 'border-black/[0.08] bg-black/[0.03]'
                                            : 'border-white/[0.08] bg-white/[0.04]',
                                    )}
                                >
                                    <Icon className="h-[18px] w-[18px] text-emerald-400" />
                                </span>
                                <h3 className="mt-5 text-lg font-medium">{signal.title}</h3>
                                <p
                                    className={cn(
                                        'mt-2 text-sm leading-relaxed',
                                        isLight ? 'text-zinc-600' : 'text-zinc-400',
                                    )}
                                >
                                    {signal.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </Container>
        </Section>
    );
}
