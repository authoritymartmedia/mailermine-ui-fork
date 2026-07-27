import { Link } from '@inertiajs/react';
import MarketingLayout from '@/Layouts/MarketingLayout';
import { Container, Section } from '@/Components/Website/Container';
import type { SeoData } from '@/content/website';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

type BlogPost = {
    uuid: string;
    title: string;
    slug: string;
    excerpt: string | null;
    body: string;
    featured_image_url: string | null;
    author_name: string;
    reading_time_minutes: number | null;
    published_at_human: string | null;
    category: { name: string; slug: string } | null;
};

interface BlogShowProps {
    seo: SeoData;
    post: BlogPost;
    related: Array<Omit<BlogPost, 'body'>>;
}

export default function BlogShow({ seo, post, related }: BlogShowProps) {
    return (
        <MarketingLayout seo={seo}>
            <Section className="pt-28 lg:pt-36">
                <Container className="max-w-3xl">
                    <Link
                        href={route('website.blog')}
                        className="inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to blog
                    </Link>

                    {post.category && (
                        <p className="mt-8 text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
                            {post.category.name}
                        </p>
                    )}

                    <h1 className="mt-3 font-display text-4xl tracking-tight text-white sm:text-5xl lg:leading-[1.1]">
                        {post.title}
                    </h1>

                    {post.excerpt && (
                        <p className="mt-5 text-lg leading-relaxed text-zinc-400">{post.excerpt}</p>
                    )}

                    <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-white/[0.06] pb-8 text-sm text-zinc-500">
                        <span>{post.author_name}</span>
                        {post.published_at_human && (
                            <>
                                <span>·</span>
                                <span>{post.published_at_human}</span>
                            </>
                        )}
                        {post.reading_time_minutes && (
                            <>
                                <span>·</span>
                                <span>{post.reading_time_minutes} min read</span>
                            </>
                        )}
                    </div>

                    {post.featured_image_url && (
                        <div className="mt-10 overflow-hidden rounded-2xl border border-white/[0.08]">
                            <img
                                src={post.featured_image_url}
                                alt=""
                                className="aspect-[16/9] w-full object-cover"
                            />
                        </div>
                    )}

                    <div
                        className={cn(
                            'blog-prose mt-10 text-[17px] leading-8 text-zinc-300',
                            '[&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:tracking-tight [&_h2]:text-white',
                            '[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-white',
                            '[&_p]:mb-5',
                            '[&_a]:text-emerald-400 [&_a]:underline [&_a]:underline-offset-4',
                            '[&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6',
                            '[&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6',
                            '[&_li]:mb-1.5',
                            '[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-emerald-500/40 [&_blockquote]:pl-4 [&_blockquote]:text-zinc-400',
                            '[&_code]:rounded [&_code]:bg-white/[0.06] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.9em]',
                            '[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-white/[0.08] [&_pre]:bg-[#0a0a0a] [&_pre]:p-4',
                            '[&_img]:my-8 [&_img]:rounded-xl',
                        )}
                        dangerouslySetInnerHTML={{ __html: post.body }}
                    />
                </Container>
            </Section>

            {related.length > 0 && (
                <Section className="border-t border-white/[0.04] pt-16">
                    <Container>
                        <h2 className="text-xl font-medium text-white">Related reading</h2>
                        <div className="mt-8 grid gap-6 md:grid-cols-3">
                            {related.map((item) => (
                                <Link key={item.uuid} href={route('website.blog.show', item.slug)} className="block">
                                    <article className="marketing-card h-full p-6 transition-colors hover:border-white/15">
                                        {item.category && (
                                            <span className="text-xs text-zinc-500">{item.category.name}</span>
                                        )}
                                        <h3 className="mt-2 text-base font-medium text-white">{item.title}</h3>
                                        {item.excerpt && (
                                            <p className="mt-2 line-clamp-2 text-sm text-zinc-500">{item.excerpt}</p>
                                        )}
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </Container>
                </Section>
            )}
        </MarketingLayout>
    );
}
