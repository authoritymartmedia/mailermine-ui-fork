import { cn } from '@/lib/utils';

export function Card({
    className,
    hover = false,
    ...props
}: React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
    return (
        <div
            className={cn(
                'rounded-xl border border-border-subtle bg-bg-elevated shadow-soft',
                hover && 'transition-colors duration-200 hover:bg-bg-hover',
                className,
            )}
            {...props}
        />
    );
}

export function CardHeader({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('flex flex-col gap-1.5 px-6 pb-0 pt-6', className)}
            {...props}
        />
    );
}

export function CardTitle({
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn('text-base font-medium text-text-primary', className)}
            {...props}
        />
    );
}

export function CardDescription({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn('text-sm text-text-secondary', className)}
            {...props}
        />
    );
}

export function CardContent({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('p-6', className)} {...props} />;
}

export function CardFooter({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('flex items-center px-6 pb-6 pt-0', className)}
            {...props}
        />
    );
}
