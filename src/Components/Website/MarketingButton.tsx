import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

const darkVariants = {
    primary:
        'bg-white text-[#090909] hover:bg-zinc-100 shadow-[0_1px_2px_rgba(0,0,0,0.5)]',
    secondary:
        'border border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06]',
    ghost: 'text-zinc-400 hover:text-white',
};

const lightVariants = {
    primary:
        'bg-zinc-900 text-[#fff] hover:bg-zinc-800 shadow-[0_1px_2px_rgba(0,0,0,0.12)]',
    secondary:
        'border border-black/10 bg-black/[0.03] text-zinc-900 hover:bg-black/[0.06]',
    ghost: 'text-zinc-600 hover:text-zinc-900',
};

const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-sm',
    lg: 'h-12 px-8 text-base',
};

interface MarketingButtonProps {
    variant?: keyof typeof darkVariants;
    size?: keyof typeof sizes;
    href?: string;
    className?: string;
    children: React.ReactNode;
    external?: boolean;
}

export function MarketingButton({
    variant = 'primary',
    size = 'md',
    href,
    className,
    children,
    external,
}: MarketingButtonProps) {
    const { theme } = useTheme();
    const variants = theme === 'light' ? lightVariants : darkVariants;

    const classes = cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200',
        variants[variant],
        sizes[size],
        className,
    );

    if (href) {
        if (external || href.startsWith('http')) {
            return (
                <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
                    {children}
                </a>
            );
        }
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }

    return <button type="button" className={classes}>{children}</button>;
}
