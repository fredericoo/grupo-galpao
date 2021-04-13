import { Client } from "utils/prismicHelpers";
import styles from "./ShowThumb.module.scss";

import { groupHasItems } from "utils/groups";
import useTranslation from "next-translate/useTranslation";
import { hrefResolver } from "prismic-configuration";
import { formatDateRange } from "./utils/dateUtils";
import moment from "moment";

import Link from "next/link";

import Placeholder from "components/Placeholder/Placeholder";
import Grid from "components/Grid/Grid";
import Text from "components/Text/Text";
import Columns from "components/Columns/Columns";
import useSWR from "swr";
import { useRouter } from "next/router";

const ShowThumb = ({ doc }) => {
	const data = doc.data;
	const { t } = useTranslation();
	const client = Client();

	async function fetcher(uid) {
		const filme = await client.getByUID("show", uid);
		console.log(uid, filme);
		if (!filme) return [];
		return filme.data.dates.filter((range) => !moment(range.to).isBefore());
	}
	const { data: futureDates, error } = useSWR(doc.uid, fetcher);

	return (
		<Link href={hrefResolver(doc)}>
			<a className={styles.link}>
				<Grid subgrid>
					<Grid.Col md="grid-start / col-7" className={styles.image}>
						{data.cover?.url && (
							<Placeholder
								src={data.cover.url}
								width={data.cover.dimensions.width}
								height={data.cover.dimensions.height}
								alt={data.cover.alt}
								layout="responsive"
								bg="var(--fg)"
							/>
						)}
					</Grid.Col>
					<Grid.Col md="col-7 / grid-end">
						{groupHasItems(data.activity) && (
							<p className={styles.activity}>
								{data.activity.map((entry, key) => (
									<span className={styles.year} key={key}>
										{entry.activity_from}
										{entry.activity_to && ` — ${entry.activity_to}`}
									</span>
								))}
							</p>
						)}
						{data.title && (
							<h2 className={`h-2 mb-1 ${styles.title}`}>
								<span>
									<Text content={data.title} asText />
								</span>
							</h2>
						)}
						{data.short && (
							<div className="body fs-sm mb-1">
								<Text asText content={data.short} />
							</div>
						)}
						<Columns sm={1} md={2}>
							{groupHasItems(data.directors) && (
								<dl>
									<dt className="h-3">{t("common:direcao")}</dt>
									<dd>
										<Text
											content={data.directors
												.map((director) => director.directors_name)
												.join(", ")}
										/>
									</dd>
								</dl>
							)}
							{!error && futureDates && !!futureDates.length && (
								<dl>
									<dt className="h-3">
										{t(
											`common:proximasDatas${
												futureDates.length > 1 ? ".plural" : ".singular"
											}`
										)}
									</dt>
									{futureDates.map((range, key) => (
										<dd key={key}>
											{formatDateRange(range.dates_from, range.dates_to, [
												(date) => date.format("YYYY"),
												(date) => date.format("MMM"),
												(date) => date.format("DD"),
											])}
										</dd>
									))}
								</dl>
							)}
						</Columns>
					</Grid.Col>
				</Grid>
			</a>
		</Link>
	);
};

export default ShowThumb;
