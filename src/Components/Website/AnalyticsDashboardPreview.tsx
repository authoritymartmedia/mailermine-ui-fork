import { cn } from '@/lib/utils';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'] as const;

/** Volume (0–12k) and open rate (0–100) sample series for the hero chart */
const VOLUME = [4200, 5800, 5100, 7200, 5500, 8800, 6400, 9100, 7800];
const OPEN_RATE = [62, 65, 58, 71, 64, 73, 67, 76, 68];

const heroMetrics = [
    { label: 'Delivered', value: '99.2%', spark: [88, 90, 92, 91, 94, 95, 97, 98, 99], tone: 'emerald' as const },
    { label: 'Opened', value: '68%', spark: [52, 55, 58, 60, 62, 64, 65, 67, 68], tone: 'emerald' as const },
    { label: 'Clicked', value: '24%', spark: [14, 16, 18, 17, 19, 21, 22, 23, 24], tone: 'violet' as const },
    { label: 'Sent', value: '48.2k', spark: [30, 34, 32, 38, 36, 42, 40, 46, 48], tone: 'violet' as const },
    { label: 'Bounced', value: '0.4%', spark: [1.2, 0.9, 0.8, 0.7, 0.6, 0.5, 0.5, 0.4, 0.4], tone: 'red' as const },
    { label: 'Spam', value: '0.02%', spark: [0.05, 0.04, 0.04, 0.03, 0.03, 0.02, 0.02, 0.02, 0.02], tone: 'red' as const },
];

const sparkStroke: Record<(typeof heroMetrics)[number]['tone'], string> = {
    emerald: '#4ADE80',
    violet: '#818CF8',
    red: '#F87171',
};

function sparkPath(values: number[], width = 48, height = 16): string {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    return values
        .map((v, i) => {
            const x = (i / (values.length - 1)) * width;
            const y = height - ((v - min) / range) * (height - 2) - 1;
            return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
        })
        .join(' ');
}

function chartPaths() {
    const w = 560;
    const h = 180;
    const padL = 36;
    const padR = 36;
    const padT = 12;
    const padB = 28;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    const toX = (i: number) => padL + (i / (VOLUME.length - 1)) * plotW;
    const toYVol = (v: number) => padT + plotH - (v / 12000) * plotH;
    const toYOpen = (v: number) => padT + plotH - (v / 100) * plotH;

    const volumeLine = VOLUME.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)} ${toYVol(v).toFixed(1)}`).join(' ');
    const volumeArea = `${volumeLine} L${toX(VOLUME.length - 1).toFixed(1)} ${(padT + plotH).toFixed(1)} L${toX(0).toFixed(1)} ${(padT + plotH).toFixed(1)} Z`;
    const openLine = OPEN_RATE.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)} ${toYOpen(v).toFixed(1)}`).join(' ');

    const volumeDots = VOLUME.map((v, i) => ({ x: toX(i), y: toYVol(v) }));
    const openDots = OPEN_RATE.map((v, i) => ({ x: toX(i), y: toYOpen(v) }));

    return { w, h, padL, padR, padT, padB, plotW, plotH, volumeLine, volumeArea, openLine, volumeDots, openDots, toYVol, toYOpen };
}

interface AnalyticsDashboardPreviewProps {
    className?: string;
    compact?: boolean;
}

export function AnalyticsDashboardPreview({ className, compact = false }: AnalyticsDashboardPreviewProps) {
    const chart = chartPaths();
    const yLeft = [0, 3, 6, 9, 12];
    const yRight = [0, 25, 50, 75, 100];

    if (compact) {
        return (
            <div className={cn('feature-preview w-full overflow-hidden bg-[#0a0a0a] rounded-xl border border-white/[0.04]', className)}>
                <div className="p-3">
                    <div className="grid grid-cols-3 gap-2 text-center">
                        {heroMetrics.slice(0, 3).map((m) => (
                            <div key={m.label}>
                                <p className="text-xs font-medium text-zinc-200">{m.value}</p>
                                <p className="text-[8px] text-zinc-600">{m.label}</p>
                            </div>
                        ))}
                    </div>
                    <svg viewBox={`0 0 ${chart.w} ${chart.h}`} className="mt-2 h-12 w-full" preserveAspectRatio="none" aria-hidden>
                        <path d={chart.volumeArea} fill="url(#volFillCompact)" />
                        <path d={chart.volumeLine} fill="none" stroke="#818CF8" strokeWidth="3" />
                        <path d={chart.openLine} fill="none" stroke="#4ADE80" strokeWidth="2.5" />
                        <defs>
                            <linearGradient id="volFillCompact" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#818CF8" stopOpacity="0.35" />
                                <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        );
    }

    return (
        <div className={cn('feature-preview w-full overflow-hidden bg-[#0a0a0a]', className)}>
            {/* Header */}
            <div className="flex flex-col gap-3 border-b border-white/[0.06] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div>
                    <p className="text-sm font-medium text-white">Delivery analytics</p>
                    <p className="mt-0.5 text-[11px] text-zinc-500">Last 7 days · Production</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[10px] text-zinc-400">Emails</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] text-amber-400">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                        Live
                    </span>
                    <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[10px] text-zinc-400">API</span>
                </div>
            </div>

            <div className="px-3 pb-3 pt-4 sm:px-5 sm:pb-4 sm:pt-5">
                {/* KPI row */}
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 sm:gap-2.5">
                    {heroMetrics.map((m) => (
                        <div
                            key={m.label}
                            className="rounded-xl border border-white/[0.05] bg-white/[0.03] px-2.5 py-2.5 sm:px-3 sm:py-3"
                        >
                            <p className="text-base font-semibold tracking-tight text-white sm:text-lg">{m.value}</p>
                            <p className="mt-0.5 text-[10px] text-zinc-500">{m.label}</p>
                            <svg viewBox="0 0 48 16" className="mt-2 h-3.5 w-full" aria-hidden>
                                <path
                                    d={sparkPath(m.spark)}
                                    fill="none"
                                    stroke={sparkStroke[m.tone]}
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    ))}
                </div>

                {/* Volume overview chart */}
                <div className="mt-5 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 sm:mt-6 sm:p-4">
                    <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm font-medium text-zinc-200">Volume overview</p>
                        <div className="flex flex-wrap items-center gap-3 text-[10px] text-zinc-500 sm:gap-4">
                            <span className="inline-flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-indigo-400" />
                                Volume
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                Avg. open rate
                            </span>
                        </div>
                    </div>

                    <div className="relative -mx-1 overflow-x-auto sm:mx-0">
                        <div className="min-w-[320px] sm:min-w-0">
                            <svg
                                viewBox={`0 0 ${chart.w} ${chart.h}`}
                                className="h-40 w-full sm:h-48"
                                role="img"
                                aria-label="Email volume and open rate over nine days"
                            >
                                <defs>
                                    <linearGradient id="volFillHero" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#818CF8" stopOpacity="0.4" />
                                        <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
                                    </linearGradient>
                                    <filter id="volGlow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur stdDeviation="2" result="blur" />
                                        <feMerge>
                                            <feMergeNode in="blur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {/* Grid */}
                                {yLeft.map((label, i) => {
                                    const y = chart.padT + chart.plotH - (label / 12) * chart.plotH;
                                    return (
                                        <g key={label}>
                                            <line
                                                x1={chart.padL}
                                                y1={y}
                                                x2={chart.w - chart.padR}
                                                y2={y}
                                                stroke="rgba(255,255,255,0.06)"
                                                strokeWidth="1"
                                            />
                                            <text x={chart.padL - 8} y={y + 3} textAnchor="end" fill="#52525b" fontSize="9">
                                                {label === 0 ? '0' : `${label}k`}
                                            </text>
                                            <text x={chart.w - chart.padR + 8} y={y + 3} textAnchor="start" fill="#52525b" fontSize="9">
                                                {yRight[i]}%
                                            </text>
                                        </g>
                                    );
                                })}

                                <path d={chart.volumeArea} fill="url(#volFillHero)" />
                                <path
                                    d={chart.volumeLine}
                                    fill="none"
                                    stroke="#818CF8"
                                    strokeWidth="2.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    filter="url(#volGlow)"
                                />
                                <path
                                    d={chart.openLine}
                                    fill="none"
                                    stroke="#4ADE80"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                {chart.volumeDots.map((d, i) => (
                                    <circle key={`v-${i}`} cx={d.x} cy={d.y} r="3.5" fill="#0a0a0a" stroke="#818CF8" strokeWidth="2" />
                                ))}
                                {chart.openDots.map((d, i) => (
                                    <circle key={`o-${i}`} cx={d.x} cy={d.y} r="3" fill="#0a0a0a" stroke="#4ADE80" strokeWidth="1.75" />
                                ))}

                                {DAYS.map((day, i) => (
                                    <text
                                        key={`${day}-${i}`}
                                        x={chart.padL + (i / (DAYS.length - 1)) * chart.plotW}
                                        y={chart.h - 8}
                                        textAnchor="middle"
                                        fill="#52525b"
                                        fontSize="9"
                                    >
                                        {day}
                                    </text>
                                ))}
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Footer summary */}
                <div className="mt-4 flex flex-col gap-3 border-t border-white/[0.06] pt-3.5 text-[11px] text-zinc-500 sm:mt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-4">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span>
                            Volume Peak <span className="text-zinc-300">9.1k · Tue</span>
                        </span>
                        <span className="hidden text-white/20 sm:inline">·</span>
                        <span>
                            Avg open rate <span className="text-zinc-300">68%</span>
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 sm:gap-x-4">
                        <span>
                            Sent <span className="text-zinc-300">48.2k</span>
                        </span>
                        <span>
                            Bounced <span className="text-zinc-300">0.4%</span>
                        </span>
                        <span>
                            Complaints <span className="text-zinc-300">0.02%</span>
                        </span>
                        <span className="hidden sm:inline">
                            Unsubscribed <span className="text-zinc-300">0.3%</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
