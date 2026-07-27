import GuestLayout from '@/Layouts/GuestLayout';
import { AuthCard } from '@/Components/AuthCard';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <AuthCard
                title="Forgot password"
                description="Enter your email and we'll send a reset link."
            >
                {status && (
                    <div className="mb-4 text-sm text-accent-green">{status}</div>
                )}

                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        {errors.email && (
                            <p className="text-sm text-accent-red">{errors.email}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full" disabled={processing}>
                        Send reset link
                    </Button>
                </form>
            </AuthCard>
        </GuestLayout>
    );
}
