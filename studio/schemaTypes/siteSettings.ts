import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'siteSettings',
	title: 'Site Settings',
	type: 'document',
	fields: [
		defineField({ name: 'siteName', title: 'Site Name', type: 'string' }),
		defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
		defineField({
			name: 'topBar',
			title: 'Top Bar Message',
			type: 'string',
			description: 'The thin bar above the nav (e.g. "Questions about a class? Call …").',
		}),
		defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
		defineField({ name: 'barbaraEmail', title: "Barbara's Email", type: 'string' }),
		defineField({ name: 'address', title: 'Address', type: 'text', rows: 3 }),
		defineField({ name: 'youtube', title: 'YouTube URL', type: 'url' }),
		defineField({ name: 'facebook', title: 'Facebook URL', type: 'url' }),
		defineField({
			name: 'kohlerGroupUrl',
			title: 'The Kohler Group URL',
			type: 'url',
			description: "Link to Barbara's counseling practice.",
		}),
		defineField({ name: 'footerBlurb', title: 'Footer Blurb', type: 'text', rows: 3 }),
		defineField({
			name: 'logo',
			title: 'Logo',
			type: 'image',
			description: 'White wordmark for the dark nav/footer.',
		}),
		defineField({
			name: 'ogImage',
			title: 'Default Social Share Image',
			type: 'image',
		}),
	],
	preview: { prepare: () => ({ title: 'Site Settings' }) },
});
