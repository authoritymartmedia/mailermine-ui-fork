/**
 * Single source of truth for official SDK metadata.
 * Update versions only in content/docs/sdks.json.
 */
import sdksJson from '../../content/docs/sdks.json';

export type SdkStatus = 'released' | 'coming_soon';

export interface SdkMeta {
    id: string;
    name: string;
    shortName: string;
    description: string;
    version: string | null;
    package: string;
    packageManager: string;
    install: string;
    docsSlug: string | null;
    registryLabel: string | null;
    registryUrl: string | null;
    githubUrl: string | null;
    status: SdkStatus;
}

export const SDKS = sdksJson.sdks as SdkMeta[];

export const RELEASED_SDKS = SDKS.filter((sdk) => sdk.status === 'released');
export const COMING_SOON_SDKS = SDKS.filter((sdk) => sdk.status === 'coming_soon');

export function getSdk(id: string): SdkMeta | undefined {
    return SDKS.find((sdk) => sdk.id === id);
}
