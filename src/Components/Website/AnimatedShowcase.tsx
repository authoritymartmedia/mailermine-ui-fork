import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Pause, Play } from 'lucide-react';
import { Container, Section } from '@/Components/Website/Container';
import { SectionHeader } from '@/Components/Website/PageHero';
import { BrowserMockup } from '@/Components/Website/BrowserMockup';
import { FeaturePreview } from '@/Components/Website/FeaturePreview';
import { showcaseFeatures } from '@/content/website';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const SLIDE_MS = 6000;

/** Events that stream in over the preview to make the mockup feel live. */
const liveEvents = [
    { label: 'delivered', tone: 'emerald' },
    { label: 'opened', tone: 'emerald' },
    { label: 'clicked', tone: 'amber' },
    { label: 'webhook sent', tone: 'zinc' },
];

const toneStyles: Record<string, { dark: string; light: string }> = {
    emerald: {
        dark: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
        light: 'border-emerald-600/20 bg-emerald-500/10 text-emerald-700',
    },
    amber: {
        dark: 'border-amber-500/20 bg-amber-500/10 text-amber-400',
        light: 'border-amber-600/20 bg-amber-500/10 text-amber-700',
    },
    zinc: {
        dark: 'border-white/10 bg-white/[0.05] text-zinc-300',
        light: 'border-black/10 bg-black/[0.04] text-zinc-700',
    },
};

function LiveEventTicker({ isLight, paused }: { isLight: boolean; paused: boolean }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (paused) return;
        const id = setInterval(() => setIndex((i) => (i + 1) % liveEvents.length), 1800);
        return () => clearInterval(id);
    }, [paused]);

    const event = liveEvents[index];
    const tone = toneStyles[event.tone] ?? toneStyles.zinc;

    return (
        <div className="pointer-events-none absolute right-4 top-4 z-20 hidden sm:block">
            <AnimatePresence mode="wait">
                <motion.span
                    key={event.label}
                    initial={{ opacity: 0, y: -8, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.94 }}
                    transition={{ duration: 0.35 }}
                    className={cn(
                        'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-medium shadow-lg backdrop-blur-md',
                        isLight ? tone.light : tone.dark,
                    )}
                >
                    <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
                    </span>
                    {event.label}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}

export function AnimatedShowcase() {
    const { theme } = useTheme();
    const isLight = theme === 'light';
    const reduceMotion = useReducedMotion();

    const [activeId, setActiveId] = useState(showcaseFeatures[0].id);
    const [hovered, setHovered] = useState(false);
    const [tourRunning, setTourRunning] = useState(true);

    const active = useMemo(
        () => showcaseFeatures.find((f) => f.id === activeId) ?? showcaseFeatures[0],
        [activeId],
    );

    const advance = useCallback(() => {
        setActiveId((current) => {
            const i = showcaseFeatures.findIndex((f) => f.id === current);
            return showcaseFeatures[(i + 1) % showcaseFeatures.length].id;
        });
    }, []);

    // Auto-advance, pausing on hover and stopping once the visitor picks a tab.
    const autoPlaying = tourRunning && !hovered && !reduceMotion;

    useEffect(() => {
        if (!autoPlaying) return;
        const id = setTimeout(advance, SLIDE_MS);
        return () => clearTimeout(id);
    }, [activeId, autoPlaying, advance]);

    const select = (id: string) => {
        setTourRunning(false);
        setActiveId(id);
    };

    return (
        <Section id="product">
            <Container>
                <SectionHeader
                    eyebrow="Product tour"
                    title="Everything you need, in one dashboard"
                    description="The same surface your team works in every day. Pick any area to see it, or let the tour run."
                />

                <div
                    className="grid gap-8 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-12"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    {/* Tab rail: horizontal scroll on mobile, vertical list on desktop */}
                    <div
                        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
                        role="tablist"
                        aria-label="Product areas"
                    >
                        {showcaseFeatures.map((feature) => {
                            const isActive = feature.id === active.id;
                            return (
                                <button
                                    key={feature.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => select(feature.id)}
                                    className={cn(
                                        'group relative shrink-0 overflow-hidden rounded-xl border px-4 py-3 text-left text-sm transition-colors lg:w-full',
                                        isActive
                                            ? isLight
                                                ? 'border-black/[0.12] bg-white text-zinc-900 shadow-sm'
                                                : 'border-white/[0.12] bg-white/[0.06] text-white'
                                            : isLight
                                              ? 'border-transparent text-zinc-600 hover:bg-black/[0.03]'
                                              : 'border-transparent text-zinc-400 hover:bg-white/[0.03]',
                                    )}
                                >
                                    <span className="flex items-center justify-between gap-3">
                                        <span className="font-medium">{feature.label}</span>
                                        <span
                                            className={cn(
                                                'hidden text-[10px] uppercase tracking-[0.14em] lg:inline',
                                                isActive
                                                    ? isLight
                                                        ? 'text-zinc-400'
                                                        : 'text-zinc-500'
                                                    : 'text-transparent',
                                            )}
                                        >
                                            {feature.group}
                                        </span>
                                    </span>

                                    {/* Progress bar doubles as the auto-advance indicator */}
                                    {isActive && autoPlaying && (
                                        <motion.span
                                            key={`${feature.id}-progress`}
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
                                            className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-emerald-400/70"
                                        />
                                    )}
                                    {isActive && !autoPlaying && (
                                        <span className="absolute bottom-0 left-0 h-[2px] w-full bg-emerald-400/40" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div>
                        <div className="relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active.id}
                                    initial={{ opacity: 0, y: 16, scale: 0.99 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -12, scale: 0.99 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <BrowserMockup url={`app.mailermine.com/${active.id}`} glow={false}>
                                        <FeaturePreview type={active.preview} size="large" />
                                    </BrowserMockup>
                                </motion.div>
                            </AnimatePresence>
                            <LiveEventTicker isLight={isLight} paused={hovered} />
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${active.id}-copy`}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.3 }}
                                className="mt-8"
                            >
                                <h3 className="font-display text-2xl tracking-tight sm:text-3xl">{active.title}</h3>
                                <p
                                    className={cn(
                                        'mt-3 max-w-2xl text-base leading-relaxed',
                                        isLight ? 'text-zinc-600' : 'text-zinc-400',
                                    )}
                                >
                                    {active.description}
                                </p>
                                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                                    {active.highlights.map((highlight) => (
                                        <li
                                            key={highlight}
                                            className={cn(
                                                'flex items-center gap-2 text-sm',
                                                isLight ? 'text-zinc-700' : 'text-zinc-300',
                                            )}
                                        >
                                            <Check className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </AnimatePresence>

                        {!reduceMotion && (
                            <button
                                type="button"
                                onClick={() => setTourRunning((running) => !running)}
                                className={cn(
                                    'mt-8 inline-flex items-center gap-2 text-xs transition-colors',
                                    isLight ? 'text-zinc-500 hover:text-zinc-800' : 'text-zinc-500 hover:text-zinc-200',
                                )}
                            >
                                {tourRunning ? (
                                    <>
                                        <Pause className="h-3.5 w-3.5" aria-hidden />
                                        Pause tour
                                    </>
                                ) : (
                                    <>
                                        <Play className="h-3.5 w-3.5" aria-hidden />
                                        Resume tour
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
