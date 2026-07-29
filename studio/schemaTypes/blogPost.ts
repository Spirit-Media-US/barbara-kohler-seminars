import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'blogPost',
	title: 'Blog Posts',
	type: 'document',
	fields: [
		defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: { source: 'title', maxLength: 96 },
			validation: (r) => r.required(),
		}),
		defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
		defineField({
			name: 'heroImage',
			title: 'Hero Image',
			type: 'image',
			options: { hotspot: true },
			fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
		}),
		defineField({ name: 'author', title: 'Author', type: 'string', initialValue: 'Barbara Kohler' }),
		defineField({ name: 'publishDate', title: 'Publish Date', type: 'date' }),
		defineField({
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [{ type: 'string' }],
			options: { layout: 'tags' },
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
		defineField({ name: 'seoTitle', title: 'SEO Title', type: 'string' }),
		defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 }),
	],
	orderings: [
		{ title: 'Publish date, new→old', name: 'dateDesc', by: [{ field: 'publishDate', direction: 'desc' }] },
	],
	preview: { select: { title: 'title', subtitle: 'publishDate', media: 'heroImage' } },
});
