import { useState, useEffect, useMemo } from "react";
import useTranslation from "next-translate/useTranslation";

import { fetchAllOfType } from "utils/prismicHelpers";
import { groupHasItems } from "utils/groups";
import moment from "moment";

import Meta from "components/Meta/Meta";

import ColourSection from "components/ColourSection/ColourSection";
import Grid from "components/Grid/Grid";
import Text from "components/Text/Text";
import EventRow from "components/EventRow/EventRow";
import Calendar from "components/Calendar/Calendar";
import useSWR from "swr";

const splitEventDates = (event) =>
	event.data.dates.map((range) => ({
		...event,
		data: {
			...event.data,
			dates: event.data.dates.filter((range2) => range === range2),
		},
	}));

const Agenda = () => {
	const { data: shows } = useSWR("show", fetchAllOfType);
	const { data: events } = useSWR("events", fetchAllOfType);

	const { t } = useTranslation();
	const [selectedDate, setDate] = useState();
	const [visibleEvents, setVisibleEvents] = useState([]);

	const markedDates = useMemo(
		() =>
			visibleEvents
				.map((event) =>
					event.data.dates
						.map((range) => {
							return new Array(
								moment(range.dates_to).diff(range.dates_from, "days")
							)
								.fill()
								.map((_, i) =>
									moment(range.dates_from).add(i, "d").format("YYYY-MM-DD")
								);
						})
						.flat()
				)
				.flat(),
		[visibleEvents]
	);

	const handleChange = (e) => e.target && setDate(e.target.value);

	useEffect(() => setDate(moment().format("YYYY-MM-DD")), []);
	useEffect(
		() =>
			shows &&
			events &&
			setVisibleEvents(
				[...shows, ...events]
					?.map((event) => splitEventDates(event))
					.flat()
					.filter(
						(event) =>
							groupHasItems(event.data.dates) &&
							!!event.data.dates.filter(
								(range) =>
									moment(range.dates_to).format("MM YYYY") ===
										moment(selectedDate, "YYYY-MM-DD").format("MM YYYY") ||
									moment(range.dates_from).format("MM YYYY") ===
										moment(selectedDate, "YYYY-MM-DD").format("MM YYYY")
							).length
					)
			),
		[selectedDate, shows, events]
	);

	return (
		<ColourSection bg="#1b3ecc" fg="#f5f5f5">
			<Meta />
			<Grid className="c-fg py-3">
				<Grid.Col>
					<h1 className="h-1">
						<Text content="Agenda" asText />
					</h1>
				</Grid.Col>
				<Grid.Col
					className="mb-4"
					lg="grid-start / col-7"
					xl="grid-start / col-5"
				>
					<Calendar
						onChange={handleChange}
						value={selectedDate}
						markedDates={markedDates}
					/>
				</Grid.Col>
				<Grid.Col lg="col-7 / grid-end" xl="col-5 / grid-end">
					<h2 className="visually-hidden">
						{t("common:eventosEm")}{" "}
						{moment(selectedDate, "YYYY-MM-DD").format("MMMM")}
					</h2>
					{visibleEvents.map((event, key) => (
						<EventRow key={key} event={event} />
					))}
				</Grid.Col>
			</Grid>
		</ColourSection>
	);
};

export default Agenda;
