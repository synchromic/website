import { error } from "@sveltejs/kit";
import blogIndex from "$lib/blogIndex";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ route }) => {
	const slug = route.id.split("/").at(-1)!;
	const page = blogIndex.pageMap.get(slug);
	if (page === undefined) {
		error(404, {
			message: "Not found"
		});
	}
	return {
		...page,
		newer: blogIndex.newer(slug),
		older: blogIndex.older(slug)
	};
};
