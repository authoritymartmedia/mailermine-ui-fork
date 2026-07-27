import { motion } from 'framer-motion';
import { ChevronDown, LineChart, Users } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { Container, Section } from '@/Components/Website/Container';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

function ContactManagementPreview() {
    const subscribers = [
        { initials: 'UM', name: 'Umair Khan', when: 'Today', tone: 'bg-emerald-500/20 text-emerald-300 ring-emerald-500/30' },
        { initials: 'AL', name: 'Alex Johnson', when: 'Yesterday', tone: 'bg-violet-500/20 text-violet-300 ring-violet-500/30' },
        { initials: 'SA', name: 'Sarah Williams', when: '2h ago', tone: 'bg-sky-500/20 text-sky-300 ring-sky-500/30' },
    ];

    return (
        <div className="feature-preview relative flex min-h-[420px] flex-col overflow-hidden rounded-[28px] border border-[#1f1f1f] bg-[#0a0a0a] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:min-h-[460px] sm:p-7">
            <div
                className="pointer-events-none absolute -left-10 top-6 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl"
                aria-hidden
            />
            <div
                className="pointer-events-none absolute right-0 top-24 h-40 w-40 rounded-full bg-emerald-400/5 blur-3xl"
                aria-hidden
            />

            <div className="relative flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/35 bg-emerald-500/10 shadow-[0_0_28px_rgba(16,185,129,0.35)]">
                    <Users className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-500">Audience</p>
                    <div className="mt-0.5 flex items-center gap-1.5">
                        <p className="truncate text-[15px] font-medium text-white">Newsletter subscribers</p>
                        <ChevronDown className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                    </div>
                </div>
            </div>

            <div className="relative mt-6">
                <p className="text-[13px] font-medium text-zinc-200">Audience growth</p>
                <div className="relative mt-2">
                    <div className="flex gap-2">
                        <div className="flex w-7 shrink-0 flex-col justify-between py-1 text-right text-[10px] tabular-nums leading-none text-zinc-600">
                            <span>1.5k</span>
                            <span>1k</span>
                            <span>500</span>
                            <span>0</span>
                        </div>
                        <div className="relative min-w-0 flex-1">
                            <svg viewBox="0 0 340 110" className="h-[132px] w-full sm:h-[148px]" preserveAspectRatio="none" aria-hidden>
                                <defs>
                                    <linearGradient id="audienceGrowthFill" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#34d399" stopOpacity="0.38" />
                                        <stop offset="50%" stopColor="#10b981" stopOpacity="0.1" />
                                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                                    </linearGradient>
                                    <filter id="audienceGlow" x="-20%" y="-40%" width="140%" height="180%">
                                        <feGaussianBlur stdDeviation="2.4" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {[20, 44, 68, 92].map((y) => (
                                    <line
                                        key={y}
                                        x1="0"
                                        x2="340"
                                        y1={y}
                                        y2={y}
                                        stroke="rgba(255,255,255,0.055)"
                                        strokeWidth="1"
                                    />
                                ))}

                                <path
                                    d="M0 86 C48 78, 72 62, 110 58 C150 54, 180 48, 220 40 C260 32, 290 26, 340 18 L340 100 L0 100 Z"
                                    fill="url(#audienceGrowthFill)"
                                />
                                <path
                                    d="M0 86 C48 78, 72 62, 110 58 C150 54, 180 48, 220 40 C260 32, 290 26, 340 18"
                                    fill="none"
                                    stroke="#34d399"
                                    strokeWidth="2.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    filter="url(#audienceGlow)"
                                />
                                <circle cx="340" cy="18" r="6" fill="#34d399" opacity="0.35" />
                                <circle cx="340" cy="18" r="4" fill="#34d399" className="drop-shadow-[0_0_12px_rgba(52,211,153,1)]" />
                                <circle cx="340" cy="18" r="1.8" fill="#ecfdf5" />
                            </svg>

                            <div className="pointer-events-none absolute right-0 top-0 -translate-y-1 translate-x-[-6%] rounded-lg border border-white/10 bg-[#121212]/95 px-2.5 py-1.5 shadow-[0_10px_28px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:-translate-x-[10%]">
                                <p className="text-[13px] font-medium tabular-nums leading-none text-white">1,034</p>
                                <p className="mt-1 text-[10px] leading-none text-zinc-500">May 26</p>
                            </div>

                            <div className="mt-1 flex justify-between px-0.5 text-[10px] text-zinc-600">
                                <span>May 20</span>
                                <span>May 22</span>
                                <span>May 24</span>
                                <span>May 26</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative mt-5 grid grid-cols-2 gap-4 border-t border-white/[0.06] pt-5 sm:grid-cols-4">
                <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-500">All contacts</p>
                    <p className="mt-1 text-xl font-semibold tracking-tight text-white tabular-nums">1,034</p>
                    <p className="mt-1 text-[11px]">
                        <span className="text-emerald-400">↑ 12.4%</span>
                        <span className="text-zinc-600"> vs last 7 days</span>
                    </p>
                </div>
                <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-500">Unsubscribed</p>
                    <p className="mt-1 text-xl font-semibold tracking-tight text-white tabular-nums">5</p>
                    <p className="mt-1 text-[11px]">
                        <span className="text-emerald-400">↓ 1.3%</span>
                        <span className="text-zinc-600"> vs last 7 days</span>
                    </p>
                </div>
                <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-500">Avg. open rate</p>
                    <p className="mt-1 text-xl font-semibold tracking-tight text-white tabular-nums">68%</p>
                    <p className="mt-1 text-[11px]">
                        <span className="text-emerald-400">↑ 6.8%</span>
                        <span className="text-zinc-600"> vs last 7 days</span>
                    </p>
                </div>
                <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-500">Growth</p>
                    <svg viewBox="0 0 72 24" className="mt-2 h-5 w-16 text-emerald-400" aria-hidden>
                        <defs>
                            <linearGradient id="growthSparkFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
                                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M0 18 C8 16, 12 8, 20 10 C28 12, 32 4, 40 6 C48 8, 56 2, 72 4 L72 24 L0 24 Z"
                            fill="url(#growthSparkFill)"
                        />
                        <path
                            d="M0 18 C8 16, 12 8, 20 10 C28 12, 32 4, 40 6 C48 8, 56 2, 72 4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="drop-shadow-[0_0_8px_rgba(52,211,153,0.55)]"
                        />
                    </svg>
                    <p className="mt-1 text-[11px]">
                        <span className="font-medium text-emerald-400">+142</span>
                        <span className="text-zinc-600"> this month</span>
                    </p>
                </div>
            </div>

            <div className="relative mt-5 border-t border-white/[0.06] pt-4">
                <p className="text-[13px] font-medium text-zinc-200">Recent subscribers</p>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-5 gap-y-2.5">
                        {subscribers.map((person) => (
                            <div key={person.name} className="flex min-w-0 items-center gap-2.5">
                                <span
                                    className={cn(
                                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ring-1',
                                        person.tone,
                                    )}
                                >
                                    {person.initials}
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate text-[13px] font-medium text-zinc-100">{person.name}</p>
                                    <p className="text-[11px] text-zinc-500">{person.when}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300 sm:self-center">
                        View all
                        <span aria-hidden>→</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

function BroadcastAnalyticsPreview() {
    return (
        <div className="feature-preview relative flex min-h-[300px] items-center overflow-hidden rounded-[28px] border border-[#1f1f1f] bg-[#0a0a0a] p-4 sm:h-[320px] sm:min-h-0 sm:p-7">
            <div
                className="pointer-events-none absolute left-8 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-emerald-400/20 blur-3xl"
                aria-hidden
            />

            <div className="relative z-10 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <div className="w-full min-w-0 rounded-2xl border border-white/[0.08] bg-[#111111]/90 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:w-[58%] sm:p-5">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">Deliverability</p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">98%</p>
                    <div className="mt-4 space-y-2.5 sm:mt-5">
                        <div className="flex items-center gap-2.5 text-sm text-zinc-300">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                            <span>Delivered</span>
                            <span className="ml-auto tabular-nums text-zinc-400">3,204</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm text-zinc-300">
                            <span className="h-2 w-2 rounded-full bg-red-400" />
                            <span>Bounced</span>
                            <span className="ml-auto tabular-nums text-zinc-400">60</span>
                        </div>
                    </div>
                </div>

                <div className="w-full min-w-0 rounded-2xl border border-white/[0.08] bg-[#111111]/80 p-4 opacity-90 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:-ml-4 sm:w-[48%] sm:p-5">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">Engagement</p>
                    <p className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-5xl">41%</p>
                    <div className="mt-4 space-y-2.5 sm:mt-5">
                        <div className="flex items-center gap-2.5 text-sm text-zinc-300">
                            <span className="h-2 w-2 rounded-full bg-violet-400" />
                            <span>Opened</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm text-zinc-300">
                            <span className="h-2 w-2 rounded-full bg-sky-400" />
                            <span>Clicked</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const features = [
    {
        title: 'Contact management',
        description:
            'Import your list in minutes, regardless the size of your audience. Get full visibility of each contact and their personal attributes.',
        icon: Users,
        preview: <ContactManagementPreview />,
    },
    {
        title: 'Broadcast analytics',
        description:
            'Unlock powerful insights and understand exactly how your audience is interacting with your broadcast emails.',
        icon: LineChart,
        preview: <BroadcastAnalyticsPreview />,
    },
];

export function BeyondEditingSection() {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    return (
        <Section id="audience" className={cn(isLight ? 'bg-zinc-50' : 'bg-black')}>
            <Container className="max-w-7xl">
                <motion.div {...fadeUp} className="max-w-2xl">
                    <h2
                        className={cn(
                            'text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]',
                            isLight ? 'text-zinc-900' : 'text-white',
                        )}
                    >
                        Go beyond editing
                    </h2>
                    <p className={cn('mt-5 text-lg leading-relaxed', isLight ? 'text-zinc-600' : 'text-zinc-400')}>
                        Group and control your contacts in a simple and intuitive way. Straightforward analytics and
                        reporting tools that will help you send better emails.
                    </p>
                </motion.div>

                <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-12">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{
                                    duration: 0.55,
                                    delay: index * 0.1,
                                    ease: [0.22, 1, 0.36, 1] as const,
                                }}
                            >
                                {feature.preview}

                                <div className="mt-8">
                                    <div className="flex items-center gap-2.5">
                                        <Icon
                                            className={cn('h-4 w-4', isLight ? 'text-zinc-900' : 'text-white')}
                                            strokeWidth={1.75}
                                        />
                                        <h3
                                            className={cn(
                                                'text-base font-medium',
                                                isLight ? 'text-zinc-900' : 'text-white',
                                            )}
                                        >
                                            {feature.title}
                                        </h3>
                                    </div>
                                    <p
                                        className={cn(
                                            'mt-3 max-w-md text-[15px] leading-relaxed',
                                            isLight ? 'text-zinc-600' : 'text-zinc-400',
                                        )}
                                    >
                                        {feature.description}
                                    </p>
                                    <Link
                                        href={route('website.features')}
                                        className={cn(
                                            'mt-4 inline-flex text-sm transition-colors',
                                            isLight
                                                ? 'text-zinc-700 hover:text-zinc-900'
                                                : 'text-zinc-300 hover:text-white',
                                        )}
                                    >
                                        Learn more
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </Container>
        </Section>
    );
}
