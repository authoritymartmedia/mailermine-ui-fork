import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabLabels: Record<string, string> = {
    node: 'Node',
    php: 'PHP',
    laravel: 'Laravel',
    python: 'Python',
    go: 'Go',
    java: 'Java',
    curl: 'cURL',
};

interface CodeTabsProps {
    examples: Record<string, string>;
    className?: string;
}

export function CodeTabs({ examples, className }: CodeTabsProps) {
    const tabs = Object.keys(examples);
    const [active, setActive] = useState(tabs[0]);
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(examples[active]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={cn('marketing-card overflow-hidden', className)}>
            <div className="flex items-center justify-between border-b border-white/[0.06] px-2">
                <div className="flex gap-1 overflow-x-auto py-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setActive(tab)}
                            className={cn(
                                'shrink-0 rounded-lg px-3 py-1.5 text-sm transition-colors',
                                active === tab
                                    ? 'bg-white/[0.08] text-white'
                                    : 'text-zinc-500 hover:text-zinc-300',
                            )}
                        >
                            {tabLabels[tab] ?? tab}
                        </button>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={copy}
                    className="mr-2 flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs text-zinc-500 hover:text-white"
                >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            <motion.pre
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="overflow-x-auto p-6 text-sm leading-relaxed text-zinc-300"
            >
                <code>{examples[active]}</code>
            </motion.pre>
        </div>
    );
}
