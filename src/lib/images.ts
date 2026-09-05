const urls = import.meta.glob(
	["/src/lib/assets/**/*.png", "/src/lib/assets/**/*.jpg", "/src/lib/assets/**/*.webp"],
	{
		query: "?url",
		import: "default",
		eager: true,
	},
);

export function getUrls(path: string) {
	const fullPath = `/src/lib/assets/${path}`;
	return {
		jpg: urls[`${fullPath}.jpg`] as string | undefined,
		png: urls[`${fullPath}.png`] as string | undefined,
		webp: urls[`${fullPath}.webp`] as string | undefined,
	};
}
