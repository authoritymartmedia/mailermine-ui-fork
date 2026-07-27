import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FaqItem {
    question: string;
    answer: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <div className="divide-y divide-white/[0.06] rounded-2xl border border-white/[0.06] bg-[#111111]">
            {items.map((item, i) => (
                <div key={item.question}>
                    <button
                        type="button"
                        onClick={() => setOpen(open === i ? null : i)}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                        <span className="text-sm font-medium text-white">{item.question}</span>
                        <ChevronDown
                            className={cn(
                                'h-4 w-4 shrink-0 text-zinc-500 transition-transform',
                                open === i && 'rotate-180',
                            )}
                        />
                    </button>
                    <AnimatePresence initial={false}>
                        {open === i && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <p className="px-6 pb-5 text-sm leading-relaxed text-zinc-400">
                                    {item.answer}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
