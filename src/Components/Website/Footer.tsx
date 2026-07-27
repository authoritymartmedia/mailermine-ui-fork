import { Link } from '@inertiajs/react';
import { Code2, Mail } from 'lucide-react';
import { Container } from '@/Components/Website/Container';
import { MailerMineLogo } from '@/Components/Brand/MailerMineLogo';
import { APP_NAME } from '@/lib/brand';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

const SUPPORT_EMAIL = 'support@mailermine.com';
const INSTAGRAM_URL = 'https://www.instagram.com/mailermine';

function InstagramIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden
        >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    );
}

const footerLinks = {
    Product: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Docs', href: '/docs' },
        { label: 'API', href: '/developers/docs/api-reference' },
        { label: 'SDK', href: '/developers/docs/sdks' },
    ],
    Resources: [
        { label: 'Blog', href: '/blog' },
        { label: 'Status', href: '/status' },
        { label: 'GitHub', href: 'https://github.com', external: true },
        { label: 'Changelog', href: '/changelog' },
        { label: 'Integrations', href: '/integrations' },
    ],
    Company: [
        { label: 'About', href: '/about' },
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Contact', href: '/contact' },
        { label: 'Support', href: `mailto:${SUPPORT_EMAIL}`, external: true },
    ],
};

export function WebsiteFooter() {
    const { theme } = useTheme();
    const isLight = theme === 'light';

    return (
        <footer
            className={cn(
                'border-t py-20',
                isLight
                    ? 'border-black/[0.06] bg-[#fafafa]'
                    : 'border-white/[0.06] bg-[#090909]',
            )}
        >
            <Container>
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center">
                            <MailerMineLogo variant="logo" className="h-9" />
                        </Link>
                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
                            The easiest way to send transactional and marketing email at scale. Built for developers who care about deliverability.
                        </p>
                        <div className="mt-6 flex flex-wrap items-center gap-4">
                            <a
                                href={INSTAGRAM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={cn(
                                    'text-zinc-500 transition-colors',
                                    isLight ? 'hover:text-zinc-900' : 'hover:text-white',
                                )}
                                aria-label="Instagram"
                            >
                                <InstagramIcon className="h-4 w-4" />
                            </a>
                            <a
                                href={`mailto:${SUPPORT_EMAIL}`}
                                className={cn(
                                    'inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors',
                                    isLight ? 'hover:text-zinc-900' : 'hover:text-white',
                                )}
                            >
                                <Mail className="h-4 w-4" />
                                {SUPPORT_EMAIL}
                            </a>
                            <a
                                href="/developers/docs/api-reference"
                                className={cn(
                                    'text-zinc-500 transition-colors',
                                    isLight ? 'hover:text-zinc-900' : 'hover:text-white',
                                )}
                                aria-label="API"
                            >
                                <Code2 className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <p className={cn('text-sm font-medium', isLight ? 'text-zinc-900' : 'text-white')}>
                                {title}
                            </p>
                            <ul className="mt-4 space-y-2.5">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        {'external' in link && link.external ? (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={cn(
                                                    'text-sm text-zinc-500 transition-colors',
                                                    isLight ? 'hover:text-zinc-900' : 'hover:text-white',
                                                )}
                                            >
                                                {link.label}
                                            </a>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className={cn(
                                                    'text-sm text-zinc-500 transition-colors',
                                                    isLight ? 'hover:text-zinc-900' : 'hover:text-white',
                                                )}
                                            >
                                                {link.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div
                    className={cn(
                        'mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm text-zinc-600 sm:flex-row',
                        isLight ? 'border-black/[0.06]' : 'border-white/[0.06]',
                    )}
                >                    <p>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
                    <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                        <span>Email infrastructure for modern developers.</span>
                        <a
                            href={`mailto:${SUPPORT_EMAIL}`}
                            className={cn(
                                'transition-colors',
                                isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-zinc-400 hover:text-white',
                            )}
                        >
                            {SUPPORT_EMAIL}
                        </a>
                    </p>
                </div>
            </Container>
        </footer>
    );
}
