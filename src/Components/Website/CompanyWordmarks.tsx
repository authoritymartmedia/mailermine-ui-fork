import { cn } from '@/lib/utils';

export type MarkProps = {
    className?: string;
};

/**
 * Original monochrome wordmarks for the "Built for" logo cloud.
 * Geometric marks + type — not official brand assets.
 */
function WordmarkShell({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div className={cn('flex h-7 min-w-0 max-w-full items-center justify-center gap-1 text-white sm:h-8 sm:gap-2', className)}>
            {children}
        </div>
    );
}

function MarkIcon({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden className={cn('h-3.5 w-3.5 shrink-0 sm:h-5 sm:w-5', className)}>
            {children}
        </svg>
    );
}

function MarkText({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <span className={cn('truncate text-[11px] font-semibold tracking-tight sm:text-[15px]', className)}>
            {children}
        </span>
    );
}

export function SupabaseMark({ className }: MarkProps) {
    return (
        <WordmarkShell className={className}>
            <MarkIcon>
                <path d="M10.2 2.4c.4-.7 1.4-.7 1.8 0l6.2 11.4c.4.7-.1 1.6-.9 1.6H5c-.8 0-1.3-.9-.9-1.6L10.2 2.4z" />
            </MarkIcon>
            <MarkText>Supabase</MarkText>
        </WordmarkShell>
    );
}

export function CalComMark({ className }: MarkProps) {
    return (
        <WordmarkShell className={className}>
            <MarkText className="tracking-tighter sm:text-[16px]">Cal.com</MarkText>
        </WordmarkShell>
    );
}

export function PayloadMark({ className }: MarkProps) {
    return (
        <WordmarkShell className={className}>
            <MarkIcon>
                <path d="M4 3h6.2c2.8 0 4.6 1.7 4.6 4.2 0 1.9-1 3.3-2.8 3.9L15 17h-3.2l-2.8-5.5H7V17H4V3zm3 2.6v4h3c1.4 0 2.2-.8 2.2-2s-.8-2-2.2-2H7z" />
            </MarkIcon>
            <MarkText>Payload</MarkText>
        </WordmarkShell>
    );
}

export function BetterStackMark({ className }: MarkProps) {
    return (
        <WordmarkShell className={className}>
            <MarkIcon>
                <path d="M3 14V6h2.4l2.6 5.4L10.6 6H13v8h-2.2V9.2L9 14H7.2L5.4 9.2V14H3zm12-8h5.5c2 0 3.3 1.2 3.3 3s-1.3 3-3.3 3H17.2V14H15V6zm2.2 2v2.8h3c.9 0 1.4-.5 1.4-1.4S21.1 8 20.2 8h-3z" />
            </MarkIcon>
            <MarkText className="sm:text-[14px]">Better Stack</MarkText>
        </WordmarkShell>
    );
}

export function AppwriteMark({ className }: MarkProps) {
    return (
        <WordmarkShell className={className}>
            <MarkIcon>
                <path d="M10 2.5 17.5 17h-3.2l-1.3-2.8H6.9L5.6 17H2.5L10 2.5zm0 5.2L7.5 12h5L10 7.7z" />
            </MarkIcon>
            <MarkText>Appwrite</MarkText>
        </WordmarkShell>
    );
}

export function CoolifyMark({ className }: MarkProps) {
    return (
        <WordmarkShell className={className}>
            <MarkIcon>
                <circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <path d="M14.2 6.5a5.2 5.2 0 0 1 0 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </MarkIcon>
            <MarkText>Coolify</MarkText>
        </WordmarkShell>
    );
}

export function MedusaMark({ className }: MarkProps) {
    return (
        <WordmarkShell className={className}>
            <MarkIcon>
                <path d="M3 16V4h2.6l3.8 8L13.2 4H16v12h-2.5V8.8L11 16H9.2L6.6 8.8V16H3z" />
            </MarkIcon>
            <MarkText>Medusa</MarkText>
        </WordmarkShell>
    );
}

export function DirectusMark({ className }: MarkProps) {
    return (
        <WordmarkShell className={className}>
            <MarkIcon>
                <path d="M3 4h5.5c3.3 0 5.5 2.1 5.5 5.2S11.8 14.5 8.5 14.5H3V4zm2.6 2.4v5.7h2.8c1.9 0 3-1.2 3-2.85S10.3 6.4 8.4 6.4H5.6z" />
            </MarkIcon>
            <MarkText>Directus</MarkText>
        </WordmarkShell>
    );
}

export function PlausibleMark({ className }: MarkProps) {
    return (
        <WordmarkShell className={className}>
            <MarkIcon>
                <path d="M3.5 15V5h2.4v7.5h4.8V15H3.5zm9-6.5c0-1.8 1.4-3 3.4-3s3.3 1.2 3.3 3V15h-2.3V9.2c0-.9-.5-1.4-1.3-1.4s-1.4.5-1.4 1.4V15H12.5V8.5z" />
            </MarkIcon>
            <MarkText className="sm:text-[14px]">Plausible</MarkText>
        </WordmarkShell>
    );
}

export function TriggerDevMark({ className }: MarkProps) {
    return (
        <WordmarkShell className={className}>
            <MarkIcon>
                <path d="M3 5h10v2.3H9.6V15H7.2V7.3H3V5zm9.5 4 3.2-4H18l-3.6 4.2L18.2 15h-2.8l-2.9-4.2L10 15H7.2l3.8-6z" />
            </MarkIcon>
            <MarkText className="sm:text-[14px]">Trigger.dev</MarkText>
        </WordmarkShell>
    );
}

export function DubMark({ className }: MarkProps) {
    return (
        <WordmarkShell className={className}>
            <MarkText className="tracking-tighter sm:text-[16px]">Dub.co</MarkText>
        </WordmarkShell>
    );
}

export function RailwayMark({ className }: MarkProps) {
    return (
        <WordmarkShell className={className}>
            <MarkIcon>
                <path d="M3 16V4h2.6l5 8.4V4H13v12h-2.6L5.4 7.6V16H3z" />
            </MarkIcon>
            <MarkText>Railway</MarkText>
        </WordmarkShell>
    );
}
