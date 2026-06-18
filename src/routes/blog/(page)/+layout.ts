
import blogPages from "../blogPages";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ route }) => {
	const slug = route.id.split("/").at(-1)!;
	const pages = await blogPages;
	const page = pages.pageMap[slug];
	return {
		...page,
		newer: pages.newerMeta(slug),
		older: pages.olderMeta(slug),
	}
}
