import { Link, router } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';
import { Container, Section } from '@/Components/Website/Container';
import { PageHero } from '@/Components/Website/PageHero';
import type { SeoData } from '@/content/website';
import { cn } from '@/lib/utils';

type BlogPostCard = {
    uuid: string;
    title: string;
    slug: string;
    excerpt: string | null;
    featured_image_url: string | null;
    author_name: string;
    reading_time_minutes: number | null;
    published_at_human: string | null;
    category: { name: string; slug: string } | null;
};

interface BlogProps {
    seo: SeoData;
    posts: {
        data: BlogPostCard[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    featured: BlogPostCard | null;
    categories: Array<{ name: string; slug: string }>;
    filters: { category: string | null };
}

export default function Blog({ seo, posts, featured, categories, filters }: BlogProps) {
    const list = posts.data.filter((p) => !featured || p.uuid !== featured.uuid);

    return (
        <MarketingLayout seo={seo}>
            <PageHero
                eyebrow="Blog"
                title="Engineering & product notes"
                description="Insights on email infrastructure, deliverability, and building MailerMine."
            />

            <Section className="pt-0">
                <Container>
                    {categories.length > 0 && (
                        <div className="mb-10 flex flex-wrap gap-2">
                            <FilterChip
                                active={!filters.category}
                                onClick={() => router.get(route('website.blog'), {}, { preserveState: true })}
                            >
                                All
                            </FilterChip>
                            {categories.map((category) => (
                                <FilterChip
                                    key={category.slug}
                                    active={filters.category === category.slug}
                                    onClick={() =>
                                        router.get(
                                            route('website.blog'),
                                            { category: category.slug },
                                            { preserveState: true },
                                        )
                                    }
                                >
                                    {category.name}
                                </FilterChip>
                            ))}
                        </div>
                    )}

                    {featured && !filters.category && (
                        <Link href={route('website.blog.show', featured.slug)} className="block">
                            <article className="marketing-card group overflow-hidden transition-colors hover:border-white/15">
                                <div className="grid lg:grid-cols-2">
                                    <div
                                        className={cn(
                                            'aspect-[16/9] bg-gradient-to-br from-emerald-500/10 to-white/[0.03] lg:aspect-auto lg:min-h-[280px]',
                                            featured.featured_image_url && 'bg-cover bg-center',
                                        )}
                                        style={
                                            featured.featured_image_url
                                                ? { backgroundImage: `url(${featured.featured_image_url})` }
                                                : undefined
                                        }
                                    />
                                    <div className="flex flex-col justify-center p-8 lg:p-12">
                                        {featured.category && (
                                            <span className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                                                {featured.category.name}
                                            </span>
                                        )}
                                        <h2 className="mt-3 font-display text-2xl tracking-tight text-white transition-colors group-hover:text-zinc-100 sm:text-3xl">
                                            {featured.title}
                                        </h2>
                                        {featured.excerpt && (
                                            <p className="mt-3 text-zinc-400">{featured.excerpt}</p>
                                        )}
                                        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-500">
                                            <span>{featured.author_name}</span>
                                            {featured.published_at_human && (
                                                <>
                                                    <span>·</span>
                                                    <span>{featured.published_at_human}</span>
                                                </>
                                            )}
                                            {featured.reading_time_minutes && (
                                                <>
                                                    <span>·</span>
                                                    <span>{featured.reading_time_minutes} min read</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    )}

                    {posts.data.length === 0 ? (
                        <div className="marketing-card mt-12 px-8 py-16 text-center">
                            <p className="text-lg text-zinc-300">No posts published yet.</p>
                            <p className="mt-2 text-sm text-zinc-500">Check back soon for new articles.</p>
                        </div>
                    ) : (
                        <div className={cn('grid gap-8 md:grid-cols-2 lg:grid-cols-3', featured && !filters.category ? 'mt-12' : 'mt-0')}>
                            {(featured && !filters.category ? list : posts.data).map((post) => (
                                <Link key={post.uuid} href={route('website.blog.show', post.slug)} className="block">
                                    <article className="marketing-card group h-full overflow-hidden transition-colors hover:border-white/15">
                                        <div
                                            className={cn(
                                                'aspect-[16/9] bg-gradient-to-br from-white/[0.04] to-transparent',
                                                post.featured_image_url && 'bg-cover bg-center',
                                            )}
                                            style={
                                                post.featured_image_url
                                                    ? { backgroundImage: `url(${post.featured_image_url})` }
                                                    : undefined
                                            }
                                        />
                                        <div className="p-6">
                                            {post.category && (
                                                <span className="text-xs text-zinc-500">{post.category.name}</span>
                                            )}
                                            <h3 className="mt-3 text-lg font-medium text-white group-hover:text-zinc-100">
                                                {post.title}
                                            </h3>
                                            {post.excerpt && (
                                                <p className="mt-2 line-clamp-3 text-sm text-zinc-500">{post.excerpt}</p>
                                            )}
                                            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-600">
                                                <span>{post.author_name}</span>
                                                {post.reading_time_minutes && (
                                                    <>
                                                        <span>·</span>
                                                        <span>{post.reading_time_minutes} min</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    )}

                    {posts.links.length > 3 && (
                        <div className="mt-12 flex flex-wrap justify-center gap-2">
                            {posts.links.map((link, index) => (
                                <button
                                    key={`${link.label}-${index}`}
                                    type="button"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url)}
                                    className={cn(
                                        'rounded-lg px-3 py-1.5 text-sm transition-colors',
                                        link.active
                                            ? 'bg-white text-black'
                                            : 'text-zinc-400 hover:bg-white/5 hover:text-white',
                                        !link.url && 'opacity-40',
                                    )}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </Container>
            </Section>
        </MarketingLayout>
    );
}

function FilterChip({
    children,
    active,
    onClick,
}: {
    children: React.ReactNode;
    active?: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                active
                    ? 'border-white/20 bg-white text-black'
                    : 'border-white/10 bg-transparent text-zinc-400 hover:border-white/20 hover:text-white',
            )}
        >
            {children}
        </button>
    );
}
