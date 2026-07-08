import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'course',
	title: 'Courses / Classes',
	type: 'document',
	fields: [
		defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: { source: 'title' },
		}),
		defineField({
			name: 'level',
			title: 'Level Label',
			type: 'string',
			description: 'e.g. "Level One · Available Now" — shown in the card band.',
		}),
		defineField({
			name: 'status',
			title: 'Status',
			type: 'string',
			options: {
				list: [
					{ title: 'Available now', value: 'available' },
					{ title: 'In production', value: 'in-production' },
					{ title: 'Catalog placeholder', value: 'catalog' },
				],
				layout: 'radio',
			},
			initialValue: 'available',
		}),
		defineField({
			name: 'body',
			title: 'Card Paragraphs',
			type: 'array',
			of: [{ type: 'text', rows: 3 }],
		}),
		defineField({ name: 'price', title: 'Price', type: 'string', description: 'e.g. "$99"' }),
		defineField({ name: 'priceNote', title: 'Price Note', type: 'string', description: 'e.g. "One-time enrollment"' }),
		defineField({ name: 'badge', title: 'Status Badge', type: 'string', description: 'For non-available cards, e.g. "Video course coming soon".' }),
		defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string', description: 'e.g. "Enroll now" / "Notify me"' }),
		defineField({ name: 'ctaHref', title: 'CTA Link', type: 'string', description: 'URL or on-page anchor like #subscribe' }),
		defineField({ name: 'order', title: 'Display Order', type: 'number' }),
		defineField({
			name: 'lessons',
			title: 'Lessons (Curriculum)',
			type: 'array',
			description: 'Shown in the "Inside Level One" curriculum section for the primary course.',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'number', title: 'Number Label', type: 'string', description: 'e.g. "Lesson One"' },
						{ name: 'title', title: 'Title', type: 'string' },
						{ name: 'description', title: 'Description', type: 'text', rows: 3 },
					],
					preview: { select: { title: 'title', subtitle: 'number' } },
				},
			],
		}),
	],
	orderings: [
		{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
	],
	preview: { select: { title: 'title', subtitle: 'level' } },
});
