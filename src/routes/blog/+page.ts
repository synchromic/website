import type { PageLoad } from "./$types";
import blogIndex from "$lib/blogIndex";

export const load: PageLoad = async () => {
	return {
		pages: blogIndex.sortedByDate,
	};
};
