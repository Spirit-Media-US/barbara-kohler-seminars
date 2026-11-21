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
	return protectEmails(out.join(''));
}

// Kevin 2026-11-20 RULE: "we DO NOT ever post emails directly on any of our websites ... I always says
// mailto: link." CMS copy may carry an address (a mailto: link whose text is the address, or a bare
// address). Neither may reach the HTML: each becomes a link that carries the address split
// (data-mu / data-md, the MailtoLink pattern — the MailtoLink script in the Layout writes the mailto:
// in the browser) with WORDS as its text.
const EMAIL_RX = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g;
const EMAIL_TEST = new RegExp(EMAIL_RX.source);
const GENERIC = new Set(['info', 'office', 'hello', 'support', 'contact', 'admin', 'team', 'help']);
function emailLabel(addr: string): string {
	const local = addr.split('@')[0].split(/[._-]/)[0].toLowerCase();
	return GENERIC.has(local) ? 'email us' : local.charAt(0).toUpperCase() + local.slice(1);
}
function splitLink(addr: string, label: string): string {
	const [u, d] = addr.split('@');
	return `<a href="#" data-mu="${u}" data-md="${d}">${label}</a>`;
}
export function protectEmails(html: string): string {
	const linked = html.replace(/<a href="mailto:([^"?]+)[^"]*"[^>]*>([\s\S]*?)<\/a>/gi, (_m, addr: string, text: string) =>
		splitLink(addr, EMAIL_TEST.test(text) || !text.trim() ? emailLabel(addr) : text),
	);
	// Bare addresses left in text (never inside a tag: split on tags first).
	return linked
		.split(/(<[^>]+>)/)
		.map((part) => (part.startsWith('<') ? part : part.replace(EMAIL_RX, (a) => splitLink(a, emailLabel(a)))))
		.join('');
}
