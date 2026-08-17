/* Footnotes are implemented as follows:

   Articles are all wrapped in a FootnoteWrapper, which uses Svelte's context system
   to keep track of footnote numbers.

   In the text, use <FootnoteRef id="someString" /> to refer to a footnote, defined in the footer.

   At the bottom of the page (or anywhere after the ref, but bottom makes the most sense), use
   <Footnote id="someString">blah blah blah</Footnote>
   to write the actual text of the footnote. The FootnoteRef will link to the Footnote,
   and the Footnote will have a backlink to the FootnoteRef.

   Multiple references are supported, the footnote will contain a list of sequential backlinks.

   For implementation, we use <a href="#id" /> for the links. We generate unique ids for each
   footnote and ref, of the form `footnoteNUM` and `footnoteNUMrefNUM`. Instead of the string id, we
   use the numerical index; the string id is more of an implemetation detail as only the numerical
   id is actually displayed. These numbers should all be 1-indexed.

	 Having the id as a string is useful for letting you move references around the document without
	 worrying about screwing up the ordering of the footnote numbers.

	 I'm separating footnotes and references for two reasons: first, so that footnotes can
	 be referred to multiple times (useful for citations, though I don't know how often I'll
	 actually use this), and because I want the blog code to look as similar to the output as possible.
	 Having inline footnotes may be more convenient, but it kinda makes the text look weird with an
	 interjection in the middle of the sentence, and I think having it placed like in a real article
	 will make it more natural to look at.

	 There is no error checking for if a reference actually refers to a footnote, so be diligent.
*/

import { createContext } from "svelte";

export class FootnoteContext {
	// Stores the number of references of any id.
	refs: Map<string, number>;

	// Maps from an id to a footnote number (index). This is set by the reference or
	// the footnote itself, depending on which is loaded first.
	indices: Map<string, number>;

	constructor() {
		this.refs = new Map();
		this.indices = new Map();
	}

	getOrAddIndex(id: string) {
		let index = this.indices.get(id);
		if (index === undefined) {
			index = this.indices.size + 1;
			this.indices.set(id, index);
		}
		return index;
	}

	// Returns the new count
	addRef(id: string): number {
		let oldCount = this.refs.get(id) ?? 0;
		this.refs.set(id, oldCount + 1);
		return oldCount + 1;
	}

	getRefCount(id: string): number {
		return this.refs.get(id) ?? 0;
	}
}

export const [getFootnoteContext, setFootnoteContext] = createContext<FootnoteContext>();
