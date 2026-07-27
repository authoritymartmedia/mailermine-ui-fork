import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type ResourceCollection<T> = T[] | { data: T[] };

export function unwrapResourceCollection<T>(collection: ResourceCollection<T>): T[] {
    return Array.isArray(collection) ? collection : collection.data;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: string | null | undefined): string {
    if (!date) return '—';
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(date));
}

export function formatDateTime(date: string | null | undefined): string {
    if (!date) return '—';
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(new Date(date));
}
