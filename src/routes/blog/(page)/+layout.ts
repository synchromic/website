
import { error } from "@sveltejs/kit";
import blogPages from "../blogPages";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ route }) => {
	const slug = route.id.split("/").at(-1)!;
	const pages = await blogPages;
	const page = pages.pageMap.get(slug);
	if (page === undefined) {
		error(404, {
			message: "Not found"
		});
	}
	return {
		...page,
		newer: pages.newer(slug),
		older: pages.older(slug),
	}
}
