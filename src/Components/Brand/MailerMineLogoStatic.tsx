import { ImgHTMLAttributes } from 'react';
import { APP_NAME, brandIcon, brandLogo } from '@/lib/brand';
import { cn } from '@/lib/utils';

interface MailerMineLogoStaticProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
    variant?: 'logo' | 'icon';
    /** Website/marketing surfaces use the dark theme artwork (white logo). */
    theme?: 'dark' | 'light';
}

export function MailerMineLogoStatic({
    variant = 'logo',
    theme = 'dark',
    className,
    ...props
}: MailerMineLogoStaticProps) {
    const src = variant === 'logo' ? brandLogo(theme) : brandIcon(theme);

    return (
        <img
            {...props}
            src={src}
            alt={APP_NAME}
            className={cn(
                variant === 'logo' ? 'h-7 w-auto' : 'h-8 w-8 object-contain',
                className,
            )}
        />
    );
}
