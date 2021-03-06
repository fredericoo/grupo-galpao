import styles from "./EventRow.module.scss";

import { groupHasItems } from "utils/groups";
import { hrefResolver } from "prismic-configuration";

import Text from "components/Text/Text";
import Grid from "components/Grid/Grid";
import DateRange from "components/DateRange/DateRange";
import Link from "next/link";

export const EventRow = ({ event, length }) => (
	<>
		{groupHasItems(event.data.dates) &&
			event.data.dates
				.slice(0, length || event.data.dates.length)
				.map((range, key) => (
					<Grid key={key} subgrid className="mb-2">
						<Grid.Col sm="span 4" className="h-3 ff-condensed ta-lg-right">
							<DateRange
								from={range.dates_from}
								to={range.dates_to}
								formats={[
									(date) => date.format("MMM"),
									(date) => date.format("DD"),
								]}
							/>
						</Grid.Col>
						<Grid.Col sm="col-5 / grid-end">
							<div className="h-5">
								<Text content={event.data.type || "Espetáculo"} asText />
							</div>
							<Link href={hrefResolver(event)}>
								<a className={styles.link}>
									<h3 className={`h-3 mb-2`}>
										<span className="">
											<Text content={event.data.title} asText />
										</span>
									</h3>
								</a>
							</Link>
							<div className="fs-sm">
								<h4 className="h-3">
									<Text asText content={range.dates_place} />
								</h4>
								<div className="body">
									<Text content={range.dates_address} />
								</div>
							</div>
						</Grid.Col>
					</Grid>
				))}
	</>
);

export default EventRow;
