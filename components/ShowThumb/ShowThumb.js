import styles from "./ShowThumb.module.scss";
import Grid from "components/Grid/Grid";
import Placeholder from "components/Placeholder/Placeholder";
import { groupHasItems } from "utils/groups";
import Text from "components/Text/Text";
import useTranslation from "next-translate/useTranslation";
import { hrefResolver } from "prismic-configuration";
import Link from "next/link";

const ShowThumb = ({ doc }) => {
	const data = doc.data;
	const { t } = useTranslation();

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
					</Grid.Col>
				</Grid>
			</a>
		</Link>
	);
};

export default ShowThumb;
