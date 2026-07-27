import MarketingLayout from '@/Layouts/MarketingLayout';
import { Container, Section } from '@/Components/Website/Container';
import { PageHero } from '@/Components/Website/PageHero';
import { type SeoData } from '@/content/website';

interface TermsProps {
    seo: SeoData;
}

export default function Terms({ seo }: TermsProps) {
    return (
        <MarketingLayout seo={seo}>
            <PageHero title="Terms of Service" description="Last updated: July 1, 2026" />

            <Section className="pt-0">
                <Container className="max-w-3xl">
                    <div className="space-y-8 text-sm leading-relaxed text-zinc-400">
                        <section>
                            <h2 className="text-lg font-medium text-white">Agreement</h2>
                            <p className="mt-3">
                                By accessing or using MailerMine's services, you agree to be bound by these Terms of Service. If you do not agree, do not use our services.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-lg font-medium text-white">Service description</h2>
                            <p className="mt-3">
                                MailerMine provides email infrastructure including transactional and marketing email delivery, analytics, and related APIs. We reserve the right to modify or discontinue features with reasonable notice.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-lg font-medium text-white">Acceptable use</h2>
                            <p className="mt-3">
                                You may not use MailerMine to send spam, phishing, or illegal content. You must comply with CAN-SPAM, GDPR, and applicable email regulations. We may suspend accounts that violate these terms.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-lg font-medium text-white">Payment</h2>
                            <p className="mt-3">
                                Paid plans are billed monthly. Overage charges apply when you exceed your plan's email volume. Refunds are handled on a case-by-case basis.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-lg font-medium text-white">Limitation of liability</h2>
                            <p className="mt-3">
                                MailerMine is provided "as is" without warranties. Our liability is limited to the amount you paid us in the twelve months preceding the claim.
                            </p>
                        </section>
                        <section>
                            <h2 className="text-lg font-medium text-white">Contact</h2>
                            <p className="mt-3">
                                Questions about these terms? Contact legal@mailermine.dev.
                            </p>
                        </section>
                    </div>
                </Container>
            </Section>
        </MarketingLayout>
    );
}
