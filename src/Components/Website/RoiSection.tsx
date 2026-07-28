import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';
import { Container, Section } from '@/Components/Website/Container';
import { SectionHeader } from '@/Components/Website/PageHero';
import { MarketingButton } from '@/Components/Website/MarketingButton';
import type { PublicPricingPlan } from '@/Components/Website/PricingPlanGrid';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const VOLUME_STEPS = [3_000, 10_000, 50_000, 150_000, 250_000, 500_000];

function formatVolume(value: number) {
    if (value >= 1_000_000) return `${value / 1_000_000}M`;
    if (value >= 1_000) return `${Math.round(value / 1_000)}k`;
    return String(value);
}

function parsePrice(price: string): number | null {
    const numeric = Number(price.replace(/[^0-9.]/g, ''));
    return Number.isFinite(numeric) && price.trim().startsWith('$') ? numeric : null;
}

interface RoiSectionProps {
    plans: PublicPricingPlan[];
}

export function RoiSection({ plans }: RoiSectionProps) {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const [stepIndex, setStepIndex] = useState(2);

    const volume = VOLUME_STEPS[stepIndex];

    /** Cheapest plan whose included volume covers the selected send volume. */
    const recommendation = useMemo(() => {
        const metered = plans
            .filter((plan) => !plan.is_enterprise && plan.emails !== null)
            .sort((a, b) => (a.emails ?? 0) - (b.emails ?? 0));

        const fit = metered.find((plan) => (plan.emails ?? 0) >= volume);
        if (fit) return { plan: fit, custom: false };

        const enterprise = plans.find((plan) => plan.is_enterprise);
        return { plan: enterprise ?? metered[metered.length - 1], custom: !!enterprise };
    }, [plans, volume]);

    const plan = recommendation.plan;
    const monthly = plan ? parsePrice(plan.price) : null;
    const costPerThousand = monthly !== null && volume > 0 ? (monthly / volume) * 1000 : null;

    return (
        <Section id="roi" className="marketing-section-alt">
            <Container>
                <SectionHeader
                    eyebrow="What it costs you"
                    title="Priced for the volume you actually send"
                    description="Move the slider to your monthly send volume. Every plan includes both transactional and marketing email, so there is no second subscription to add on top."
                />

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5 }}
                        className="marketing-card p-7 sm:p-9"
                    >
                        <label htmlFor="roi-volume" className={cn('text-sm', isLight ? 'text-zinc-600' : 'text-zinc-400')}>
                            Emails per month
                        </label>
                        <p className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
                            {volume.toLocaleString()}
                        </p>

                        <input
                            id="roi-volume"
                            type="range"
                            min={0}
                            max={VOLUME_STEPS.length - 1}
                            step={1}
                            value={stepIndex}
                            onChange={(event) => setStepIndex(Number(event.target.value))}
                            aria-valuetext={`${volume.toLocaleString()} emails per month`}
                            className={cn(
                                'mt-8 h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none',
                                '[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:shadow-md',
                                '[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-emerald-400',
                                isLight ? 'bg-black/10' : 'bg-white/10',
                            )}
                        />

                        <div className={cn('mt-3 flex justify-between text-[11px]', isLight ? 'text-zinc-500' : 'text-zinc-600')}>
                            {VOLUME_STEPS.map((step) => (
                                <span key={step}>{formatVolume(step)}</span>
                            ))}
                        </div>

                        <div className={cn('mt-8 grid gap-4 border-t pt-8 sm:grid-cols-2', isLight ? 'border-black/[0.07]' : 'border-white/[0.07]')}>
                            <div>
                                <p className={cn('text-xs uppercase tracking-[0.14em]', isLight ? 'text-zinc-500' : 'text-zinc-500')}>
                                    Recommended plan
                                </p>
                                <p className="mt-2 text-2xl font-medium">
                                    {plan?.name ?? 'Custom'}
                                    {monthly !== null && (
                                        <span className={cn('ml-2 text-base', isLight ? 'text-zinc-500' : 'text-zinc-400')}>
                                            {plan?.price}
                                            {plan?.period}
                                        </span>
                                    )}
                                </p>
                            </div>
                            <div>
                                <p className={cn('text-xs uppercase tracking-[0.14em]', isLight ? 'text-zinc-500' : 'text-zinc-500')}>
                                    Cost per 1,000 emails
                                </p>
                                <p className="mt-2 text-2xl font-medium">
                                    {costPerThousand === null
                                        ? 'Talk to us'
                                        : costPerThousand === 0
                                          ? 'Free'
                                          : `$${costPerThousand.toFixed(2)}`}
                                </p>
                            </div>
                        </div>

                        <p className={cn('mt-6 text-xs leading-relaxed', isLight ? 'text-zinc-500' : 'text-zinc-500')}>
                            {recommendation.custom
                                ? 'Above 250,000 emails a month we price per volume, including dedicated infrastructure and a contract.'
                                : 'Both transactional and marketing sends draw from the same monthly allowance.'}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, delay: 0.08 }}
                        className="flex flex-col gap-4"
                    >
                        <div className="marketing-card flex-1 p-7">
                            <Layers className="h-5 w-5 text-emerald-400" aria-hidden />
                            <h3 className="mt-4 text-lg font-medium">One subscription, not two</h3>
                            <p className={cn('mt-2 text-sm leading-relaxed', isLight ? 'text-zinc-600' : 'text-zinc-400')}>
                                Teams typically run a transactional provider and a separate marketing platform. Here both
                                sit on one plan, one reputation, and one suppression list.
                            </p>
                        </div>
                        <div className="marketing-card flex-1 p-7">
                            <Sparkles className="h-5 w-5 text-emerald-400" aria-hidden />
                            <h3 className="mt-4 text-lg font-medium">Fewer bad sends</h3>
                            <p className={cn('mt-2 text-sm leading-relaxed', isLight ? 'text-zinc-600' : 'text-zinc-400')}>
                                The AI analyzer scores deliverability and spam risk before a campaign goes out, which is
                                cheaper than repairing a damaged sending domain afterwards.
                            </p>
                        </div>
                        <MarketingButton href="/pricing" size="lg" className="w-full">
                            See full pricing
                            <ArrowRight className="h-4 w-4" aria-hidden />
                        </MarketingButton>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
}
