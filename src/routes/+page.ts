import type { PageLoad } from "./$types";
import blogIndex from "$lib/blogIndex";

const NUM_RECENT_POSTS = 7;

export const load: PageLoad = async () => {
	return {
		recent: blogIndex.sortedByDate.slice(0, NUM_RECENT_POSTS)
	};
};
