/* Footnotes are implemented as follows:

   Articles are all wrapped in a FootnoteWrapper, which uses Svelte's context system
   to keep track of footnote numbers.

	 In the text, use <Footnote name="blah">blah blah blah</Footnote> to write a footnote. It will appear as
	 a superscripted number with a link to the actual footnote.

	 Near the bottom, inside the FootnoteWrapper, put a <FootnoteList /> element, which will contain
	 the actual texts of the footnotes. (This is done in the blog page +layout.svelte.)

   For implementation, we use <a href="#fn:name" /> and <a href="#fnref:name" /> for the links.

	 At first, I wanted a design where I have footnote references in the text and then putting the
	 actual footnote body at the bottom, but it seemed rather unclean to track all the references
	 and all the backlinks, so I went with this simpler design instead.

	 Credit to https://shkspr.mobi/blog/2020/07/usability-of-footnotes/ for some design stuff
*/

import { createContext, type Snippet } from "svelte";
import { SvelteMap } from "svelte/reactivity";

// When rendering the list, we need to sort the footnotes by their index.
interface FootnoteListItem {
	name: string;
	index: number;
	snippet: Snippet;
}

export class FootnoteContext {
	// Maps from a name to a footnote number (index).
	indices: SvelteMap<string, number>;
	private indexCounter = 1;

	snippets: SvelteMap<string, Snippet>;

	constructor() {
		this.indices = new SvelteMap();
		this.snippets = new SvelteMap();
	}

	// If multiple footnotes are given the same name, it uses the first index but the last snippet.
	// I could make it error in this case but I prefer idempotency.
	// Returns the index.
	addFootnote(name: string, children: Snippet): number {
		let index = this.indices.get(name);
		if (index === undefined) {
			index = this.indexCounter++;
			this.indices.set(name, index);
		}
		this.snippets.set(name, children);
		return index;
	}

	// Returns a list of footnote items, sorted by index.
	getFootnoteList(): FootnoteListItem[] {
		return this.indices
			.entries()
			.map(([name, index]) => ({
				name,
				index,
				snippet: this.snippets.get(name)!,
			}))
			.toArray()
			.sort((a, b) => a.index - b.index);
	}

	// We need to reset this component on navigates because otherwise footnotes
	// are preserved between pages.
	reset() {
		this.indices.clear();
		this.snippets.clear();
		this.indexCounter = 1;
	}
}

export const [getFootnoteContext, setFootnoteContext] = createContext<FootnoteContext>();
