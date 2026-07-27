import { ImgHTMLAttributes } from 'react';
import { APP_NAME, brandIcon, brandLogo } from '@/lib/brand';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';

interface MailerMineLogoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
    variant?: 'logo' | 'icon';
    theme?: 'dark' | 'light';
}

export function MailerMineLogo({
    variant = 'logo',
    theme: themeOverride,
    className,
    ...props
}: MailerMineLogoProps) {
    const { theme: activeTheme } = useTheme();
    const theme = themeOverride ?? activeTheme;
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
