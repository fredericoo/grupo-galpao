import styles from "./Footer.module.scss";
import useTranslation from "next-translate/useTranslation";
import { hrefResolver } from "prismic-configuration";

import Image from "next/image";
import Link from "next/link";
import Grid from "components/Grid/Grid";
import Text from "components/Text/Text";
import ColourSection from "components/ColourSection/ColourSection";
import useIsInViewport from "use-is-in-viewport";
import { groupHasItems } from "utils/groups";
import { useConfig } from "utils/hooks/useConfig";

const Footer = () => {
	const { t } = useTranslation();
	const { data: config } = useConfig();
	const [inView, ref] = useIsInViewport({
		modBottom: "-50%",
		modTop: "-49.9%",
	});

	return (
		<ColourSection bg="#f0f0f0" fg="#131314">
			<footer ref={ref} className={`${styles.section}`}>
				<h2 className="visually-hidden">{t("common:footer")}</h2>
				<Grid className="s-sm c-fg">
					<Grid.Col rowLg="1">
						{config && config.social && (
							<div className={styles.social}>
								{config.social
									.filter(
										(item) => item.icone && (item.link.url || item.link.uid)
									)
									.map((item, index) => (
										<Link key={index} href={hrefResolver(item.link)} passHref>
											<a>
												<img src={item.icone.url} />
											</a>
										</Link>
									))}
							</div>
						)}
					</Grid.Col>
					<Grid.Col
						className={`py-2 ${styles.sponsors} ${
							inView ? "" : styles.invisible
						}`}
						lg="grid-start / col-10"
						rowLg="2"
						style={{ alignSelf: "end" }}
					>
						{config &&
							groupHasItems(config.patrocinio) &&
							config.patrocinio.map(
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
						{config && config.footer_text && (
							<div className="fs-xs c-fg">
								<Text content={config.footer_text} />
							</div>
						)}
					</Grid.Col>
					<Grid.Col sm="col-10 / screen-end" rowLg="2" className={styles.star}>
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
