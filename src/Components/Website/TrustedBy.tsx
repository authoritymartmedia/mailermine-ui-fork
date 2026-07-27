import { motion } from 'framer-motion';
import type { ComponentType } from 'react';
import { Container } from '@/Components/Website/Container';
import {
    AppwriteMark,
    BetterStackMark,
    CalComMark,
    CoolifyMark,
    DirectusMark,
    DubMark,
    type MarkProps,
    MedusaMark,
    PayloadMark,
    PlausibleMark,
    RailwayMark,
    SupabaseMark,
    TriggerDevMark,
} from '@/Components/Website/CompanyWordmarks';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const companies: Array<{
    name: string;
    mark: ComponentType<MarkProps>;
}> = [
    { name: 'Supabase', mark: SupabaseMark },
    { name: 'Cal.com', mark: CalComMark },
    { name: 'Payload CMS', mark: PayloadMark },
    { name: 'Better Stack', mark: BetterStackMark },
    { name: 'Appwrite', mark: AppwriteMark },
    { name: 'Coolify', mark: CoolifyMark },
    { name: 'MedusaJS', mark: MedusaMark },
    { name: 'Directus', mark: DirectusMark },
    { name: 'Plausible', mark: PlausibleMark },
    { name: 'Trigger.dev', mark: TriggerDevMark },
    { name: 'Dub.co', mark: DubMark },
    { name: 'Railway', mark: RailwayMark },
];

function CompanyLogo({
    name,
    mark: Mark,
    index,
}: {
    name: string;
    mark: ComponentType<MarkProps>;
    index: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] as const }}
            whileHover={{ y: -2, scale: 1.05, transition: { duration: 0.3 } }}
            className="group flex h-10 items-center justify-center sm:h-14"
            title={name}
        >
            <Mark
                className={cn(
                    'opacity-80 transition-opacity duration-300',
                    'group-hover:opacity-100',
                )}
            />
            <span className="sr-only">{name}</span>
        </motion.div>
    );
}

export function TrustedBy() {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    return (
        <section className="py-16 lg:py-24">
            <Container className="max-w-7xl">
                <div
                    className={cn(
                        'trusted-technologies relative flex items-center overflow-hidden rounded-[28px] border px-4 py-12 backdrop-blur-xl sm:min-h-[420px] sm:px-10 sm:py-16 lg:min-h-[500px] lg:px-16 lg:py-20',
                        isLight ? 'border-black/[0.08] bg-[#f4f4f5]' : 'border-[#1f1f1f]',
                    )}
                >
                    {!isLight && (
                        <>
                            <div
                                className="pointer-events-none absolute inset-0"
                                style={{
                                    background:
                                        'radial-gradient(circle at top, rgba(255,255,255,0.04), transparent 65%), linear-gradient(180deg, #090909, #050505)',
                                }}
                                aria-hidden
                            />
                            <div
                                className="pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),inset_0_0_80px_rgba(0,0,0,0.45)]"
                                aria-hidden
                            />
                            <div className="trusted-technologies-glow pointer-events-none absolute inset-x-0 top-0 h-56" aria-hidden />
                            <div className="trusted-technologies-vignette pointer-events-none absolute inset-0" aria-hidden />
                            <div className="trusted-technologies-noise pointer-events-none absolute inset-0 opacity-[0.02]" aria-hidden />
                        </>
                    )}
                    {isLight && (
                        <div
                            className="pointer-events-none absolute inset-0"
                            style={{
                                background:
                                    'radial-gradient(circle at top, rgba(0,0,0,0.03), transparent 60%), linear-gradient(180deg, #fafafa, #f4f4f5)',
                            }}
                            aria-hidden
                        />
                    )}

                    <div className="relative z-10 mx-auto w-full max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                            className="mx-auto mb-12 max-w-2xl text-center sm:mb-16 lg:mb-20"
                        >
                            <p
                                className={cn(
                                    'mb-5 text-[11px] font-medium uppercase tracking-[0.2em]',
                                    isLight ? 'text-zinc-500' : 'text-zinc-500',
                                )}
                            >
                                Built for
                            </p>
                            <h2
                                className={cn(
                                    'text-2xl font-semibold tracking-tight sm:text-3xl lg:text-[34px]',
                                    isLight ? 'text-zinc-900' : 'text-white',
                                )}
                            >
                                Built for teams shipping at scale
                            </h2>
                            <p
                                className={cn(
                                    'mt-4 text-base leading-relaxed sm:text-lg',
                                    isLight ? 'text-zinc-600' : 'text-zinc-400',
                                )}
                            >
                                From fast-growing startups to established businesses, MailerMine is designed for modern
                                engineering teams that need reliable email infrastructure.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-3 gap-x-2 gap-y-7 min-[480px]:grid-cols-4 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-10 md:grid-cols-6 md:gap-x-6 md:gap-y-12 lg:gap-x-8">
                            {companies.map((company, index) => (
                                <CompanyLogo
                                    key={company.name}
                                    name={company.name}
                                    mark={company.mark}
                                    index={index}
                                />
                            ))}
                        </div>

                        <p
                            className={cn(
                                'mx-auto mt-10 max-w-xl px-2 text-center text-xs sm:mt-14',
                                isLight ? 'text-zinc-500' : 'text-zinc-500',
                            )}
                        >
                            Representative companies and modern developer tools that reflect the teams MailerMine is
                            built for.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
}
