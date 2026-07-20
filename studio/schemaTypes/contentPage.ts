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
