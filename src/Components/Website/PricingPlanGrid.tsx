import { Check } from 'lucide-react';
import { MarketingButton } from '@/Components/Website/MarketingButton';
import { cn } from '@/lib/utils';

export type PublicPricingPlan = {
    uuid: string;
    slug: string;
    name: string;
    description: string | null;
    price: string;
    period: string;
    emails: number | null;
    emails_label: string;
    emails_note: string | null;
    features: string[];
    cta: string;
    cta_href: string;
    highlighted: boolean;
    badge_label: string | null;
    is_enterprise: boolean;
};

interface PricingPlanGridProps {
    plans: PublicPricingPlan[];
    columns?: 'home' | 'pricing';
    compact?: boolean;
}

export function PricingPlanGrid({ plans, columns = 'pricing', compact = false }: PricingPlanGridProps) {
    if (plans.length === 0) {
        return (
            <p className="text-center text-sm text-zinc-500">
                Pricing plans are being updated. Check back soon or contact support.
            </p>
        );
    }

    const reserveBadgeSpace = plans.some((plan) => plan.highlighted && plan.badge_label);
    const featureLimit = compact ? 4 : 5;

    const grid = (
        <>
            {plans.map((plan) => (
                <div
                    key={plan.uuid}
                    className={cn(
                        'marketing-card flex w-full flex-col',
                        columns === 'pricing' ? 'max-w-[300px]' : '',
                        compact ? 'p-8' : 'p-6 sm:p-8',
                        plan.highlighted && 'border-white/20 ring-1 ring-white/10',
                    )}
                >
                    {plan.badge_label && plan.highlighted ? (
                        <span className="mb-4 inline-flex h-7 w-fit items-center rounded-full bg-white px-3 text-xs font-medium text-[#090909]">
                            {plan.badge_label}
                        </span>
                    ) : reserveBadgeSpace ? (
                        <span className="mb-4 block h-7" aria-hidden />
                    ) : null}
                    <h3 className={cn('font-medium', compact ? 'text-lg' : 'text-xl')}>{plan.name}</h3>
                    <p className="mt-2">
                        <span className={cn('font-medium', compact ? 'text-4xl' : 'text-4xl')}>{plan.price}</span>
                        {plan.period && (
                            <span className="text-sm text-zinc-500">
                                {plan.period.startsWith('/') || plan.period === 'forever' ? ` ${plan.period}` : plan.period}
                            </span>
                        )}
                    </p>

                    <div className={cn('border-t border-white/10', compact ? 'mt-5 pt-5' : 'mt-6 pt-6')}>
                        <p className={cn('font-medium text-white', compact ? 'text-base' : 'text-lg')}>
                            {plan.emails_label}
                        </p>
                        {plan.emails_note && (
                            <p className="mt-1 text-xs text-zinc-500">{plan.emails_note}</p>
                        )}
                    </div>

                    <ul className={cn('flex-1 space-y-2.5', compact ? 'mt-6' : 'mt-8 space-y-3')}>
                        {plan.features.slice(0, featureLimit).map((feature) => (
                            <li key={feature} className="flex items-start gap-2 text-sm text-zinc-400">
                                <Check className={cn('shrink-0 text-emerald-400', compact ? 'h-3.5 w-3.5 mt-0.5' : 'mt-0.5 h-4 w-4 text-emerald-500')} />
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <MarketingButton
                        variant={plan.highlighted ? 'primary' : 'secondary'}
                        size={compact ? 'sm' : undefined}
                        href={plan.cta_href}
                        className={cn('mt-8 w-full', compact && 'mt-8')}
                    >
                        {plan.cta}
                    </MarketingButton>
                </div>
            ))}
        </>
    );

    if (columns === 'pricing') {
        return (
            <div className="flex flex-wrap items-stretch justify-center gap-6">
                {grid}
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {grid}
        </div>
    );
}
