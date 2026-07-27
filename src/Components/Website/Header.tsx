import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Code2, Menu, Moon, Sun, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';
import { MarketingButton } from '@/Components/Website/MarketingButton';
import { MailerMineLogo } from '@/Components/Brand/MailerMineLogo';

const navLinks = [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Docs', href: '/docs' },
];

const resourceLinks = [
    { label: 'Blog', href: '/blog' },
    { label: 'Changelog', href: '/changelog' },
    { label: 'Integrations', href: '/integrations' },
    { label: 'Customers', href: '/customers' },
    { label: 'Status', href: '/status' },
];

export function WebsiteHeader() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [resourcesOpen, setResourcesOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const isLight = theme === 'light';

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed inset-x-0 top-0 z-50 transition-all duration-300',
                scrolled
                    ? isLight
                        ? 'border-b border-black/[0.06] bg-white/80 backdrop-blur-xl'
                        : 'border-b border-white/[0.06] bg-[#090909]/80 backdrop-blur-xl'
                    : 'bg-transparent',
            )}
        >
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
                <Link href="/" className="flex items-center">
                    <MailerMineLogo variant="logo" className="h-9" />
                </Link>

                <nav className="hidden items-center gap-1 lg:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'rounded-lg px-3 py-2 text-sm transition-colors',
                                isLight
                                    ? 'text-zinc-600 hover:text-zinc-900'
                                    : 'text-zinc-400 hover:text-white',
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setResourcesOpen((v) => !v)}
                            className={cn(
                                'inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition-colors',
                                isLight
                                    ? 'text-zinc-600 hover:text-zinc-900'
                                    : 'text-zinc-400 hover:text-white',
                            )}
                        >
                            Resources
                            <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', resourcesOpen && 'rotate-180')} />
                        </button>
                        <AnimatePresence>
                            {resourcesOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 8 }}
                                    className={cn(
                                        'absolute left-0 top-full mt-2 w-48 rounded-xl border p-2 shadow-xl',
                                        isLight
                                            ? 'border-black/[0.08] bg-white'
                                            : 'border-white/[0.06] bg-[#111111]',
                                    )}
                                >
                                    {resourceLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={cn(
                                                'block rounded-lg px-3 py-2 text-sm',
                                                isLight
                                                    ? 'text-zinc-600 hover:bg-black/[0.04] hover:text-zinc-900'
                                                    : 'text-zinc-400 hover:bg-white/[0.04] hover:text-white',
                                            )}
                                            onClick={() => setResourcesOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className={cn(
                            'rounded-lg p-2 transition-colors',
                            isLight
                                ? 'text-zinc-600 hover:text-zinc-900'
                                : 'text-zinc-400 hover:text-white',
                        )}
                        title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
                        aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
                    >
                        {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    </button>
                    <a
                        href="/developers/docs/playground"
                        className={cn(
                            'rounded-lg p-2 transition-colors',
                            isLight
                                ? 'text-zinc-600 hover:text-zinc-900'
                                : 'text-zinc-400 hover:text-white',
                        )}
                        aria-label="API Playground"
                        title="API Playground"
                    >
                        <Code2 className="h-4 w-4" />
                    </a>
                </nav>

                <div className="hidden items-center gap-3 lg:flex">
                    <MarketingButton variant="ghost" size="sm" href="/login">
                        Sign in
                    </MarketingButton>
                    <MarketingButton size="sm" href="/signup">
                        Get started
                    </MarketingButton>
                </div>

                <div className="flex items-center gap-1 lg:hidden">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className={cn(
                            'rounded-lg p-2 transition-colors',
                            isLight
                                ? 'text-zinc-600 hover:text-zinc-900'
                                : 'text-zinc-400 hover:text-white',
                        )}
                        title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
                        aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
                    >
                        {isLight ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </button>
                    <button
                        type="button"
                        className={cn(
                            'rounded-lg p-2',
                            isLight ? 'text-zinc-600' : 'text-zinc-400',
                        )}
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={cn(
                            'border-b backdrop-blur-xl lg:hidden',
                            isLight
                                ? 'border-black/[0.06] bg-white/95'
                                : 'border-white/[0.06] bg-[#090909]/95',
                        )}
                    >
                        <div className="max-h-[calc(100dvh-4rem)] space-y-1 overflow-y-auto px-6 py-4">
                            {[...navLinks, ...resourceLinks].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        'block rounded-lg px-3 py-2.5 text-sm',
                                        isLight ? 'text-zinc-700' : 'text-zinc-300',
                                    )}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex gap-2 pt-4">
                                <MarketingButton variant="secondary" size="sm" href="/login" className="flex-1">
                                    Sign in
                                </MarketingButton>
                                <MarketingButton size="sm" href="/signup" className="flex-1">
                                    Get started
                                </MarketingButton>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
