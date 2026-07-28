import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PageHeroProps {
    eyebrow?: string;
    title: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
}

export function PageHero({ eyebrow, title, description, children, className }: PageHeroProps) {
    return (
        <div className={cn('marketing-gradient-hero pt-32 pb-20 lg:pt-40 lg:pb-28', className)}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mx-auto max-w-3xl px-6 text-center lg:px-8"
            >
                {eyebrow && <p className="marketing-eyebrow mb-6">{eyebrow}</p>}
                <h1 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                    {title}
                </h1>
                {description && (
                    <p className="mt-6 text-lg leading-relaxed text-zinc-400">{description}</p>
                )}
                {children && <div className="mt-10">{children}</div>}
            </motion.div>
        </div>
    );
}

interface SectionHeaderProps {
    eyebrow?: string;
    title: string;
    description?: string;
    align?: 'left' | 'center';
}

export function SectionHeader({ eyebrow, title, description, align = 'center' }: SectionHeaderProps) {
    return (
        <div className={cn('mb-16 max-w-2xl', align === 'center' && 'mx-auto text-center')}>
            {eyebrow && <p className="marketing-eyebrow mb-4">{eyebrow}</p>}
            <h2 className="font-display text-3xl tracking-tight [text-wrap:balance] sm:text-4xl lg:text-5xl">{title}</h2>
            {description && (
                <p className="mt-4 text-lg text-zinc-400">{description}</p>
            )}
        </div>
    );
}
