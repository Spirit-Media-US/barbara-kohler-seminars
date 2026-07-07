import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { media } from 'sanity-plugin-media';
import { schemaTypes } from './studio/schemaTypes';

export default defineConfig({
	name: 'barbara-kohler-seminars',
	title: 'Barbara Kohler Seminars',
	projectId: 'b2knelf7',
	dataset: 'production',
	basePath: '/studio',
	plugins: [structureTool(), visionTool(), media()],
	schema: { types: schemaTypes },
});
