import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'testimonial',
	title: 'Testimonials',
	type: 'document',
	fields: [
		defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (r) => r.required() }),
		defineField({ name: 'name', title: 'Name', type: 'string' }),
		defineField({ name: 'role', title: 'Role / Location', type: 'string' }),
		defineField({ name: 'order', title: 'Display Order', type: 'number' }),
	],
	orderings: [
		{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
	],
	preview: { select: { title: 'name', subtitle: 'quote' } },
});
