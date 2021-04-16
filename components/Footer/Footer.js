import styles from "./Footer.module.scss";
import useTranslation from "next-translate/useTranslation";
import { hrefResolver } from "prismic-configuration";
import { Client } from "utils/prismicHelpers";
import useSWR from "swr";

import Image from "next/image";
import Grid from "components/Grid/Grid";
import Columns from "components/Columns/Columns";
import { useRouter } from "next/router";
import Text from "components/Text/Text";
import ColourSection from "components/ColourSection/ColourSection";
import useIsInViewport from "use-is-in-viewport";
import { groupHasItems } from "utils/groups";

const Footer = () => {
	const { t } = useTranslation();
	const { locale } = useRouter();
	const [inView, ref] = useIsInViewport({
		modBottom: "-50%",
		modTop: "-49.9%",
	});

	async function fetcher(uid) {
		const client = Client();
		const doc = await client.getSingle("config", {
			lang: locale,
			fetchLinks: ["logos.title", "logos.logos"],
		});
		return doc.data;
	}
	const { data, error } = useSWR("footer", fetcher, {
		revalidateOnFocus: false,
	});

	return (
		<ColourSection bg="#f0f0f0" fg="#131314">
			<footer ref={ref} className={`${styles.section}`}>
				<h2 className="visually-hidden">{t("common:footer")}</h2>
				<Grid className="s-sm c-fg">
					<Grid.Col
						className={`py-2 ${styles.sponsors} ${
							inView ? "" : styles.invisible
						}`}
						lg="grid-start / col-10"
						rowLg="1"
						style={{ alignSelf: "end" }}
					>
						{!error &&
							data &&
							groupHasItems(data.patrocinio) &&
							data.patrocinio.map(
								(sponsor, key) =>
									sponsor.group?.data && (
										<div key={key} className={styles.brandGroup}>
											<h3 className="h-4">
												<Text content={sponsor.group.data.title} asText />
											</h3>
											<ul>
												{sponsor.group.data.logos.map((item, key) => (
													<li key={key}>
														<Image
															src={item.logo.url}
															alt={item.logo.alt}
															layout="fill"
															objectFit="contain"
															objectPosition="left center"
														/>
													</li>
												))}
											</ul>
										</div>
									)
							)}
					</Grid.Col>
					<Grid.Col sm="col-10 / screen-end" rowLg="1" className={styles.star}>
						<Image
							src="/img/star.png"
							width="1080"
							height="1080"
							layout="responsive"
						/>
					</Grid.Col>
				</Grid>
			</footer>
		</ColourSection>
	);
};
export default Footer;
