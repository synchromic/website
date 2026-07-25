const urls = import.meta.glob(["/src/lib/assets/**/*.png", "/src/lib/assets/**/*.jpg", "/src/lib/assets/**/*.webp"], {
	query: "?url",
	import: "default",
	eager: true,
});

export function getUrls(path: string) {
	const extension = path.endsWith(".jpg") ? "jpg" : "png";
	const fixedPath = path.endsWith(".jpg") ? path.slice(0, -4) : path;
	const fullPath = `/src/lib/assets/blog/${fixedPath}`;
	return {
		original: urls[`${fullPath}.${extension}`] as string,
		webp: urls[`${fullPath}.webp`] as string,
	};
}
