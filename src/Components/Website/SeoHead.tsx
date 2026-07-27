import { Head } from '@inertiajs/react';
import type { SeoData } from '@/content/website';
import { APP_NAME } from '@/lib/brand';

interface SeoHeadProps {
    seo: SeoData;
}

export function SeoHead({ seo }: SeoHeadProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: APP_NAME,
        applicationCategory: 'DeveloperApplication',
        description: seo.description,
        url: seo.canonical,
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
    };

    return (
        <Head>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <link rel="canonical" href={seo.canonical} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:url" content={seo.canonical} />
            {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            {seo.ogImage && <meta name="twitter:image" content={seo.ogImage} />}
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Head>
    );
}
