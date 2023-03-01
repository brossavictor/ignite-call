export function getDaysOfTheWeek() {
	const formatter = new Intl.DateTimeFormat("en-CA", { weekday: "long" });

	return Array.from(Array(7).keys())
		.map((day) => formatter.format(new Date(Date.UTC(2021, 5, day))))
		.map((dayOfTheWeek) => {
			return dayOfTheWeek
				.substring(0, 1)
				.toUpperCase()
				.concat(dayOfTheWeek.substring(1));
		});
}
