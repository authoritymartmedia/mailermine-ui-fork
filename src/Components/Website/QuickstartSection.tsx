import { motion } from 'framer-motion';
import { Container, Section } from '@/Components/Website/Container';
import { SectionHeader } from '@/Components/Website/PageHero';
import { MarketingButton } from '@/Components/Website/MarketingButton';
import { HighlightedCode } from '@/Components/Website/HighlightedCode';
import { codeExamples, quickstartSteps } from '@/content/website';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

export function QuickstartSection() {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    return (
        <Section id="quickstart" className="marketing-section-alt">
            <Container>
                <SectionHeader
                    eyebrow="Quickstart"
                    title="From signup to first email in minutes"
                    description="No sales call, no onboarding queue, no waiting on an account review. Verify a domain and send."
                />

                <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
                    <ol className="relative space-y-8">
                        {quickstartSteps.map((item, i) => (
                            <motion.li
                                key={item.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.45, delay: i * 0.07 }}
                                className="relative flex gap-5 pl-0"
                            >
                                <div className="flex flex-col items-center">
                                    <span
                                        className={cn(
                                            'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-xs',
                                            isLight
                                                ? 'border-black/10 bg-white text-zinc-700'
                                                : 'border-white/10 bg-white/[0.04] text-zinc-300',
                                        )}
                                    >
                                        {item.step}
                                    </span>
                                    {i < quickstartSteps.length - 1 && (
                                        <span
                                            className={cn(
                                                'mt-2 w-px flex-1',
                                                isLight ? 'bg-black/[0.08]' : 'bg-white/[0.08]',
                                            )}
                                            aria-hidden
                                        />
                                    )}
                                </div>
                                <div className="pb-2">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h3 className="text-lg font-medium">{item.title}</h3>
                                        <span
                                            className={cn(
                                                'rounded-full border px-2 py-0.5 text-[11px]',
                                                isLight
                                                    ? 'border-emerald-600/20 bg-emerald-500/10 text-emerald-700'
                                                    : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
                                            )}
                                        >
                                            {item.meta}
                                        </span>
                                    </div>
                                    <p
                                        className={cn(
                                            'mt-2 text-sm leading-relaxed',
                                            isLight ? 'text-zinc-600' : 'text-zinc-400',
                                        )}
                                    >
                                        {item.description}
                                    </p>
                                </div>
                            </motion.li>
                        ))}
                    </ol>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col"
                    >
                        <div className="marketing-card overflow-hidden">
                            <div
                                className={cn(
                                    'flex items-center gap-2 border-b px-4 py-3',
                                    isLight ? 'border-black/[0.06]' : 'border-white/[0.06]',
                                )}
                            >
                                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" aria-hidden />
                                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" aria-hidden />
                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" aria-hidden />
                                <span className={cn('ml-2 font-mono text-xs', isLight ? 'text-zinc-500' : 'text-zinc-500')}>
                                    send-welcome-email.ts
                                </span>
                            </div>
                            <div className="overflow-x-auto p-5">
                                <HighlightedCode code={codeExamples.node} />
                            </div>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <MarketingButton href="/signup">Create a free account</MarketingButton>
                            <MarketingButton variant="secondary" href="/docs">
                                Full quickstart guide
                            </MarketingButton>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
}
