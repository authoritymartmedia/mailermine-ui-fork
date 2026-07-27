import { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';
import { MailerMineLogo } from '@/Components/Brand/MailerMineLogo';

export default function GuestLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col bg-bg-base">
            <header className="flex h-16 items-center px-6">
                <Link href="/" className="flex items-center">
                    <MailerMineLogo variant="logo" className="h-7" />
                </Link>
            </header>
            <main className="flex flex-1 items-center justify-center px-4 pb-16">
                <div className="w-full max-w-md">{children}</div>
            </main>
        </div>
    );
}
