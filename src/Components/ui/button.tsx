import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/15 disabled:pointer-events-none disabled:opacity-40',
    {
        variants: {
            variant: {
                primary:
                    'bg-text-primary text-bg-base shadow-button hover:opacity-90 active:scale-[0.98]',
                secondary:
                    'border border-border-subtle bg-bg-elevated text-text-primary shadow-soft hover:bg-bg-hover',
                ghost:
                    'text-text-secondary hover:bg-bg-hover hover:text-text-primary',
                danger:
                    'bg-accent-red/10 text-accent-red hover:bg-accent-red/15',
            },
            size: {
                sm: 'h-8 px-3.5 text-xs',
                md: 'h-9 px-4',
                lg: 'h-10 px-5',
                icon: 'h-9 w-9 rounded-lg',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';

        const inner =
            loading && !asChild ? (
                <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    {children}
                </>
            ) : (
                children
            );

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={disabled || loading}
                {...props}
            >
                {inner}
            </Comp>
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
