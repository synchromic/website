import { error } from "@sveltejs/kit";
import blogIndex from "$lib/blogIndex";
import type { LayoutLoad } from "./$types";

const slugRegex = /\/blog\/\(page\)\/(.+)/;

export const load: LayoutLoad = async ({ route }) => {
	const slugMatch = slugRegex.exec(route.id);
	if (slugMatch === null) {
		error(404, {
			message: "Not found"
		});
	}
	const slug = slugMatch[1];
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
