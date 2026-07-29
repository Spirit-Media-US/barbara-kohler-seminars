import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

// Default useCdn=false (always fresh). Set SANITY_USE_CDN=true for faster builds
// when freshness isn't time-critical.
const USE_CDN = import.meta.env.SANITY_USE_CDN === 'true';

export const sanityClient = createClient({
	projectId: 'b2knelf7',
	dataset: 'production',
	useCdn: USE_CDN,
	apiVersion: '2024-01-01',
});

const builder = createImageUrlBuilder(sanityClient);
export function urlFor(source: Parameters<typeof builder.image>[0]) {
	return builder.image(source);
}

// Safe wrapper — returns fallback if Sanity is unreachable at build time.
export async function safeFetch<T>(query: string, params = {}, fallback: T): Promise<T> {
	try {
		const data = await sanityClient.fetch<T>(query, params);
		return (data ?? fallback) as T;
	} catch (e) {
		console.warn('[sanity] fetch failed, using fallback:', (e as Error).message);
		return fallback;
	}
}
