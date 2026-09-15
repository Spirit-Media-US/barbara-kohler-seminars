import { defineType, defineField } from 'sanity';

// Unlisted delivery page for a purchased course: /course/<courseSlug>/<accessCode>.
// Not linked from nav, excluded from the sitemap, noindex. The access code is the
// only thing keeping it private — changing it breaks links in sent welcome emails.
export default defineType({
	name: 'coursePortal',
	title: 'Course Delivery Pages',
	type: 'document',
	fields: [
		defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
		defineField({
			name: 'courseSlug',
			title: 'Course Slug',
			type: 'string',
			description: 'First URL segment after /course/, e.g. "from-script-to-scroll".',
			validation: (r) => r.required().regex(/^[a-z0-9-]+$/),
		}),
		defineField({
			name: 'accessCode',
			title: 'Access Code',
			type: 'string',
			description: 'Random 10+ character code in the URL. Do not change after welcome emails have gone out.',
			validation: (r) => r.required().regex(/^[a-z0-9]{10,}$/),
		}),
		defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
		defineField({
			name: 'welcome',
			title: 'Welcome Paragraphs',
			type: 'array',
			of: [{ type: 'text', rows: 3 }],
		}),
		defineField({ name: 'signOff', title: 'Sign-off', type: 'string', description: 'e.g. "Warm regards, Barbara"' }),
		defineField({ name: 'workbookUrl', title: 'Workbook PDF URL', type: 'url' }),
		defineField({ name: 'workbookLabel', title: 'Workbook Button Label', type: 'string' }),
		defineField({
			name: 'videos',
			title: 'Videos (in order)',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'title', title: 'Title', type: 'string' },
						{ name: 'vimeoId', title: 'Vimeo ID', type: 'string', validation: (r) => r.required().regex(/^\d+$/) },
					],
					preview: { select: { title: 'title', subtitle: 'vimeoId' } },
				},
			],
		}),
	],
	preview: { select: { title: 'title', subtitle: 'courseSlug' } },
});
