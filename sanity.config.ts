import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { media } from 'sanity-plugin-media';
import { schemaTypes } from './studio/schemaTypes';

// Singletons — edited as a single document, not a list.
const SINGLETONS = [
	{ id: 'siteSettings', title: 'Site Settings' },
	{ id: 'homePage', title: 'Home Page' },
];
const SINGLETON_IDS = SINGLETONS.map((s) => s.id);

export default defineConfig({
	name: 'barbara-kohler-seminars',
	title: 'Barbara Kohler Seminars',
	projectId: 'b2knelf7',
	dataset: 'production',
	basePath: '/studio',
	plugins: [
		structureTool({
			structure: (S) =>
				S.list()
					.title('Content')
					.items([
						...SINGLETONS.map((s) =>
							S.listItem()
								.title(s.title)
								.id(s.id)
								.child(S.document().schemaType(s.id).documentId(s.id)),
						),
						S.divider(),
						...S.documentTypeListItems().filter(
							(li) => !SINGLETON_IDS.includes(li.getId() as string),
						),
					]),
		}),
		visionTool(),
		media(),
	],
	schema: {
		types: schemaTypes,
		// Prevent creating/deleting extra copies of the singletons.
		templates: (prev) => prev.filter((t) => !SINGLETON_IDS.includes(t.schemaType)),
	},
	document: {
		actions: (prev, { schemaType }) =>
			SINGLETON_IDS.includes(schemaType)
				? prev.filter(({ action }) =>
						['publish', 'discardChanges', 'restore'].includes(action as string),
					)
				: prev,
	},
	// Use only this project's own assets (avoid the org Media Library access wall).
	mediaLibrary: { enabled: false },
	form: {
		image: {
			assetSources: (prev: any[]) =>
				prev.filter((s) => s.name !== 'sanity-media-library' && s.name !== 'media-library'),
		},
		file: {
			assetSources: (prev: any[]) =>
				prev.filter((s) => s.name !== 'sanity-media-library' && s.name !== 'media-library'),
		},
	},
});
