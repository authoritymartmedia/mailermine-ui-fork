import { cn } from '@/lib/utils';

interface BrowserMockupProps {
    children: React.ReactNode;
    className?: string;
    url?: string;
    glow?: boolean;
}

export function BrowserMockup({ children, className, url = 'app.mailermine.dev', glow = true }: BrowserMockupProps) {
    return (
        <div className={cn('relative', className)}>
            {glow && (
                <div
                    className="pointer-events-none absolute inset-0 rounded-3xl opacity-60 sm:-inset-8"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(120, 119, 198, 0.12) 0%, transparent 70%)',
                    }}
                    aria-hidden
                />
            )}
            <div className="browser-mockup relative overflow-hidden">
                <div className="browser-mockup-chrome flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
                    <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                    </div>
                    <div className="mx-auto flex h-6 max-w-xs flex-1 items-center justify-center rounded-md bg-white/[0.04] px-3">
                        <span className="truncate font-mono text-[10px] text-zinc-500">{url}</span>
                    </div>
                </div>
                <div className="browser-mockup-content">{children}</div>
            </div>
        </div>
    );
}
