import moment from "moment";

export function getLastMessageDate(dateUTC: string) {
	const date = moment.utc(dateUTC).local();
	const currentDate = moment();

	const diffDays = currentDate.diff(date, "days");

	if (diffDays < 1) {
		return date.format("HH:mm");
	}

	if (diffDays < 7) {
		return date.format("dddd");
	}

	return date.format("DD/MM/YYYY");
}
