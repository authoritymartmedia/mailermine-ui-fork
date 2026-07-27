import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container, Section } from '@/Components/Website/Container';
import { HighlightedCode } from '@/Components/Website/HighlightedCode';
import { codeExamples, devExperienceFeatures } from '@/content/website';

const devTabs = [
    { id: 'php', label: 'PHP' },
    { id: 'laravel', label: 'Laravel' },
    { id: 'node', label: 'Node' },
    { id: 'python', label: 'Python' },
    { id: 'go', label: 'Go' },
    { id: 'java', label: 'Java' },
    { id: 'curl', label: 'cURL' },
] as const;

export function DevExperienceSection() {
    const [language, setLanguage] = useState<string>('node');
    const [copied, setCopied] = useState(false);

    const code = codeExamples[language] ?? codeExamples.node;

    const copy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Section id="developers" className="border-y border-white/[0.04] bg-[#0a0a0a]">
            <Container>
                <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-20">
                    <div>
                        <p className="marketing-eyebrow mb-6">Developer experience</p>
                        <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
                            First-class developer experience
                        </h2>
                        <p className="mt-5 text-lg leading-relaxed text-zinc-400">
                            A clean API, official SDKs, and OpenAPI spec — everything you need to integrate in an afternoon.
                        </p>
                        <ul className="mt-10 space-y-4">
                            {devExperienceFeatures.map((feature) => (
                                <li key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15">
                                        <Check className="h-3 w-3 text-emerald-400" />
                                    </span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="integration-editor">
                        <div className="flex items-center gap-1 overflow-x-auto border-b border-white/[0.06] px-2 py-2">
                            {devTabs.map((tab) => {
                                const active = language === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setLanguage(tab.id)}
                                        className={cn(
                                            'shrink-0 rounded-lg px-3 py-1.5 text-xs transition-all',
                                            active
                                                ? 'border border-amber-500/40 bg-amber-500/10 text-white'
                                                : 'text-zinc-500 hover:text-zinc-300',
                                        )}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}
                            <button
                                type="button"
                                onClick={copy}
                                className="ml-auto flex shrink-0 items-center justify-center rounded-lg p-2 text-zinc-500 transition-colors hover:text-white"
                                aria-label="Copy code"
                            >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </button>
                        </div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={language}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="overflow-x-auto p-5 sm:p-6"
                            >
                                <HighlightedCode code={code} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
