import GuestLayout from '@/Layouts/GuestLayout';
import { AuthCard } from '@/Components/AuthCard';
import { AuthDivider, GoogleAuthButton } from '@/Components/GoogleAuthButton';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset, transform } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Ensure the boolean is always present so Laravel receives remember correctly.
        transform((form) => ({
            ...form,
            remember: Boolean(form.remember),
        }));
        post(route('login', undefined, false), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <AuthCard title="Log in" description="Welcome back to MailerMine.">
                {status && (
                    <div className="mb-4 text-sm text-accent-green">{status}</div>
                )}

                <GoogleAuthButton label="Continue with Google" />
                <AuthDivider />

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && (
                            <p className="text-sm text-accent-red">{errors.email}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && (
                            <p className="text-sm text-accent-red">{errors.password}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            id="remember"
                            name="remember"
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-border-subtle bg-bg-elevated"
                        />
                        <Label htmlFor="remember" className="font-normal">
                            Remember me for 1 month
                        </Label>
                    </div>

                    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-center text-sm text-text-secondary hover:text-text-primary sm:text-left"
                            >
                                Forgot password?
                            </Link>
                        )}
                        <Button type="submit" disabled={processing} className="w-full sm:w-auto">
                            Log in
                        </Button>
                    </div>
                </form>

                <p className="mt-6 text-center text-sm text-text-secondary">
                    Don't have an account?{' '}
                    <Link href={route('register')} className="text-text-primary hover:underline">
                        Sign up
                    </Link>
                </p>
            </AuthCard>
        </GuestLayout>
    );
}
