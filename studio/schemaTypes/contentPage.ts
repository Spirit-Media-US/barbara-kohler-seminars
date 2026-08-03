import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'contentPage',
	title: 'Pages (Legal, Thank-You, 404)',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (r) => r.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Page',
			type: 'string',
			description: 'Which page this content fills. Do not change once set.',
			options: {
				list: [
					{ title: 'Privacy Policy (/privacy)', value: 'privacy' },
					{ title: 'Terms of Service (/terms)', value: 'terms' },
					{ title: 'Refund Policy (/refund-policy)', value: 'refund-policy' },
					{ title: 'Thank You (after checkout)', value: 'thank-you' },
					{ title: 'Page Not Found (404)', value: 'not-found' },
				],
			},
			validation: (r) => r.required(),
		}),
		defineField({
			name: 'lastUpdated',
			title: 'Last Updated (shown on legal pages)',
			type: 'date',
		}),
		// Used by the Thank-You page, which has a hero band and two buttons
		// rather than a plain legal-page layout. Ignored by the legal pages.
		defineField({
			name: 'heroEyebrow',
			title: 'Hero eyebrow (Thank-You page)',
			type: 'string',
			description: 'Small label above the headline, e.g. "Welcome to Level One".',
		}),
		defineField({
			name: 'heroHeading',
			title: 'Hero headline (Thank-You page)',
			type: 'string',
		}),
		defineField({
			name: 'heroSubline',
			title: 'Hero subline (Thank-You page)',
			type: 'string',
		}),
		defineField({
			name: 'ctaPrimaryLabel',
			title: 'Primary button label (Thank-You page)',
			type: 'string',
			description: 'Default: "Back to home"',
		}),
		defineField({
			name: 'ctaSecondaryLabel',
			title: 'Secondary button label (Thank-You page)',
			type: 'string',
			description: 'Default: "Watch Barbara on YouTube"',
		}),
		defineField({
			name: 'seoTitle',
			title: 'Browser / search title',
			type: 'string',
			description: 'Shown in the browser tab and in search results. Leave blank to use the Title above.',
		}),
		defineField({
			name: 'seoDescription',
			title: 'Search description',
			type: 'text',
			rows: 2,
			description: 'The one- or two-sentence summary search engines show under the title.',
		}),
		defineField({
			name: 'body',
			title: 'Body',
			type: 'array',
			of: [
				{
					type: 'block',
					styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'Heading 2', value: 'h2' },
						{ title: 'Heading 3', value: 'h3' },
						{ title: 'Quote', value: 'blockquote' },
					],
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
		}),
	],
	preview: {
		select: { title: 'title', subtitle: 'slug' },
	},
});
