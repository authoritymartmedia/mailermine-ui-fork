import { cn } from '@/lib/utils';
import { AnalyticsDashboardPreview } from '@/Components/Website/AnalyticsDashboardPreview';

interface FeaturePreviewProps {
    type: string;
    className?: string;
    size?: 'compact' | 'large';
}

function MiniBars({
    values,
    color = '#818CF8',
    height = 28,
}: {
    values: number[];
    color?: string;
    height?: number;
}) {
    const max = Math.max(...values, 1);
    return (
        <div className="flex h-full items-end gap-0.5" style={{ height }}>
            {values.map((v, i) => (
                <div
                    key={i}
                    className="w-full rounded-sm"
                    style={{
                        height: `${Math.max(12, (v / max) * 100)}%`,
                        backgroundColor: color,
                        opacity: 0.35 + (v / max) * 0.65,
                    }}
                />
            ))}
        </div>
    );
}

function Sparkline({
    values,
    color,
    width = 56,
    height = 18,
}: {
    values: number[];
    color: string;
    width?: number;
    height?: number;
}) {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const d = values
        .map((v, i) => {
            const x = (i / (values.length - 1)) * width;
            const y = height - ((v - min) / range) * (height - 2) - 1;
            return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
        })
        .join(' ');

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
            <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export function FeaturePreview({ type, className, size = 'compact' }: FeaturePreviewProps) {
    const large = size === 'large';
    const previewClass = cn(
        'feature-preview w-full overflow-hidden bg-[#0a0a0a]',
        large
            ? 'rounded-none border-0'
            : 'mt-6 rounded-xl border border-white/[0.04]',
        className,
    );
    const pad = large ? 'p-4' : 'p-3';
    const padHeader = large ? 'px-4 py-3' : 'px-3 py-2';
    const text = large ? 'text-xs' : 'text-[10px]';
    const textSm = large ? 'text-[11px]' : 'text-[10px]';
    const badge = large ? 'text-[10px]' : 'text-[9px]';

    switch (type) {
        case 'transactional': {
            const rows = [
                { label: 'Welcome email', to: 'sarah@acme.io', status: 'delivered', tone: 'emerald' as const, time: '2s ago', events: ['queued', 'sent', 'delivered'] },
                { label: 'Password reset', to: 'marcus@stack.io', status: 'delivered', tone: 'emerald' as const, time: '14s ago', events: ['queued', 'sent', 'delivered', 'opened'] },
                { label: 'Receipt #4821', to: 'alex@devmail.com', status: 'queued', tone: 'amber' as const, time: 'now', events: ['queued'] },
                ...(large
                    ? [
                        { label: 'Order confirmation', to: 'jordan@launch.io', status: 'delivered', tone: 'emerald' as const, time: '1m ago', events: ['queued', 'sent', 'delivered'] },
                        { label: 'Shipping update', to: 'priya@scale.dev', status: 'sent', tone: 'zinc' as const, time: '3m ago', events: ['queued', 'sent'] },
                    ]
                    : []),
            ];

            return (
                <div className={previewClass}>
                    <div className={cn('flex items-center justify-between border-b border-white/[0.04]', padHeader)}>
                        <div>
                            <p className={cn(textSm, 'font-medium text-zinc-300')}>Email logs</p>
                            <p className={cn(badge, 'font-mono text-zinc-600')}>GET /v1/emails</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={cn(badge, 'rounded-md bg-white/[0.04] px-2 py-0.5 text-zinc-500')}>Today</span>
                            <span className={cn(badge, 'rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-400')}>1,248 sent</span>
                        </div>
                    </div>
                    <div className={cn(pad, 'space-y-2')}>
                        {large && (
                            <div className="mb-1 grid grid-cols-3 gap-2">
                                {[
                                    { label: 'Delivered', value: '99.2%', spark: [88, 90, 92, 94, 95, 97, 99], color: '#4ADE80' },
                                    { label: 'Avg latency', value: '1.4s', spark: [2.1, 1.9, 1.7, 1.6, 1.5, 1.4, 1.4], color: '#818CF8' },
                                    { label: 'Failed', value: '0.2%', spark: [0.8, 0.6, 0.5, 0.4, 0.3, 0.2, 0.2], color: '#F87171' },
                                ].map((m) => (
                                    <div key={m.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-2">
                                        <div className="flex items-start justify-between gap-1">
                                            <div>
                                                <p className={cn(badge, 'text-zinc-600')}>{m.label}</p>
                                                <p className={cn('mt-0.5 font-medium tabular-nums text-zinc-200', large ? 'text-sm' : 'text-xs')}>{m.value}</p>
                                            </div>
                                            <Sparkline values={m.spark} color={m.color} width={40} height={14} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {rows.map((row) => (
                            <div key={row.label} className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-2.5 py-2">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="min-w-0">
                                        <p className={cn(textSm, 'truncate text-zinc-300')}>{row.label}</p>
                                        <p className={cn(badge, 'truncate font-mono text-zinc-600')}>{row.to}</p>
                                    </div>
                                    <div className="flex shrink-0 flex-col items-end gap-1">
                                        <span className={cn(
                                            'rounded-full px-1.5 py-0.5',
                                            badge,
                                            row.tone === 'emerald' && 'bg-emerald-500/15 text-emerald-400',
                                            row.tone === 'amber' && 'bg-amber-500/15 text-amber-400',
                                            row.tone === 'zinc' && 'bg-white/[0.06] text-zinc-500',
                                        )}>
                                            {row.status}
                                        </span>
                                        <span className={cn(badge, 'text-zinc-600')}>{row.time}</span>
                                    </div>
                                </div>
                                {large && (
                                    <div className="mt-2 flex items-center gap-1">
                                        {row.events.map((e, i) => (
                                            <div key={e} className="flex items-center gap-1">
                                                <span className={cn(
                                                    'rounded px-1.5 py-0.5',
                                                    badge,
                                                    i === row.events.length - 1 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/[0.04] text-zinc-600',
                                                )}>
                                                    {e}
                                                </span>
                                                {i < row.events.length - 1 && <span className="text-[8px] text-zinc-700">→</span>}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        case 'campaigns': {
            const steps = [
                { label: 'Audience', done: true },
                { label: 'Design', done: true },
                { label: 'Schedule', done: true },
                { label: 'Review', done: false },
            ];
            const funnel = [
                { label: 'Audience', value: '12.4k', pct: 100 },
                { label: 'Delivered', value: '12.1k', pct: 97 },
                { label: 'Opened', value: '5.8k', pct: 47 },
                { label: 'Clicked', value: '1.4k', pct: 11 },
            ];

            return (
                <div className={previewClass}>
                    <div className={cn('flex items-center justify-between border-b border-white/[0.04]', padHeader)}>
                        <div>
                            <p className={cn(textSm, 'font-medium text-zinc-300')}>Campaign dashboard</p>
                            <p className={cn(badge, 'text-zinc-600')}>Product launch · Newsletter</p>
                        </div>
                        <span className={cn(badge, 'rounded-full bg-amber-500/10 px-2 py-0.5 text-amber-400')}>Draft</span>
                    </div>
                    <div className={cn(pad, 'space-y-3')}>
                        <div className="flex items-center gap-1.5">
                            {steps.map((step, i) => (
                                <div key={step.label} className="flex min-w-0 flex-1 items-center gap-1.5">
                                    <div className={cn(
                                        'flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-medium',
                                        step.done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/[0.06] text-zinc-500',
                                    )}>
                                        {step.done ? '✓' : i + 1}
                                    </div>
                                    <span className={cn(badge, 'truncate', step.done ? 'text-zinc-400' : 'text-zinc-600')}>{step.label}</span>
                                    {i < steps.length - 1 && <div className="mx-0.5 h-px flex-1 bg-white/[0.06]" />}
                                </div>
                            ))}
                        </div>

                        <div className={cn('rounded-xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-3', large ? 'min-h-[88px]' : 'min-h-[64px]')}>
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0 flex-1">
                                    <div className="h-2.5 w-3/4 rounded bg-white/15" />
                                    <div className="mt-2 h-1.5 w-1/2 rounded bg-white/[0.07]" />
                                    {large && (
                                        <>
                                            <div className="mt-3 space-y-1.5">
                                                <div className="h-1.5 w-full rounded bg-white/[0.05]" />
                                                <div className="h-1.5 w-5/6 rounded bg-white/[0.04]" />
                                            </div>
                                            <div className="mt-3 h-7 w-28 rounded-full bg-white/10" />
                                        </>
                                    )}
                                </div>
                                {large && (
                                    <div className="w-20 shrink-0">
                                        <MiniBars values={[42, 58, 51, 72, 64, 81, 70]} color="#818CF8" height={52} />
                                        <p className={cn(badge, 'mt-1 text-center text-zinc-600')}>7d sends</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                            <span className={cn('rounded-md bg-white/[0.05] px-1.5 py-0.5 text-zinc-500', badge)}>12.4k recipients</span>
                            <span className={cn('rounded-md bg-white/[0.05] px-1.5 py-0.5 text-zinc-500', badge)}>Mon 9:00 AM</span>
                            <span className={cn('rounded-md bg-white/[0.05] px-1.5 py-0.5 text-zinc-500', badge)}>Active subscribers</span>
                        </div>

                        {large && (
                            <div className="space-y-2 border-t border-white/[0.04] pt-3">
                                <p className={cn(badge, 'uppercase tracking-wider text-zinc-600')}>Projected funnel</p>
                                {funnel.map((f) => (
                                    <div key={f.label}>
                                        <div className="mb-1 flex items-center justify-between">
                                            <span className={cn(badge, 'text-zinc-500')}>{f.label}</span>
                                            <span className={cn(badge, 'tabular-nums text-zinc-400')}>{f.value}</span>
                                        </div>
                                        <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                                            <div className="h-full rounded-full bg-indigo-400/80" style={{ width: `${f.pct}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        case 'contacts': {
            const contacts = [
                { name: 'Sarah Chen', email: 'sarah@acme.io', tags: ['customer', 'pro'], status: 'subscribed' },
                { name: 'Marcus Webb', email: 'marcus@stack.io', tags: ['trial'], status: 'subscribed' },
                { name: 'Alex Rivera', email: 'alex@devmail.com', tags: ['newsletter'], status: 'subscribed' },
                ...(large
                    ? [
                        { name: 'Jordan Lee', email: 'jordan@launch.io', tags: ['customer'], status: 'subscribed' },
                        { name: 'Priya Patel', email: 'priya@scale.dev', tags: ['vip', 'pro'], status: 'subscribed' },
                    ]
                    : []),
            ];

            return (
                <div className={previewClass}>
                    <div className={cn('flex items-center justify-between border-b border-white/[0.04]', padHeader)}>
                        <div>
                            <p className={cn(textSm, 'font-medium text-zinc-300')}>Contacts</p>
                            <p className={cn(badge, 'text-zinc-600')}>48,291 total · 312 imported today</p>
                        </div>
                        <span className={cn(badge, 'rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-400')}>+2.4%</span>
                    </div>
                    <div className={cn(pad, 'space-y-3')}>
                        {large && (
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { label: 'Subscribed', value: '46.1k' },
                                    { label: 'Unsubscribed', value: '1.8k' },
                                    { label: 'Suppressed', value: '382' },
                                ].map((m) => (
                                    <div key={m.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-2 text-center">
                                        <p className={cn('font-medium tabular-nums text-zinc-200', textSm)}>{m.value}</p>
                                        <p className={cn(badge, 'mt-0.5 text-zinc-600')}>{m.label}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="overflow-hidden rounded-xl border border-white/[0.05]">
                            <div className={cn('flex items-center gap-2 border-b border-white/[0.04] bg-white/[0.02]', large ? 'px-3 py-2' : 'px-2.5 py-1.5')}>
                                <div className="h-2 w-2/5 rounded bg-white/[0.06]" />
                                <span className={cn(badge, 'ml-auto text-zinc-600')}>Search · Filter</span>
                            </div>
                            <div className="divide-y divide-white/[0.04]">
                                {contacts.map((c) => (
                                    <div key={c.email} className={cn('flex items-center gap-2.5', large ? 'px-3 py-2.5' : 'px-2.5 py-2')}>
                                        <div className={cn(
                                            'flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-white/15 to-white/[0.04] font-medium text-zinc-300',
                                            large ? 'h-8 w-8 text-[10px]' : 'h-6 w-6 text-[9px]',
                                        )}>
                                            {c.name.split(' ').map((n) => n[0]).join('')}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                                                <p className={cn('truncate text-zinc-300', textSm)}>{c.name}</p>
                                                <span className={cn(badge, 'hidden shrink-0 rounded bg-emerald-500/10 px-1.5 py-0.5 text-emerald-400 sm:inline')}>
                                                    {c.status}
                                                </span>
                                            </div>
                                            <p className={cn('truncate text-zinc-600', badge)}>{c.email}</p>
                                        </div>
                                        <div className="hidden flex-wrap justify-end gap-1 sm:flex">
                                            {c.tags.map((t) => (
                                                <span key={t} className={cn('rounded bg-white/[0.05] px-1.5 py-0.5 text-zinc-500', badge)}>{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {large && (
                            <div className="flex items-center justify-between rounded-lg border border-dashed border-white/[0.08] bg-white/[0.02] px-3 py-2">
                                <div>
                                    <p className={cn(textSm, 'text-zinc-400')}>CSV import ready</p>
                                    <p className={cn(badge, 'text-zinc-600')}>field mapping · duplicate handling</p>
                                </div>
                                <span className={cn(badge, 'rounded-full bg-white/[0.06] px-2 py-1 text-zinc-300')}>Import</span>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        case 'audiences': {
            const rules = [
                { op: 'tag', value: 'customer' },
                { op: 'AND', value: 'opened last 30d' },
                { op: 'AND', value: 'plan = pro' },
            ];

            return (
                <div className={previewClass}>
                    <div className={cn('flex items-center justify-between border-b border-white/[0.04]', padHeader)}>
                        <div>
                            <p className={cn(textSm, 'font-medium text-zinc-300')}>Active subscribers</p>
                            <p className={cn(badge, 'text-zinc-600')}>Dynamic segment</p>
                        </div>
                        <span className={cn(badge, 'flex items-center gap-1 text-emerald-400')}>
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            live
                        </span>
                    </div>
                    <div className={cn(pad, 'space-y-3')}>
                        <div className="space-y-2">
                            {rules.map((r) => (
                                <div key={r.value} className="flex items-center gap-2">
                                    {r.op !== 'tag' && (
                                        <span className={cn('rounded bg-indigo-500/15 px-1.5 py-0.5 font-mono text-indigo-300', badge)}>{r.op}</span>
                                    )}
                                    <div className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-2">
                                        <p className={cn(textSm, 'text-zinc-300')}>{r.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-end justify-between gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                            <div>
                                <p className={cn(badge, 'uppercase tracking-wider text-zinc-600')}>Matches</p>
                                <p className={cn('mt-1 font-semibold tabular-nums text-white', large ? 'text-2xl' : 'text-lg')}>8,421</p>
                                <p className={cn(badge, 'mt-1 text-emerald-400')}>↑ 186 this week</p>
                            </div>
                            {large && (
                                <div className="w-28">
                                    <MiniBars values={[32, 40, 38, 52, 48, 61, 58, 70]} color="#4ADE80" height={40} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        case 'templates': {
            return (
                <div className={previewClass}>
                    <div className={cn('flex items-center justify-between border-b border-white/[0.04]', padHeader)}>
                        <div className="flex items-center gap-2">
                            <span className={cn(textSm, 'font-medium text-zinc-300')}>Email Studio</span>
                            <span className={cn(badge, 'rounded bg-white/[0.05] px-1.5 py-0.5 text-zinc-500')}>Visual</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className={cn(badge, 'rounded-md bg-white/[0.04] px-2 py-0.5 text-zinc-500')}>Desktop</span>
                            <span className={cn(badge, 'rounded-md bg-white/[0.04] px-2 py-0.5 text-zinc-600')}>Mobile</span>
                        </div>
                    </div>
                    <div className={cn(pad, large ? 'grid grid-cols-[1fr_1.2fr] gap-3' : 'space-y-3')}>
                        {large && (
                            <div className="space-y-1.5 rounded-xl border border-white/[0.05] bg-white/[0.02] p-2">
                                <p className={cn(badge, 'mb-1 px-1 text-zinc-600')}>Blocks</p>
                                {['Header', 'Hero', 'Features', 'CTA', 'Footer'].map((b, i) => (
                                    <div
                                        key={b}
                                        className={cn(
                                            'rounded-md px-2 py-1.5',
                                            i === 1 ? 'border border-amber-500/30 bg-amber-500/10' : 'bg-white/[0.03]',
                                        )}
                                    >
                                        <p className={cn(badge, i === 1 ? 'text-amber-300' : 'text-zinc-500')}>{b}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="space-y-3">
                            <div className="rounded-xl border border-white/[0.06] bg-[#111] p-3">
                                <div className="mx-auto max-w-[220px] space-y-2.5">
                                    <div className="h-2 w-16 rounded bg-white/10" />
                                    <div className="h-3 w-3/4 rounded bg-white/15" />
                                    <div className="h-1.5 w-full rounded bg-white/[0.06]" />
                                    <div className="h-1.5 w-5/6 rounded bg-white/[0.05]" />
                                    {large && (
                                        <div className="grid grid-cols-2 gap-1.5 pt-1">
                                            <div className="h-10 rounded-md bg-white/[0.04]" />
                                            <div className="h-10 rounded-md bg-white/[0.04]" />
                                        </div>
                                    )}
                                    <div className="h-7 w-28 rounded-full bg-white/15" />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {['{{ name }}', '{{ company }}', '{{ cta_url }}'].map((v) => (
                                    <span key={v} className="rounded bg-amber-500/10 px-1.5 py-0.5 font-mono text-[8px] text-amber-400/80">
                                        {v}
                                    </span>
                                ))}
                            </div>
                            {large && (
                                <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-2">
                                    <div>
                                        <p className={cn(badge, 'text-zinc-500')}>Live preview · Test send</p>
                                        <p className={cn(textSm, 'text-zinc-300')}>Welcome to {'{{ company }}'}</p>
                                    </div>
                                    <span className={cn(badge, 'rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-400')}>Ready</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        case 'webhooks': {
            const events = [
                { event: 'email.delivered', status: 200, latency: '42ms', color: '#34d399' },
                { event: 'email.opened', status: 200, latency: '38ms', color: '#60a5fa' },
                { event: 'email.clicked', status: 200, latency: '51ms', color: '#c084fc' },
                ...(large
                    ? [
                        { event: 'email.bounced', status: 200, latency: '61ms', color: '#f87171' },
                        { event: 'email.complained', status: 200, latency: '44ms', color: '#fbbf24' },
                    ]
                    : []),
            ];

            return (
                <div className={previewClass}>
                    <div className={cn('flex items-center justify-between border-b border-white/[0.04]', padHeader)}>
                        <div>
                            <p className={cn(textSm, 'font-medium text-zinc-300')}>Webhook deliveries</p>
                            <p className={cn(badge, 'font-mono text-zinc-600')}>https://api.acme.io/hooks</p>
                        </div>
                        <span className={cn(badge, 'rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-400')}>Healthy</span>
                    </div>
                    <div className={cn(pad, 'space-y-3')}>
                        {large && (
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { label: 'Success', value: '99.6%' },
                                    { label: 'p95 latency', value: '58ms' },
                                    { label: 'Retries', value: '3x' },
                                ].map((m) => (
                                    <div key={m.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-2 text-center">
                                        <p className={cn('font-medium tabular-nums text-zinc-200', textSm)}>{m.value}</p>
                                        <p className={cn(badge, 'mt-0.5 text-zinc-600')}>{m.label}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="space-y-1.5">
                            {events.map((e) => (
                                <div key={e.event} className="flex items-center gap-2 rounded-lg border border-white/[0.05] bg-white/[0.02] px-2.5 py-2">
                                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: e.color }} />
                                    <span className={cn('min-w-0 flex-1 truncate font-mono text-zinc-400', badge)}>{e.event}</span>
                                    <span className={cn(badge, 'tabular-nums text-zinc-600')}>{e.latency}</span>
                                    <span className={cn(badge, 'rounded bg-emerald-500/10 px-1.5 py-0.5 text-emerald-400')}>{e.status}</span>
                                </div>
                            ))}
                        </div>
                        {large && (
                            <div className="flex items-center justify-between border-t border-white/[0.04] pt-2">
                                <span className={cn(badge, 'text-zinc-600')}>HMAC signed · automatic backoff</span>
                                <span className={cn(badge, 'text-zinc-500')}>Replay available</span>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        case 'analytics':
            return (
                <AnalyticsDashboardPreview
                    className={large ? undefined : className}
                    compact={!large}
                />
            );

        case 'domains': {
            const records = [
                { type: 'SPF', host: '@', value: 'v=spf1 include:mailermine…', status: 'verified' },
                { type: 'DKIM', host: 'mm._domainkey', value: 'v=DKIM1; k=rsa; p=MIIB…', status: 'verified' },
                { type: 'DMARC', host: '_dmarc', value: 'v=DMARC1; p=none; rua=…', status: 'verified' },
            ];

            return (
                <div className={previewClass}>
                    <div className={cn('flex items-center justify-between border-b border-white/[0.04]', padHeader)}>
                        <div>
                            <p className={cn(textSm, 'font-medium text-zinc-300')}>mailermine.dev</p>
                            <p className={cn(badge, 'text-zinc-600')}>Sending domain · DNS setup</p>
                        </div>
                        <span className={cn(badge, 'rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-400')}>Verified</span>
                    </div>
                    <div className={cn(pad, 'space-y-3')}>
                        {large && (
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { label: 'Reputation', value: '98' },
                                    { label: 'Inbox', value: '96%' },
                                    { label: 'Bounce', value: '0.3%' },
                                ].map((m) => (
                                    <div key={m.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-2 text-center">
                                        <p className={cn('font-medium tabular-nums text-zinc-200', textSm)}>{m.value}</p>
                                        <p className={cn(badge, 'mt-0.5 text-zinc-600')}>{m.label}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="space-y-2">
                            {records.map((r) => (
                                <div key={r.type} className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-2.5 py-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className={cn('rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-zinc-300', badge)}>{r.type}</span>
                                            {large && <span className={cn(badge, 'font-mono text-zinc-600')}>{r.host}</span>}
                                        </div>
                                        <span className={cn(badge, 'text-emerald-400')}>✓ verified</span>
                                    </div>
                                    {large && (
                                        <p className={cn('mt-1.5 truncate font-mono text-zinc-600', badge)}>{r.value}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                        {large && (
                            <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
                                <p className={cn(badge, 'text-zinc-500')}>Last checked 4m ago</p>
                                <span className={cn(badge, 'rounded-md bg-white/[0.05] px-2 py-1 text-zinc-300')}>Re-verify</span>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        case 'apikeys': {
            const keys = [
                { name: 'Production', prefix: 'mm_live_••••••••3f2a', scope: 'full', last: '2m ago', active: true },
                ...(large
                    ? [
                        { name: 'Staging', prefix: 'mm_test_••••••••9c1b', scope: 'send', last: '1h ago', active: true },
                        { name: 'CI pipeline', prefix: 'mm_test_••••••••a04e', scope: 'read', last: '3d ago', active: false },
                    ]
                    : [
                        { name: 'Staging', prefix: 'mm_test_••••••••9c1b', scope: 'send', last: '1h ago', active: true },
                    ]),
            ];

            return (
                <div className={previewClass}>
                    <div className={cn('flex items-center justify-between border-b border-white/[0.04]', padHeader)}>
                        <div>
                            <p className={cn(textSm, 'font-medium text-zinc-300')}>API keys</p>
                            <p className={cn(badge, 'text-zinc-600')}>Project-scoped · rotatable</p>
                        </div>
                        <span className={cn(badge, 'rounded-full bg-white/[0.05] px-2 py-0.5 text-zinc-300')}>+ Create</span>
                    </div>
                    <div className={cn(pad, 'space-y-3')}>
                        {large && (
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { label: 'Requests today', value: '84.2k' },
                                    { label: 'Error rate', value: '0.08%' },
                                    { label: 'Active keys', value: '2' },
                                ].map((m) => (
                                    <div key={m.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-2 text-center">
                                        <p className={cn('font-medium tabular-nums text-zinc-200', textSm)}>{m.value}</p>
                                        <p className={cn(badge, 'mt-0.5 text-zinc-600')}>{m.label}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="space-y-2">
                            {keys.map((k) => (
                                <div key={k.name} className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-2.5 py-2.5">
                                    <div className="flex items-center justify-between gap-2">
                                        <div>
                                            <p className={cn(textSm, 'text-zinc-300')}>{k.name}</p>
                                            <p className={cn('mt-1 font-mono text-zinc-500', badge)}>{k.prefix}</p>
                                        </div>
                                        <span className={cn(
                                            'rounded-full px-1.5 py-0.5',
                                            badge,
                                            k.active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/[0.06] text-zinc-500',
                                        )}>
                                            {k.active ? 'active' : 'revoked'}
                                        </span>
                                    </div>
                                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                                        <span className={cn('rounded bg-white/[0.05] px-1.5 py-0.5 text-zinc-500', badge)}>scope: {k.scope}</span>
                                        <span className={cn('rounded bg-white/[0.05] px-1.5 py-0.5 text-zinc-500', badge)}>last used {k.last}</span>
                                        {large && k.active && (
                                            <Sparkline
                                                values={k.name === 'Production' ? [20, 28, 24, 40, 36, 48, 52] : [8, 10, 7, 12, 9, 11, 10]}
                                                color={k.name === 'Production' ? '#4ADE80' : '#818CF8'}
                                                width={48}
                                                height={14}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        case 'deliverability':
            return (
                <div className={previewClass}>
                    <div className={cn('flex items-center justify-between border-b border-white/[0.04]', padHeader)}>
                        <div>
                            <p className={cn(textSm, 'font-medium text-zinc-300')}>Deliverability</p>
                            <p className={cn(badge, 'text-zinc-600')}>Reputation & inbox placement</p>
                        </div>
                        <span className={cn(badge, 'rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-400')}>Healthy</span>
                    </div>
                    <div className={cn(large ? 'grid grid-cols-2 gap-4 p-4' : 'flex items-center justify-center p-4')}>
                        <div className={cn('relative', large ? 'flex items-center justify-center' : '')}>
                            <svg viewBox="0 0 80 44" className={large ? 'h-20 w-32' : 'h-16 w-28'}>
                                <path
                                    d="M 8 40 A 32 32 0 0 1 72 40"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.06)"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M 8 40 A 32 32 0 0 1 62 18"
                                    fill="none"
                                    stroke="url(#gauge-gradient)"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                />
                                <defs>
                                    <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#34d399" />
                                        <stop offset="100%" stopColor="#fbbf24" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-x-0 bottom-0 text-center">
                                <p className={cn('font-medium text-white', large ? 'text-2xl' : 'text-lg')}>98</p>
                                <p className={cn('text-zinc-600', badge)}>reputation</p>
                            </div>
                        </div>
                        {large && (
                            <div className="flex flex-col justify-center space-y-2">
                                {[
                                    { label: 'Bounce rate', value: '0.3%' },
                                    { label: 'Complaints', value: '0.01%' },
                                    { label: 'Inbox placement', value: '96%' },
                                ].map((s) => (
                                    <div key={s.label} className="flex items-center justify-between rounded-md bg-white/[0.03] px-3 py-2">
                                        <span className={cn(text, 'text-zinc-500')}>{s.label}</span>
                                        <span className={cn(textSm, 'text-zinc-300')}>{s.value}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            );

        case 'ai-campaign': {
            const categories = [
                { label: 'Deliverability', score: 92 },
                { label: 'Spam risk', score: 88 },
                { label: 'CTA quality', score: 81 },
                { label: 'Readability', score: 86 },
                ...(large
                    ? [
                        { label: 'Personalization', score: 74 },
                        { label: 'Mobile', score: 90 },
                    ]
                    : []),
            ];
            const predictions = [
                { label: 'OPEN', value: '41%' },
                { label: 'CTR', value: '6.2%' },
                { label: 'INBOX', value: '97%' },
            ];
            const r = 42;
            const c = 2 * Math.PI * r;
            const score = 87;
            const offset = c - (score / 100) * c;
            const uid = 'ai-campaign-ring';

            return (
                <div className={previewClass}>
                    <div className={cn('flex items-center justify-between border-b border-white/[0.04]', padHeader)}>
                        <div className="flex items-center gap-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/15 text-[10px] text-emerald-400">✦</span>
                            <span className={cn(textSm, 'font-medium text-zinc-300')}>AI Email Intelligence</span>
                        </div>
                        <span className={cn(badge, 'rounded-full bg-emerald-500/10 px-2 py-0.5 text-emerald-400')}>
                            Strong send
                        </span>
                    </div>
                    <div className={cn(pad, large ? 'space-y-4' : 'space-y-3')}>
                        <div className={cn('flex gap-4', large ? 'items-start' : 'items-center')}>
                            <div className={cn('relative shrink-0', large ? 'h-28 w-28' : 'h-20 w-20')}>
                                <svg className="h-full w-full -rotate-90" viewBox="0 0 112 112" aria-hidden>
                                    <circle cx="56" cy="56" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                                    <circle
                                        cx="56"
                                        cy="56"
                                        r={r}
                                        fill="none"
                                        stroke={`url(#${uid})`}
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        strokeDasharray={c}
                                        strokeDashoffset={offset}
                                    />
                                    <defs>
                                        <linearGradient id={uid} x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#22C55E" />
                                            <stop offset="100%" stopColor="#4ADE80" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className={cn('font-semibold tabular-nums text-emerald-400', large ? 'text-2xl' : 'text-lg')}>{score}</span>
                                    <span className={cn('uppercase tracking-wider text-zinc-600', badge)}>/ 100</span>
                                </div>
                            </div>
                            <div className="min-w-0 flex-1 space-y-2">
                                {categories.map((cat) => {
                                    const barTone = cat.score >= 80 ? 'bg-emerald-500' : cat.score >= 60 ? 'bg-amber-500' : 'bg-rose-500';
                                    return (
                                        <div key={cat.label}>
                                            <div className="mb-1 flex items-center justify-between">
                                                <span className={cn(badge, 'text-zinc-500')}>{cat.label}</span>
                                                <span className={cn(badge, 'tabular-nums text-zinc-400')}>{cat.score}</span>
                                            </div>
                                            <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                                                <div className={cn('h-full rounded-full', barTone)} style={{ width: `${cat.score}%` }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {predictions.map((p) => (
                                <div key={p.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-2 text-center">
                                    <p className={cn(badge, 'tracking-wider text-zinc-600')}>{p.label}</p>
                                    <p className={cn('mt-0.5 font-medium tabular-nums text-zinc-200', large ? 'text-sm' : 'text-xs')}>{p.value}</p>
                                </div>
                            ))}
                        </div>
                        {large && (
                            <div className="space-y-1.5 border-t border-white/[0.04] pt-3">
                                {[
                                    { tone: 'emerald', text: 'Clear primary CTA above the fold' },
                                    { tone: 'amber', text: 'Add preview text to lift opens ~3–5%' },
                                ].map((s) => (
                                    <div key={s.text} className="flex items-start gap-2">
                                        <span
                                            className={cn(
                                                'mt-1 h-1.5 w-1.5 shrink-0 rounded-full',
                                                s.tone === 'emerald' ? 'bg-emerald-400' : 'bg-amber-400',
                                            )}
                                        />
                                        <span className={cn(text, 'text-zinc-500')}>{s.text}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        case 'ai-templates': {
            const score = 91;
            const r = 28;
            const circ = 2 * Math.PI * r;
            const offset = circ - (score / 100) * circ;
            const uid = 'ai-template-ring';

            return (
                <div className={previewClass}>
                    <div className={cn('flex items-center justify-between border-b border-white/[0.04]', padHeader)}>
                        <div className="flex items-center gap-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-500/15 text-[10px] text-amber-400">✦</span>
                            <span className={cn(textSm, 'font-medium text-zinc-300')}>Generate with AI</span>
                        </div>
                        <span className={cn(badge, 'text-zinc-600')}>Email Studio</span>
                    </div>
                    <div className={cn(pad, 'space-y-3')}>
                        <div className="rounded-lg border border-white/[0.06] bg-[#111] p-2.5">
                            <p className={cn(badge, 'mb-1.5 text-zinc-600')}>Prompt</p>
                            <p className={cn(textSm, 'leading-relaxed text-zinc-400')}>
                                Modern SaaS welcome — dark theme, hero, feature cards, strong CTA
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {['Professional', 'Dark', 'Welcome', 'CTA'].map((chip) => (
                                <span
                                    key={chip}
                                    className={cn('rounded-md border border-white/[0.06] bg-white/[0.03] px-1.5 py-0.5 text-zinc-500', badge)}
                                >
                                    {chip}
                                </span>
                            ))}
                        </div>
                        <div className={cn('grid gap-2', large ? 'grid-cols-[1fr_auto]' : 'grid-cols-1')}>
                            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
                                <div className="h-2 w-2/3 rounded bg-white/10" />
                                <div className="mt-2 h-1.5 w-full rounded bg-white/[0.05]" />
                                <div className="mt-1.5 h-1.5 w-4/5 rounded bg-white/[0.04]" />
                                {large && (
                                    <>
                                        <div className="mt-3 grid grid-cols-2 gap-1.5">
                                            <div className="h-8 rounded bg-white/[0.04]" />
                                            <div className="h-8 rounded bg-white/[0.04]" />
                                        </div>
                                        <div className="mt-2 h-6 w-24 rounded-full bg-white/10" />
                                    </>
                                )}
                            </div>
                            {large && (
                                <div className="flex flex-col items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
                                    <div className="relative h-16 w-16">
                                        <svg className="h-full w-full -rotate-90" viewBox="0 0 72 72" aria-hidden>
                                            <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
                                            <circle
                                                cx="36"
                                                cy="36"
                                                r={r}
                                                fill="none"
                                                stroke={`url(#${uid})`}
                                                strokeWidth="5"
                                                strokeLinecap="round"
                                                strokeDasharray={circ}
                                                strokeDashoffset={offset}
                                            />
                                            <defs>
                                                <linearGradient id={uid} x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#EAB308" />
                                                    <stop offset="100%" stopColor="#4ADE80" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-sm font-semibold tabular-nums text-emerald-400">{score}</span>
                                        </div>
                                    </div>
                                    <p className={cn(badge, 'mt-1 text-zinc-600')}>score</p>
                                </div>
                            )}
                        </div>
                        {large && (
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { label: 'Improve', hint: 'CTA · tone' },
                                    { label: 'Subjects', hint: '10 ideas' },
                                    { label: 'Variables', hint: '3 detected' },
                                ].map((a) => (
                                    <div key={a.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-2 text-center">
                                        <p className={cn(textSm, 'text-zinc-300')}>{a.label}</p>
                                        <p className={cn(badge, 'mt-0.5 text-zinc-600')}>{a.hint}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex flex-wrap gap-1.5">
                            {['{{ first_name }}', '{{ company }}', '{{ cta_url }}'].map((v) => (
                                <span key={v} className="rounded bg-amber-500/10 px-1.5 py-0.5 font-mono text-[8px] text-amber-400/80">
                                    {v}
                                </span>
                            ))}
                            {!large && (
                                <span className={cn(badge, 'ml-auto tabular-nums text-emerald-400')}>score {score}</span>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        default:
            return <div className={`${previewClass} h-32 bg-gradient-to-br from-white/[0.04] to-transparent`} />;
    }
}
