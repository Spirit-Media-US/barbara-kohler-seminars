// Shared Portable Text → HTML renderer.
//
// Extracted from src/pages/blog/[slug].astro so every Sanity-driven page (blog
// posts, legal pages, the Meet Barbara practice note) renders the same subset
// of blocks and marks. Keep this the single implementation — a second copy is
// how the blog and the legal pages drift apart.

export function escapeHtml(s: string): string {
	return String(s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

export function sanitizeUrl(url: string): string {
	const t = String(url).trim();
	return /^(https?:|mailto:|tel:|\/|#)/i.test(t) ? t : '#';
}

// Only off-site links open in a new tab. Internal paths, anchors, mailto: and
// tel: stay in-tab (a new tab for /refund-policy or a mailto is just noise).
function isExternal(href: string): boolean {
	return /^https?:/i.test(href);
}

export function renderPortableText(blocks: any[]): string {
	if (!Array.isArray(blocks)) return '';
	const renderChildren = (children: any[], markDefs: any[]): string =>
		children
			.map((child: any) => {
				if (!child) return '';
				let text = escapeHtml(child.text || '');
				const marks = Array.isArray(child.marks) ? child.marks : [];
				if (marks.includes('strong')) text = `<strong>${text}</strong>`;
				if (marks.includes('em')) text = `<em>${text}</em>`;
				// A link is either an inline object (legacy shape) or a _key
				// reference into the block's markDefs (what the Studio writes).
				let link: any = marks.find((m: any) => m && typeof m === 'object' && m._type === 'link');
				if (!link) {
					for (const m of marks) {
						if (typeof m !== 'string') continue;
						const def = markDefs.find((d: any) => d?._key === m && d?._type === 'link');
						if (def) {
							link = def;
							break;
						}
					}
				}
				if (link?.href) {
					const href = escapeHtml(sanitizeUrl(link.href));
					const attrs = isExternal(link.href) ? ' target="_blank" rel="noopener noreferrer"' : '';
					text = `<a href="${href}"${attrs}>${text}</a>`;
				}
				return text;
			})
			.join('');

	const out: string[] = [];
	let buf: string[] = [];
	let listType: string | null = null;
	const flush = () => {
		if (!buf.length) return;
		const tag = listType === 'number' ? 'ol' : 'ul';
		out.push(`<${tag}>${buf.join('')}</${tag}>`);
		buf = [];
		listType = null;
	};
	for (const block of blocks) {
		if (!block || block._type !== 'block') {
			flush();
			continue;
		}
		const children = Array.isArray(block.children) ? block.children : [];
		const markDefs = Array.isArray(block.markDefs) ? block.markDefs : [];
		const html = renderChildren(children, markDefs);
		if (block.listItem) {
			if (listType && listType !== block.listItem) flush();
			listType = block.listItem;
			buf.push(`<li>${html}</li>`);
			continue;
		}
		flush();
		const style = block.style || 'normal';
		if (style === 'h2') out.push(`<h2>${html}</h2>`);
		else if (style === 'h3') out.push(`<h3>${html}</h3>`);
		else if (style === 'blockquote') out.push(`<blockquote>${html}</blockquote>`);
		else out.push(`<p>${html}</p>`);
	}
	flush();
	return out.join('');
}
