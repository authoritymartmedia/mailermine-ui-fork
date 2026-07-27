import MarketingLayout from '@/Layouts/MarketingLayout';
import { Container, Section } from '@/Components/Website/Container';
import { PageHero } from '@/Components/Website/PageHero';
import { type SeoData } from '@/content/website';

interface PrivacyProps {
    seo: SeoData;
}

export default function Privacy({ seo }: PrivacyProps) {
    return (
        <MarketingLayout seo={seo}>
            <PageHero title="Privacy Policy" description="Last updated: July 1, 2026" />

            <Section className="pt-0">
                <Container className="max-w-3xl prose prose-invert prose-zinc">
                    <div className="space-y-8 text-sm leading-relaxed text-zinc-400">
                        <section>
                            <h2 className="text-lg font-medium text-white">Overview</h2>
                            <p className="mt-3">
                                MailerMine ("we", "our", or "us") is committed to protecting your privacy. This policy describes how we collect, use, and safeguard information when you use our email infrastructure platform.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-lg font-medium text-white">Information we collect</h2>
                            <p className="mt-3">
                                We collect account information (name, email), usage data (API calls, email volumes), and technical data (IP addresses, browser type) necessary to operate and improve our service.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-lg font-medium text-white">How we use your data</h2>
                            <p className="mt-3">
                                Your data is used to provide email delivery services, improve platform reliability, communicate about your account, and comply with legal obligations. We do not sell your personal information.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-lg font-medium text-white">Data retention</h2>
                            <p className="mt-3">
                                We retain account data for the duration of your account plus a reasonable period thereafter. Email logs and analytics are retained according to your plan's retention policy.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-lg font-medium text-white">Contact</h2>
                            <p className="mt-3">
                                For privacy-related inquiries, contact us at privacy@mailermine.dev.
                            </p>
                        </section>
                    </div>
                </Container>
            </Section>
        </MarketingLayout>
    );
}
