type Slug = string;

export interface Metadata {
	title: string;
	date: Date;
}

export interface BlogPage {
	slug: Slug;
	meta: Metadata;
}

class BlogIndex {
	pageMap: Map<Slug, BlogPage>;
	sortedByDate: BlogPage[]; // sorted newest to oldest
	indexMap: Map<Slug, number>; // 0 = newest, n-1 = oldest

	constructor(pages: BlogPage[]) {
		this.pageMap = new Map(pages.map((p) => [p.slug, p]));
		this.sortedByDate = [...pages].sort((a, b) => b.meta.date.getTime() - a.meta.date.getTime());
		this.indexMap = new Map(this.sortedByDate.map((p, i) => [p.slug, i]));
	}

	newer(slug: Slug): BlogPage | null {
		const index = this.indexMap.get(slug);
		if (index === undefined) {
			throw new Error(`could not find slug ${slug} in index map`);
		}
		if (index === 0) {
			return null;
		}
		return this.sortedByDate[index - 1];
	}

	older(slug: Slug): BlogPage | null {
		const index = this.indexMap.get(slug);
		if (index === undefined) {
			throw new Error(`could not find slug ${slug} in index map`);
		}
		if (index === this.sortedByDate.length - 1) {
			return null;
		}
		return this.sortedByDate[index + 1];
	}
}

const slugRegex = /\/src\/routes\/blog\/\(page\)\/(.+)\/\+page\.svelte/;

function processPages() {
	const modules = import.meta.glob("$routes/blog/*/**/+page.svelte", { eager: true });
	const pages: BlogPage[] = [];
	for (const [key, value] of Object.entries(modules)) {
		const slugMatch = slugRegex.exec(key);
		if (slugMatch === null) {
			console.warn(`Slug ${key} did not match regex, skipping!`);
			continue;
		}
		const slug = slugMatch[1];
		const module = value as { metadata: Metadata };
		pages.push({
			slug,
			meta: module.metadata
		});
	}
	console.log(`Found ${pages.length} pages`);
	return new BlogIndex(pages);
}

export default processPages();
