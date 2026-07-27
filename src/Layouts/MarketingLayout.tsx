import { PropsWithChildren } from 'react';
import type { SeoData } from '@/content/website';
import { WebsiteFooter } from '@/Components/Website/Footer';
import { WebsiteHeader } from '@/Components/Website/Header';
import { SeoHead } from '@/Components/Website/SeoHead';

interface MarketingLayoutProps extends PropsWithChildren {
    seo: SeoData;
}

export default function MarketingLayout({ children, seo }: MarketingLayoutProps) {
    return (
        <div className="marketing-page min-h-screen">
            <SeoHead seo={seo} />
            <WebsiteHeader />
            <main>{children}</main>
            <WebsiteFooter />
        </div>
    );
}
