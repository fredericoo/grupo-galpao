import { Client } from "utils/prismicHelpers";
import Prismic from "prismic-javascript";
import { groupHasItems } from "utils/groups";
import { RichText } from "prismic-reactjs";

import useTranslation from "next-translate/useTranslation";
import { motion } from "framer-motion";

import Meta from "components/Meta/Meta";
import Text from "components/Text/Text";
import ColourSection from "components/ColourSection/ColourSection";
import Grid from "components/Grid/Grid";
import Columns from "components/Columns/Columns";
import Placeholder from "components/Placeholder/Placeholder";
import Flow from "components/Flow/Flow";
import FutureDates from "components/FutureDates/FutureDates";
import { AvailableLocalesContext } from "utils/context";
import { useEffect, useContext } from "react";

export default function Post({ doc }) {
	const { t } = useTranslation();

	const [, setAvailableLocales] = useContext(AvailableLocalesContext);
	useEffect(() => doc && setAvailableLocales(doc.alternate_languages), [doc]);

	if (doc && doc.data) {
		const data = doc.data;
		return (
			<>
				<ColourSection bg={data.bg} fg={data.fg}>
					<Meta
						pageTitle={data.seo_title || RichText.asText(data.title)}
						pageDesc={data.seo_desc || RichText.asText(data.short)}
						pageImage={data.seo_img?.url || data.cover?.url}
					/>
					<Grid className="py-3">
						<Grid.Col
							style={{ overflow: "hidden" }}
							md="col-4 / col-10"
							lg="col-5 / col-9"
						>
							{data.logo?.url ? (
								<motion.figure
									key="logo"
									initial={{ translateY: "100%" }}
									animate={{ translateY: "0%" }}
									transition={{
										type: "spring",
										stiffness: 300,
										damping: 50,
									}}
								>
									<Placeholder
										src={data.logo.url}
										alt={data.logo.alt}
										width={data.logo.dimensions.width}
										height={data.logo.dimensions.height}
										layout="responsive"
										bg="transparent"
									/>
								</motion.figure>
							) : (
								data.title && (
									<motion.h1
										initial={{ translateY: "100%" }}
										animate={{ translateY: "0%" }}
										transition={{
											type: "spring",
											stiffness: 300,
											damping: 50,
										}}
										className={`h-2 c-fg py-1`}
									>
										<Text content={data.title} asText />
									</motion.h1>
								)
							)}
						</Grid.Col>

						{groupHasItems(data.carousel) && data.carousel[0].image.url && (
							<Grid.Col
								sm="screen-start / screen-end"
								md="col-2 / col-12"
								lg="col-3 / col-11"
							>
								<Placeholder
									src={data.carousel[0].image.url}
									width={data.carousel[0].image.dimensions.width}
									height={data.carousel[0].image.dimensions.height}
									alt={data.carousel[0].image.alt}
									layout="responsive"
									bg="var(--fg)"
								/>
							</Grid.Col>
						)}

						<FutureDates uid={doc.uid} />
						{data.long && (
							<Grid.Col
								md="col-2 / col-12"
								lg="col-3 / col-8"
								className="c-fg fs-sm"
							>
								<h2 className="h-3">{t("common:sinopse")}</h2>
								<div className="body">
									<Text content={data.long} />
								</div>
							</Grid.Col>
						)}
						<Grid.Col
							md="col-2 / col-12"
							lg="col-9 / col-11"
							className="c-fg fs-sm"
						>
							<Flow spacing="2rem">
								{groupHasItems(data.activity) && (
									<dl>
										<dt className="h-3">{t("common:ano")}</dt>
										{data.activity.map((entry, key) => (
											<dd key={key}>
												{entry.activity_from}
												{entry.activity_to && ` — ${entry.activity_to}`}
											</dd>
										))}
									</dl>
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
								{groupHasItems(data.info) &&
									data.info.map((entry, key) => (
										<dl key={key}>
											<dt className="h-3">
												<Text content={entry.info_label} />
											</dt>
											<dt>
												<Text content={entry.info_value} />
											</dt>
										</dl>
									))}
							</Flow>
						</Grid.Col>
					</Grid>
				</ColourSection>
				<ColourSection bg={data.fg} fg={data.bg}>
					<Grid className="c-fg">
						{groupHasItems(data.technical) && (
							<Grid.Col className="py-3">
								<h2 className="h-2 ta-center mb-3">
									{t("common:fichaTecnica")}
								</h2>
								<Columns sm="1" md="2" lg="4" className="fs-sm">
									{data.technical.map((entry, key) => (
										<dl key={key}>
											<dt className="h-3">
												<Text content={entry.technical_task} />
											</dt>
											<dt>
												<Text content={entry.technical_doer} />
											</dt>
										</dl>
									))}
								</Columns>
							</Grid.Col>
						)}
					</Grid>
				</ColourSection>
			</>
		);
	}
	return null;
}

export async function getStaticPaths() {
	const client = Client();
	const documents = await client.query([
		Prismic.Predicates.at("document.type", "show"),
	]);

	return {
		paths: documents.results.map((doc) => {
			return {
				params: { uid: doc.uid },
				locale: doc.lang,
			};
		}),
		fallback: true,
	};
}

export async function getStaticProps({ params, locale }) {
	const client = Client();
	const doc = await client.getByUID("show", params.uid, {
		lang: locale,
		fetchLinks: ["member.title", "member.position", "member.img"],
	});

	if (doc) {
		return {
			revalidate: 60,
			props: {
				doc: doc || {},
			},
		};
	}
	return { revalidate: 60, props: { doc: {} } };
}
