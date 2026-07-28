import { motion } from 'framer-motion';
import { ArrowRight, Check, X } from 'lucide-react';
import { Container, Section } from '@/Components/Website/Container';
import { SectionHeader } from '@/Components/Website/PageHero';
import { MarketingButton } from '@/Components/Website/MarketingButton';
import { stackConsolidation } from '@/content/website';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

export function StackConsolidationSection() {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const { before, after } = stackConsolidation;

    return (
        <Section id="consolidate" className="marketing-section-alt">
            <Container>
                <SectionHeader
                    eyebrow="One platform"
                    title="Stop paying for three tools to send email"
                    description="Most teams end up with a transactional provider, a marketing tool, and a spreadsheet to reconcile them. MailerMine is all of it on one pipeline."
                />

                <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5 }}
                        className={cn(
                            'rounded-2xl border p-7',
                            isLight ? 'border-black/[0.08] bg-black/[0.02]' : 'border-white/[0.06] bg-white/[0.01]',
                        )}
                    >
                        <p className={cn('text-xs font-medium uppercase tracking-[0.16em]', isLight ? 'text-zinc-500' : 'text-zinc-500')}>
                            {before.label}
                        </p>
                        <ul className="mt-6 space-y-4">
                            {before.items.map((item) => (
                                <li key={item} className="flex gap-3">
                                    <X
                                        className={cn('mt-0.5 h-4 w-4 shrink-0', isLight ? 'text-zinc-400' : 'text-zinc-600')}
                                        aria-hidden
                                    />
                                    <span className={cn('text-sm leading-relaxed', isLight ? 'text-zinc-500' : 'text-zinc-500')}>
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <div className="flex items-center justify-center lg:px-2">
                        <span
                            className={cn(
                                'flex h-10 w-10 items-center justify-center rounded-full border',
                                isLight ? 'border-black/[0.08] bg-white' : 'border-white/[0.08] bg-white/[0.04]',
                            )}
                        >
                            <ArrowRight className="h-4 w-4 rotate-90 text-emerald-400 lg:rotate-0" aria-hidden />
                        </span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className={cn(
                            'relative overflow-hidden rounded-2xl border p-7',
                            isLight
                                ? 'border-emerald-600/20 bg-emerald-500/[0.04]'
                                : 'border-emerald-500/20 bg-emerald-500/[0.03]',
                        )}
                    >
                        <div className="hero-orb hero-orb--purple pointer-events-none absolute -right-16 -top-16 h-40 w-40" aria-hidden />
                        <p className={cn('relative text-xs font-medium uppercase tracking-[0.16em]', isLight ? 'text-emerald-700' : 'text-emerald-400')}>
                            {after.label}
                        </p>
                        <ul className="relative mt-6 space-y-4">
                            {after.items.map((item) => (
                                <li key={item} className="flex gap-3">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
                                    <span className={cn('text-sm leading-relaxed', isLight ? 'text-zinc-700' : 'text-zinc-300')}>
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                    <MarketingButton href="/signup" size="lg">
                        Start sending free
                    </MarketingButton>
                    <MarketingButton variant="secondary" size="lg" href="/pricing">
                        Compare plans
                    </MarketingButton>
                </div>
            </Container>
        </Section>
    );
}
