import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ArrowRight, Check } from 'lucide-react';
import { Container } from '@/Components/Website/Container';
import { FeaturePreview } from '@/Components/Website/FeaturePreview';
import { BrowserMockup } from '@/Components/Website/BrowserMockup';
import { cn } from '@/lib/utils';

interface AlternatingFeatureProps {
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
    preview: string;
    cta?: { label: string; href: string };
    reversed?: boolean;
    tinted?: boolean;
}

export function AlternatingFeature({
    eyebrow,
    title,
    description,
    bullets,
    preview,
    cta,
    reversed = false,
    tinted = false,
}: AlternatingFeatureProps) {
    return (
        <section className={cn('py-10 sm:py-12 lg:py-14', tinted && 'bg-[#0a0a0a]')}>
            <Container>
                <div className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${reversed ? 'lg:[direction:rtl]' : ''}`}>
                    <motion.div
                        initial={{ opacity: 0, x: reversed ? 24 : -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5 }}
                        className="lg:[direction:ltr]"
                    >
                        <BrowserMockup glow={false}>
                            <FeaturePreview type={preview} size="large" />
                        </BrowserMockup>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: reversed ? -24 : 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:[direction:ltr]"
                    >
                        <p className="marketing-eyebrow mb-4">{eyebrow}</p>
                        <h2 className="font-display text-3xl tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                            {title}
                        </h2>
                        <p className="mt-4 text-lg leading-relaxed text-zinc-400">{description}</p>
                        <ul className="mt-6 space-y-3">
                            {bullets.map((bullet) => (
                                <li key={bullet} className="flex items-start gap-3 text-sm text-zinc-300">
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
                                        <Check className="h-3 w-3 text-emerald-400" />
                                    </span>
                                    {bullet}
                                </li>
                            ))}
                        </ul>
                        {cta && (
                            <Link
                                href={cta.href}
                                className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-zinc-300"
                            >
                                {cta.label}
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        )}
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
