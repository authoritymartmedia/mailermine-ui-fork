import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChainItem {
    label: string;
    description: string;
}

interface InfrastructureDiagramProps {
    items: ChainItem[];
    className?: string;
    compact?: boolean;
}

export function InfrastructureDiagram({ items, className, compact = false }: InfrastructureDiagramProps) {
    return (
        <div className={cn('flex flex-col items-center', className)}>
            {items.map((item, i) => (
                <div key={item.label} className="flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className={cn(
                            'infra-node text-center',
                            compact ? 'min-w-[140px] px-5 py-3' : 'min-w-[200px] px-8 py-4',
                        )}
                    >
                        <p className={cn('font-medium text-white', compact ? 'text-sm' : 'text-base')}>{item.label}</p>
                        <p className={cn('mt-0.5 text-zinc-500', compact ? 'text-[10px]' : 'text-xs')}>{item.description}</p>
                    </motion.div>
                    {i < items.length - 1 && (
                        <div className="my-2 flex flex-col items-center text-zinc-600">
                            <div className="h-4 w-px bg-gradient-to-b from-white/20 to-transparent" />
                            <ArrowDown className="h-4 w-4" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

interface ProviderGridProps {
    providers: { name: string; status: string }[];
}

export function ProviderGrid({ providers }: ProviderGridProps) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider, i) => (
                <motion.div
                    key={provider.name}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className={cn(
                        'marketing-card flex items-center justify-between px-5 py-4',
                        provider.status === 'available' && 'border-emerald-500/20',
                    )}
                >
                    <span className="font-medium">{provider.name}</span>
                    <span
                        className={cn(
                            'rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide',
                            provider.status === 'available'
                                ? 'bg-emerald-500/15 text-emerald-400'
                                : 'bg-white/[0.06] text-zinc-500',
                        )}
                    >
                        {provider.status === 'available' ? 'Live' : 'Soon'}
                    </span>
                </motion.div>
            ))}
        </div>
    );
}
