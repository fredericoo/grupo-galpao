import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import useSWR from "swr";
import { groupHasItems } from "utils/groups";
import { Client } from "utils/prismicHelpers";
import Grid from "components/Grid/Grid";
import Text from "components/Text/Text";
import Columns from "components/Columns/Columns";
import { formatDateRange } from "components/ShowThumb/utils/dateUtils";
import moment from "moment";

const FutureDates = ({ uid }) => {
	const { t } = useTranslation();
	const { locale } = useRouter();

	async function fetcher(uid) {
		const client = Client();
		const doc = await client.getByUID("show", uid, {
			lang: locale,
		});
		return doc.data.dates.filter(
			(range) =>
				range.dates_from && range.dates_to && !moment(range.dates_to).isBefore()
		);
	}

	const { data: futureDates, error } = useSWR(uid, fetcher, {
		revalidateOnFocus: false,
	});

	if (!error) {
		if (futureDates && groupHasItems(futureDates)) {
			return (
				<Grid.Col md="col-2 / col-12" lg="col-3 / col-11" className="c-fg">
					<dl>
						<dt className="h-3">
							{t(
								`common:proximasDatas${
									futureDates.length > 1 ? ".plural" : ".singular"
								}`
							)}
						</dt>
						<Columns sm={1} lg={2}>
							{futureDates.map((range, key) => (
								<dd key={key}>
									<h3 className="h-2">
										{formatDateRange(range.dates_from, range.dates_to, [
											(date) => date.format("MMM"),
											(date) => date.format("DD"),
										])}
									</h3>
									<p>
										{formatDateRange(range.dates_from, range.dates_to, [
											(date) => date.format("hh:mm"),
										])}
									</p>
									<div className="fs-xs my-1">
										<h4 className="h-4">
											<Text content={range.dates_place} asText />
										</h4>
										<address>
											<Text content={range.dates_address} />
										</address>
									</div>
								</dd>
							))}
						</Columns>
					</dl>
				</Grid.Col>
			);
		}
	}
	return null;
};

export default FutureDates;
