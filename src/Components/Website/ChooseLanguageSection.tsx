import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { Container, Section } from '@/Components/Website/Container';
import { SectionHeader } from '@/Components/Website/PageHero';
import { MarketingButton } from '@/Components/Website/MarketingButton';
import { cn } from '@/lib/utils';
import { RELEASED_SDKS } from '@/lib/sdks';

export function ChooseLanguageSection() {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const copy = async (id: string, install: string) => {
        await navigator.clipboard.writeText(install);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 1500);
    };

    return (
        <Section id="sdks" className="border-y border-white/[0.04] bg-[#0a0a0a]">
            <Container>
                <SectionHeader
                    eyebrow="SDKs"
                    title="Choose your language"
                    description="Official production SDKs for PHP, Node.js, and Python — install and send your first email in under two minutes."
                />

                <div className="mt-12 grid gap-4 md:grid-cols-3">
                    {RELEASED_SDKS.map((sdk, index) => (
                        <motion.div
                            key={sdk.id}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.4, delay: index * 0.06 }}
                            className="flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="font-medium text-white">{sdk.name}</h3>
                                {sdk.version && (
                                    <span className="rounded-md border border-white/[0.08] px-2 py-0.5 font-mono text-[10px] text-zinc-400">
                                        v{sdk.version}
                                    </span>
                                )}
                            </div>
                            <p className="mt-2 flex-1 text-sm text-zinc-500">{sdk.description}</p>

                            <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/[0.06] bg-black/40 px-3 py-2.5">
                                <code className="min-w-0 flex-1 truncate font-mono text-xs text-zinc-300">
                                    {sdk.install}
                                </code>
                                <button
                                    type="button"
                                    onClick={() => copy(sdk.id, sdk.install)}
                                    className={cn(
                                        'shrink-0 rounded-md p-1.5 text-zinc-500 transition-colors hover:text-white',
                                    )}
                                    aria-label={`Copy ${sdk.shortName} install command`}
                                >
                                    {copiedId === sdk.id ? (
                                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                                    ) : (
                                        <Copy className="h-3.5 w-3.5" />
                                    )}
                                </button>
                            </div>

                            {sdk.docsSlug && (
                                <a
                                    href={`/developers/docs/${sdk.docsSlug}`}
                                    className="mt-4 text-sm text-zinc-400 transition-colors hover:text-white"
                                >
                                    View documentation →
                                </a>
                            )}
                        </motion.div>
                    ))}
                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <MarketingButton href="/developers/docs/sdks">Browse all SDKs</MarketingButton>
                    <MarketingButton variant="secondary" href="/developers/docs/playground">
                        Open API Playground
                    </MarketingButton>
                </div>
            </Container>
        </Section>
    );
}
