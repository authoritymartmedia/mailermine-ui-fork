import MarketingLayout from '@/Layouts/MarketingLayout';
import { Container, Section } from '@/Components/Website/Container';
import { PageHero } from '@/Components/Website/PageHero';
import { changelogEntries, type SeoData } from '@/content/website';

interface ChangelogProps {
    seo: SeoData;
}

export default function Changelog({ seo }: ChangelogProps) {
    return (
        <MarketingLayout seo={seo}>
            <PageHero
                eyebrow="Changelog"
                title="What's new in MailerMine"
                description="Latest features, improvements, and bug fixes."
            />

            <Section className="pt-0">
                <Container className="max-w-3xl">
                    <div className="relative space-y-12 border-l border-white/[0.06] pl-8">
                        {changelogEntries.map((entry) => (
                            <div key={entry.version} className="relative">
                                <div className="absolute -left-[37px] top-1 h-3 w-3 rounded-full border-2 border-[#090909] bg-white/40" />
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-medium">
                                        v{entry.version}
                                    </span>
                                    <span className="text-sm text-zinc-500">{entry.date}</span>
                                    <span className={`rounded-full px-2 py-0.5 text-xs ${
                                        entry.type === 'feature' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                                    }`}>
                                        {entry.type}
                                    </span>
                                </div>
                                <h2 className="mt-3 text-xl font-medium">{entry.title}</h2>
                                <ul className="mt-4 space-y-2">
                                    {entry.items.map((item) => (
                                        <li key={item} className="text-sm text-zinc-400">• {item}</li>
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
