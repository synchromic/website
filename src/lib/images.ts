const urls = import.meta.glob(["/src/lib/assets/**/*.png", "/src/lib/assets/**/*.webp"], {
	query: "?url",
	import: "default",
	eager: true,
});

export function getUrls(path: string) {
	return {
		png: urls[`/src/lib/assets/blog/${path}.png`] as string,
		webp: urls[`/src/lib/assets/blog/${path}.webp`] as string,
	};
}
