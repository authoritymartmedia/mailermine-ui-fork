import { useState } from 'react';
import MarketingLayout from '@/Layouts/MarketingLayout';
import { Container, Section } from '@/Components/Website/Container';
import { MarketingButton } from '@/Components/Website/MarketingButton';
import { PageHero } from '@/Components/Website/PageHero';
import { type SeoData } from '@/content/website';

interface ContactProps {
    seo: SeoData;
}

export default function Contact({ seo }: ContactProps) {
    const [submitted, setSubmitted] = useState(false);

    return (
        <MarketingLayout seo={seo}>
            <PageHero
                eyebrow="Contact"
                title="Get in touch"
                description="Sales, support, partnerships — we'd love to hear from you."
            />

            <Section className="pt-0">
                <Container className="max-w-xl">
                    {submitted ? (
                        <div className="marketing-card p-8 text-center">
                            <h2 className="text-xl font-medium">Message sent</h2>
                            <p className="mt-2 text-sm text-zinc-400">We'll get back to you within one business day.</p>
                        </div>
                    ) : (
                        <form
                            className="marketing-card space-y-6 p-8"
                            onSubmit={(e) => {
                                e.preventDefault();
                                setSubmitted(true);
                            }}
                        >
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 text-sm focus:border-white/20 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 text-sm focus:border-white/20 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium">Subject</label>
                                <select
                                    id="subject"
                                    className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 text-sm focus:border-white/20 focus:outline-none"
                                >
                                    <option>Sales</option>
                                    <option>Support</option>
                                    <option>Partnerships</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium">Message</label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    required
                                    className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm focus:border-white/20 focus:outline-none"
                                />
                            </div>
                            <MarketingButton className="w-full">Send message</MarketingButton>
                        </form>
                    )}

                    <div className="mt-12 grid gap-6 text-center sm:grid-cols-2">
                        <div className="marketing-card p-6">
                            <h3 className="font-medium">Sales</h3>
                            <p className="mt-2 text-sm text-zinc-400">sales@mailermine.dev</p>
                        </div>
                        <div className="marketing-card p-6">
                            <h3 className="font-medium">Support</h3>
                            <p className="mt-2 text-sm text-zinc-400">support@mailermine.dev</p>
                        </div>
                    </div>
                </Container>
            </Section>
        </MarketingLayout>
    );
}
