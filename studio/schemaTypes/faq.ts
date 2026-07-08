import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'faq',
	title: 'FAQs',
	type: 'document',
	fields: [
		defineField({ name: 'question', title: 'Question', type: 'string', validation: (r) => r.required() }),
		defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4 }),
		defineField({ name: 'order', title: 'Display Order', type: 'number' }),
	],
	orderings: [
		{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
	],
	preview: { select: { title: 'question' } },
});
