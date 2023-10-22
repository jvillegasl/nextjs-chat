import moment from "moment";

export function getMessageHour(dateUTC: string) {
	const date = moment.utc(dateUTC).local();

	return date.format("HH:mm");
}
