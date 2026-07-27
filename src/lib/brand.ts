export const APP_NAME = 'MailerMine';

export const BRAND_ASSETS = {
    iconBlack: '/images/brand/icon-black.png',
    iconWhite: '/images/brand/icon-white.png',
    logoBlack: '/images/brand/logo-black.png',
    logoWhite: '/images/brand/logo-white.png',
} as const;

export function brandIcon(theme: 'dark' | 'light'): string {
    return theme === 'dark' ? BRAND_ASSETS.iconWhite : BRAND_ASSETS.iconBlack;
}

export function brandLogo(theme: 'dark' | 'light'): string {
    return theme === 'dark' ? BRAND_ASSETS.logoWhite : BRAND_ASSETS.logoBlack;
}
