export interface Metadata {
  title: string;
  date: string;
}

export interface BlogPage {
  slug: string;
  meta: Metadata;
}

class BlogPages {
  pageMap: { [slug: string]: BlogPage };
  dateSorted: string[];
  indexMap: { [slug: string]: number };

  constructor(pages: BlogPage[]) {
    this.pageMap = Object.fromEntries(pages.map(p => [p.slug, p]));
    this.dateSorted = pages.sort((a, b) => a.meta.date.localeCompare(b.meta.date)).map(p => p.slug);
    this.indexMap = Object.fromEntries(this.dateSorted.map((p, i) => [p, i]));
  }

  newerMeta(slug: string): BlogPage | null {
    const index = this.indexMap[slug];
    if (index === this.dateSorted.length - 1) {
      return null;
    }
    return this.pageMap[this.dateSorted[index + 1]];
  }

  olderMeta(slug: string): BlogPage | null {
    const index = this.indexMap[slug];
    if (index === 0) {
      return null;
    }
    return this.pageMap[this.dateSorted[index - 1]];
  }
}

async function processPages() {
  const modules = import.meta.glob("./*/*/+page.svelte");
  const pages: BlogPage[] = [];
  for (const [key, value] of Object.entries(modules)) {
    const slug = key.split("/")[2];
    const module = await value() as { metadata: Metadata };
    pages.push({
      slug,
      meta: module.metadata,
    });
  }
  return new BlogPages(pages);
}

export default processPages();
