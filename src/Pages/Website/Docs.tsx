import { ArrowRight, Search } from 'lucide-react';
import { Link } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';
import { Container, Section } from '@/Components/Website/Container';
import { MarketingButton } from '@/Components/Website/MarketingButton';
import { PageHero } from '@/Components/Website/PageHero';
import { docCategories, type SeoData } from '@/content/website';

interface DocsProps {
    seo: SeoData;
}

export default function Docs({ seo }: DocsProps) {
    return (
        <MarketingLayout seo={seo}>
            <PageHero
                eyebrow="Documentation"
                title="Build with MailerMine"
                description="Guides, API reference, SDKs, and examples to integrate MailerMine in minutes."
            >
                <div className="relative mx-auto max-w-xl">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    <input
                        type="search"
                        placeholder="Search documentation..."
                        className="h-12 w-full rounded-full border border-white/10 bg-white/[0.03] pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 focus:border-white/20 focus:outline-none"
                        onFocus={() => window.location.href = '/developers/docs'}
                    />
                </div>
            </PageHero>

            <Section className="pt-0">
                <Container>
                    <div className="marketing-card mb-12 p-8">
                        <h2 className="text-xl font-medium">Quick Start</h2>
                        <p className="mt-2 text-sm text-zinc-400">Send your first email in under five minutes.</p>
                        <MarketingButton href="/developers/docs/quickstart" className="mt-6">
                            Get started <ArrowRight className="h-4 w-4" />
                        </MarketingButton>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2">
                        {docCategories.map((cat) => (
                            <div key={cat.title} className="marketing-card p-6">
                                <h3 className="text-lg font-medium">{cat.title}</h3>
                                <ul className="mt-4 space-y-2">
                                    {cat.links.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-white"
                                            >
                                                {link.label}
                                                <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>
        </MarketingLayout>
    );
}
