import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Container, Section } from '@/Components/Website/Container';
import { HighlightedCode } from '@/Components/Website/HighlightedCode';
import {
    codeExamples,
    integrationLanguages,
    nodeFrameworks,
} from '@/content/website';

export function IntegrationSection() {
    const [language, setLanguage] = useState('node');
    const [framework, setFramework] = useState('node');
    const [copied, setCopied] = useState(false);

    const code = codeExamples[language] ?? codeExamples.node;
    const showFrameworks = language === 'node';

    const copy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Section className="overflow-hidden">
            <Container>
                <div className="mx-auto max-w-4xl text-center">
                    {/* 3D envelope icon */}
                    <div className="integration-icon-wrap mx-auto mb-10">
                        <div className="integration-icon-glow" aria-hidden />
                        <div className="integration-icon-surface">
                            <Mail className="h-10 w-10 text-white/90" strokeWidth={1.5} />
                        </div>
                    </div>

                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                        Integrate{' '}
                        <span className="text-amber-500">this afternoon</span>
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-500 sm:text-lg">
                        A simple, elegant interface so you can start sending emails in minutes.
                        It fits right into your code with SDKs for your favorite programming languages.
                    </p>

                    {/* Language selector */}
                    <div className="mt-14 flex flex-wrap items-start justify-center gap-x-3 gap-y-6 sm:gap-x-4">
                        {integrationLanguages.map((lang) => {
                            const active = language === lang.id;
                            return (
                                <button
                                    key={lang.id}
                                    type="button"
                                    onClick={() => setLanguage(lang.id)}
                                    className="group flex w-14 flex-col items-center gap-2"
                                >
                                    <div
                                        className={cn(
                                            'integration-lang-icon',
                                            active && 'integration-lang-icon--active',
                                        )}
                                    >
                                        <span className="text-xs font-semibold">{lang.icon}</span>
                                    </div>
                                    <span
                                        className={cn(
                                            'text-[11px] transition-colors',
                                            active ? 'text-zinc-300' : 'text-zinc-600 group-hover:text-zinc-500',
                                        )}
                                    >
                                        {lang.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Code editor */}
                    <div className="integration-editor mx-auto mt-12 max-w-3xl text-left">
                        {showFrameworks && (
                            <div className="flex items-center gap-1 overflow-x-auto border-b border-white/[0.06] px-2 py-2">
                                {nodeFrameworks.map((fw) => {
                                    const active = framework === fw.id;
                                    return (
                                        <button
                                            key={fw.id}
                                            type="button"
                                            onClick={() => setFramework(fw.id)}
                                            className={cn(
                                                'integration-fw-tab shrink-0',
                                                active && 'integration-fw-tab--active',
                                            )}
                                        >
                                            <span className="integration-fw-icon">{fw.icon}</span>
                                            <span>{fw.label}</span>
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
                        )}

                        {!showFrameworks && (
                            <div className="flex items-center justify-end border-b border-white/[0.06] px-3 py-2">
                                <button
                                    type="button"
                                    onClick={copy}
                                    className="flex items-center justify-center rounded-lg p-2 text-zinc-500 transition-colors hover:text-white"
                                    aria-label="Copy code"
                                >
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </button>
                            </div>
                        )}

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
