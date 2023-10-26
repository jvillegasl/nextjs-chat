export function getPictureURL(name: string) {
	const BASE_URL = "https://ui-avatars.com/api/?";

	const searchParams = new URLSearchParams({ name });

	return BASE_URL + searchParams;
}
