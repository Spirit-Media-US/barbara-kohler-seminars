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
		defineField({
			name: 'seminarPhotos',
			title: 'Seminar Photos (row of 3, shown above the curriculum)',
			type: 'array',
			group: 'classes',
			description: 'Three images shown as a row before "Inside Level One" — typically seminar left, Barbara center, seminar right.',
			of: [
				{
					type: 'image',
					options: { hotspot: true },
					fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
				},
			],
			validation: (r) => r.max(3),
		}),
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
		defineField({
			name: 'aboutPracticeNote',
			title: 'Counseling-practice note (last line)',
			description:
				'The closing line under Meet Barbara — e.g. "For Barbara’s private practice in Christian counseling, visit The Kohler Group, PLLC." Highlight text and use the link button to link it.',
			type: 'array',
			of: [
				{
					type: 'block',
					styles: [{ title: 'Normal', value: 'normal' }],
					lists: [],
					marks: {
						decorators: [
							{ title: 'Bold', value: 'strong' },
							{ title: 'Italic', value: 'em' },
						],
						annotations: [
							{
								name: 'link',
								title: 'Link',
								type: 'object',
								fields: [{ name: 'href', title: 'URL', type: 'url' }],
							},
						],
					},
				},
			],
			group: 'about',
		}),

		// Subscribe / eBook
		defineField({ name: 'subscribeEyebrow', title: 'Subscribe Eyebrow', type: 'string', group: 'subscribe' }),
		defineField({ name: 'subscribeHeading', title: 'Subscribe Heading', type: 'string', group: 'subscribe' }),
		defineField({ name: 'subscribeBody', title: 'Subscribe Body', type: 'text', rows: 3, group: 'subscribe' }),
		defineField({ name: 'subscribeFinePrint', title: 'Subscribe Fine Print', type: 'string', group: 'subscribe' }),
		defineField({ name: 'ebookCover', title: 'eBook Cover', type: 'image', group: 'subscribe' }),
		defineField({
			name: 'ebookFile',
			title: 'eBook file (PDF)',
			description:
				'The PDF emailed to subscribers and offered as the download. Upload a new file here to replace the eBook — no developer needed. Remember to update the cover above to match.',
			type: 'file',
			options: { accept: '.pdf' },
			group: 'subscribe',
		}),
		defineField({
			name: 'ebookButtonLabel',
			title: 'Form button label',
			type: 'string',
			description: 'Default: "Send my eBook"',
			group: 'subscribe',
		}),
		defineField({
			name: 'ebookSuccessHeading',
			title: 'After-submit heading',
			type: 'string',
			description: 'Default: "Check your inbox — your eBook is on the way."',
			group: 'subscribe',
		}),
		defineField({
			name: 'ebookSuccessBody',
			title: 'After-submit line above the download button',
			type: 'string',
			description: 'Default: "We also emailed you the link. Prefer it now?"',
			group: 'subscribe',
		}),
		defineField({
			name: 'ebookDownloadLabel',
			title: 'Download button label',
			type: 'string',
			description: 'Default: "Download the eBook"',
			group: 'subscribe',
		}),
	],
	preview: { prepare: () => ({ title: 'Home Page' }) },
});
