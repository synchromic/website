const shortFormatter = new Intl.DateTimeFormat("en", {
	month: "2-digit",
	day: "numeric",
});

export function formatShortDate(date: Date) {
	return shortFormatter.format(date);
}

const longFormatter = new Intl.DateTimeFormat("en", {
	dateStyle: "long",
	timeStyle: "long",
});

export function formatLongDate(date: Date) {
	return longFormatter.format(date);
}
