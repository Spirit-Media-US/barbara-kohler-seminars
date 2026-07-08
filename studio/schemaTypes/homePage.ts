import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'homePage',
	title: 'Home Page',
	type: 'document',
	groups: [
		{ name: 'hero', title: 'Hero' },
		{ name: 'series', title: 'Series' },
		{ name: 'classes', title: 'Classes / Curriculum' },
		{ name: 'verse', title: 'Verse Band' },
		{ name: 'how', title: 'How It Works' },
		{ name: 'about', title: 'About Barbara' },
		{ name: 'subscribe', title: 'Subscribe / eBook' },
	],
	fields: [
		// Hero
		defineField({ name: 'heroEyebrow', title: 'Hero Eyebrow', type: 'string', group: 'hero' }),
		defineField({ name: 'heroHeading', title: 'Hero Heading', type: 'text', rows: 2, group: 'hero' }),
		defineField({ name: 'heroSub', title: 'Hero Subtext', type: 'text', rows: 3, group: 'hero' }),
		defineField({ name: 'heroVerse', title: 'Hero Verse', type: 'text', rows: 2, group: 'hero' }),
		defineField({ name: 'heroVerseRef', title: 'Hero Verse Reference', type: 'string', group: 'hero' }),

		// Series
		defineField({ name: 'seriesEyebrow', title: 'Series Eyebrow', type: 'string', group: 'series' }),
		defineField({ name: 'seriesHeading', title: 'Series Heading', type: 'string', group: 'series' }),
		defineField({ name: 'seriesLede', title: 'Series Lede', type: 'text', rows: 3, group: 'series' }),
		defineField({ name: 'seriesBody', title: 'Series Body', type: 'text', rows: 3, group: 'series' }),
		defineField({
			name: 'seriesPoints',
			title: 'Series Points',
			type: 'array',
			group: 'series',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'lead', title: 'Lead (bold)', type: 'string' },
						{ name: 'text', title: 'Text', type: 'string' },
					],
					preview: {
						select: { title: 'lead', subtitle: 'text' },
					},
				},
			],
		}),

		// Classes / Curriculum
		defineField({ name: 'classesEyebrow', title: 'Classes Eyebrow', type: 'string', group: 'classes' }),
		defineField({ name: 'classesHeading', title: 'Classes Heading', type: 'string', group: 'classes' }),
		defineField({ name: 'classesLede', title: 'Classes Lede', type: 'text', rows: 2, group: 'classes' }),
		defineField({ name: 'curriculumEyebrow', title: 'Curriculum Eyebrow', type: 'string', group: 'classes' }),
		defineField({ name: 'curriculumHeading', title: 'Curriculum Heading', type: 'string', group: 'classes' }),

		// Verse band
		defineField({ name: 'verseBandQuote', title: 'Verse Band Quote', type: 'text', rows: 3, group: 'verse' }),
		defineField({ name: 'verseBandRef', title: 'Verse Band Reference', type: 'string', group: 'verse' }),

		// How it works
		defineField({ name: 'howEyebrow', title: 'How Eyebrow', type: 'string', group: 'how' }),
		defineField({ name: 'howHeading', title: 'How Heading', type: 'string', group: 'how' }),
		defineField({
			name: 'steps',
			title: 'Steps',
			type: 'array',
			group: 'how',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'label', title: 'Label', type: 'string' },
						{ name: 'title', title: 'Title', type: 'string' },
						{ name: 'body', title: 'Body', type: 'text', rows: 2 },
					],
					preview: { select: { title: 'title', subtitle: 'label' } },
				},
			],
		}),

		// About Barbara
		defineField({ name: 'aboutEyebrow', title: 'About Eyebrow', type: 'string', group: 'about' }),
		defineField({ name: 'aboutName', title: 'About Name', type: 'string', group: 'about' }),
		defineField({ name: 'aboutCreds', title: 'Credentials', type: 'string', group: 'about' }),
		defineField({
			name: 'aboutParagraphs',
			title: 'About Paragraphs',
			type: 'array',
			of: [{ type: 'text', rows: 3 }],
			group: 'about',
		}),
		defineField({ name: 'headshot', title: 'Headshot', type: 'image', group: 'about', options: { hotspot: true } }),

		// Subscribe / eBook
		defineField({ name: 'subscribeEyebrow', title: 'Subscribe Eyebrow', type: 'string', group: 'subscribe' }),
		defineField({ name: 'subscribeHeading', title: 'Subscribe Heading', type: 'string', group: 'subscribe' }),
		defineField({ name: 'subscribeBody', title: 'Subscribe Body', type: 'text', rows: 3, group: 'subscribe' }),
		defineField({ name: 'subscribeFinePrint', title: 'Subscribe Fine Print', type: 'string', group: 'subscribe' }),
		defineField({ name: 'ebookCover', title: 'eBook Cover', type: 'image', group: 'subscribe' }),
	],
	preview: { prepare: () => ({ title: 'Home Page' }) },
});
