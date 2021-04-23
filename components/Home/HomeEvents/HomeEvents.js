import { useState, useEffect } from "react";

import styles from "./HomeEvents.module.scss";

import useSWR from "swr";
import { fetchAllOfType } from "utils/prismicHelpers";
import moment from "moment";

import ColourSection from "components/ColourSection/ColourSection";
import Grid from "components/Grid/Grid";
import EventRow from "components/EventRow/EventRow";
import { groupHasItems } from "utils/groups";
import Text from "components/Text/Text";
import Button from "components/Button/Button";
import Loader from "components/Loader/Loader";

const getFutureFrom = (events) =>
	events.filter(
		(event) =>
			groupHasItems(event.data.dates) &&
			!!event.data.dates.filter(
				(range) =>
					range.dates_from &&
					range.dates_to &&
					!moment(range.dates_to).isBefore()
			).length
	);

const HomeEvents = ({ title, cta }) => {
	const { data: shows, error: errorShows } = useSWR("show", fetchAllOfType, {
		revalidateOnFocus: false,
	});
	const { data: events, error: errorEvents } = useSWR("event", fetchAllOfType, {
		revalidateOnFocus: false,
	});

	const [futureEvents, setFutureEvents] = useState([]);

	useEffect(() => {
		shows && events && setFutureEvents(getFutureFrom([...shows, ...events]));
	}, [shows, events]);

	return (
		<ColourSection bg="#1B3ECC" fg="#f5f5f5">
			<Grid className="py-5">
				<Grid.Col lg="grid-start / col-5" xl="col-3 / col-6">
					<h2 className="h-1 c-fg ff-condensed ta-lg-right">
						<Text asText content={title} />
					</h2>
				</Grid.Col>
				<Grid.Col lg="col-5 / grid-end" xl="col-7 / grid-end" className="c-fg">
					<div className="mb-4">
						{!errorEvents && !events && !errorShows && !shows ? (
							<Loader />
						) : (
							futureEvents
								.slice(0, 3)
								.map((event, key) => (
									<EventRow key={key} event={event} length={1} />
								))
						)}
					</div>
					<div className="ta-center">
						<Button type="ghost" href="/agenda">
							<Text content={cta} asText />
						</Button>
					</div>
				</Grid.Col>
			</Grid>
		</ColourSection>
	);
};

export default HomeEvents;
