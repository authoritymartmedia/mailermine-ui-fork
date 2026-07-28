import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { Check, ChevronRight, Copy, Sparkles } from 'lucide-react';
import { Container } from '@/Components/Website/Container';
import { FeaturePreview } from '@/Components/Website/FeaturePreview';
import { BrowserMockup } from '@/Components/Website/BrowserMockup';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const floatingBadges = [
    { label: 'Delivered', tone: 'emerald', position: '-top-3 -left-3 xl:-left-14', delay: 0 },
    { label: 'Webhook', tone: 'amber', position: 'top-[28%] -left-4 xl:-left-16', delay: 0.4 },
    { label: 'Delivery Ready', tone: 'emerald', position: 'top-[58%] -left-2 xl:-left-12', delay: 0.9 },
    { label: 'Opened', tone: 'emerald', position: '-top-2 -right-3 xl:-right-14', delay: 0.55 },
    { label: 'Domain Verified', tone: 'emerald', position: 'top-[48%] -right-2 xl:-right-16', delay: 1.1 },
];

const toneClassesDark: Record<string, string> = {
    emerald: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
    amber: 'border-amber-500/20 bg-amber-500/10 text-amber-400',
    zinc: 'border-white/10 bg-white/[0.04] text-zinc-300',
};

const toneClassesLight: Record<string, string> = {
    emerald: 'border-emerald-600/20 bg-emerald-500/10 text-emerald-700',
    amber: 'border-amber-600/20 bg-amber-500/10 text-amber-700',
    zinc: 'border-black/10 bg-black/[0.04] text-zinc-700',
};

const fadeUp = {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
};

const reassurances = ['3,000 emails free every month', 'No credit card required', 'Sending in under 10 minutes'];

const INSTALL_COMMAND = 'npm i @mailermine/node';

function InstallCommand({ isLight }: { isLight: boolean }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(INSTALL_COMMAND);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard is unavailable outside secure contexts; the command stays selectable.
        }
    };

    return (
        <button
            type="button"
            onClick={copy}
            aria-label={`Copy install command: ${INSTALL_COMMAND}`}
            className={cn(
                'group inline-flex items-center gap-3 rounded-full border px-4 py-2 font-mono text-[13px] transition-colors',
                isLight
                    ? 'border-black/10 bg-black/[0.03] text-zinc-700 hover:bg-black/[0.06]'
                    : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.06]',
            )}
        >
            <span className={isLight ? 'text-zinc-400' : 'text-zinc-600'}>$</span>
            {INSTALL_COMMAND}
            {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden />
            ) : (
                <Copy
                    className={cn(
                        'h-3.5 w-3.5 transition-colors',
                        isLight ? 'text-zinc-400 group-hover:text-zinc-600' : 'text-zinc-600 group-hover:text-zinc-300',
                    )}
                    aria-hidden
                />
            )}
        </button>
    );
}

export function HeroSection() {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const toneClasses = isLight ? toneClassesLight : toneClassesDark;

    return (
        <section className="marketing-gradient-hero relative overflow-x-clip overflow-y-visible pt-28 pb-16 sm:pt-32 sm:pb-24 lg:pt-44 lg:pb-36">
            <div className="marketing-grid-bg pointer-events-none absolute inset-0" />
            <div className="hero-orb hero-orb--purple pointer-events-none absolute -left-32 top-20 h-96 w-96" aria-hidden />
            <div className="hero-orb hero-orb--amber pointer-events-none absolute -right-24 top-40 h-80 w-80" aria-hidden />

            <Container className="relative">
                <motion.div {...fadeUp} className="mx-auto max-w-5xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -14, scale: 0.88 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 20, delay: 0.08 }}
                        className="mb-8 flex justify-center"
                    >
                        <Link
                            href="/features"
                            className="group relative inline-flex"
                        >
                            <span
                                className={cn(
                                    'pointer-events-none absolute -inset-1 rounded-full opacity-50 blur-md transition-opacity group-hover:opacity-80',
                                    isLight ? 'bg-emerald-400/25' : 'bg-emerald-400/20',
                                )}
                                aria-hidden
                            />
                            <span
                                className={cn(
                                    'relative inline-flex items-center gap-2 rounded-full p-[1px]',
                                    'bg-gradient-to-r from-emerald-400/70 via-amber-400/50 to-white/25',
                                )}
                            >
                                <span
                                    className={cn(
                                        'inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                                        isLight
                                            ? 'bg-white text-zinc-800 group-hover:text-zinc-950'
                                            : 'bg-[#0c0c0c] text-zinc-200 group-hover:text-white',
                                    )}
                                >
                                    <Sparkles
                                        className={cn(
                                            'h-3.5 w-3.5',
                                            isLight ? 'text-emerald-600' : 'text-emerald-400',
                                        )}
                                        aria-hidden
                                    />
                                    New: AI Campaign Analyzer
                                    <ChevronRight
                                        className="h-3.5 w-3.5 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-300"
                                        aria-hidden
                                    />
                                </span>
                            </span>
                        </Link>
                    </motion.div>

                    <h1 className="font-display text-[2.5rem] leading-[1.06] tracking-[-0.015em] [text-wrap:balance] sm:text-5xl md:text-6xl lg:text-[4.5rem]">
                        Transactional and marketing email, one API
                    </h1>
                    <p
                        className={cn(
                            'mx-auto mt-6 max-w-2xl text-base leading-relaxed sm:mt-8 sm:text-lg md:text-xl',
                            isLight ? 'text-zinc-600' : 'text-zinc-400',
                        )}
                    >
                        Send password resets and product launches from the same platform, on the same sending
                        reputation. Clean REST API, SDKs for every major language, and real-time delivery events.
                    </p>
                    <div className="mt-10 flex flex-col items-center gap-6 sm:mt-12">
                        <div className="flex flex-col items-center gap-4 sm:flex-row">
                            <Link
                                href="/signup"
                                className={cn(
                                    'inline-flex h-12 min-w-[200px] items-center justify-center rounded-full px-10 text-[15px] font-medium transition-colors',
                                    isLight
                                        ? 'bg-zinc-900 text-white shadow-[0_1px_2px_rgba(0,0,0,0.18)] hover:bg-zinc-800'
                                        : 'bg-white text-[#090909] shadow-[0_1px_2px_rgba(0,0,0,0.5)] hover:bg-zinc-100',
                                )}
                            >
                                Start sending free
                            </Link>
                            <Link
                                href="/docs"
                                className={cn(
                                    'inline-flex h-12 items-center justify-center gap-1.5 rounded-full border px-7 text-[15px] font-medium transition-colors',
                                    isLight
                                        ? 'border-black/10 text-zinc-900 hover:bg-black/[0.04]'
                                        : 'border-white/10 text-white hover:bg-white/[0.05]',
                                )}
                            >
                                Read the docs
                                <ChevronRight className="h-4 w-4" aria-hidden />
                            </Link>
                        </div>

                        <ul
                            className={cn(
                                'flex flex-col items-center gap-x-6 gap-y-2 text-[13px] sm:flex-row',
                                isLight ? 'text-zinc-600' : 'text-zinc-500',
                            )}
                        >
                            {reassurances.map((item) => (
                                <li key={item} className="flex items-center gap-2">
                                    <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" aria-hidden />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <InstallCommand isLight={isLight} />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative z-0 mx-auto mt-16 max-w-5xl px-0 sm:mt-20 sm:px-6 lg:mt-28 lg:px-10"
                >
                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        className="relative z-0"
                    >
                        <BrowserMockup className="shadow-2xl" glow={false}>
                            <FeaturePreview type="analytics" size="large" />
                        </BrowserMockup>
                    </motion.div>

                    {floatingBadges.map((badge) => (
                        <motion.div
                            key={badge.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + badge.delay, duration: 0.4 }}
                            className={cn(
                                'pointer-events-none absolute z-20 hidden rounded-full border px-3 py-1.5 text-xs font-medium shadow-lg backdrop-blur-md lg:block',
                                badge.position,
                                toneClasses[badge.tone],
                            )}
                        >
                            <motion.span
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 3 + badge.delay, repeat: Infinity, ease: 'easeInOut' }}
                                className="block"
                            >
                                {badge.label}
                            </motion.span>
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </section>
    );
}
