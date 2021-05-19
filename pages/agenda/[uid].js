import { Client } from "utils/prismicHelpers";
import Prismic from "prismic-javascript";
import { hrefResolver } from "prismic-configuration";
import { RichText } from "prismic-reactjs";
import { groupHasItems } from "utils/groups";

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
import Button from "components/Button/Button";

export default function Post({ doc }) {
	const { t } = useTranslation();

	if (doc && doc.data) {
		const data = doc.data;
		return (
			<>
				<ColourSection bg={data.bg} fg={data.fg}>
					<Meta
						pageTitle={
							data.seo_title || data.title
								? RichText.asText(data.title)
								: undefined
						}
						pageDesc={
							data.seo_desc || data.short
								? RichText.asText(data.short)
								: undefined
						}
						pageImage={data.seo_img?.url || data.cover?.url}
					/>
					<Grid className="py-3 c-fg">
						<Grid.Col
							style={{ overflow: "hidden" }}
							md="col-4 / col-10"
							lg="col-3 / col-11"
						>
							{data.title && (
								<motion.div
									initial={{ translateY: "100%" }}
									animate={{ translateY: "0%" }}
									transition={{
										type: "spring",
										stiffness: 300,
										damping: 50,
									}}
								>
									{data.type && (
										<p className="h-3">
											<Text content={data.type} asText />
										</p>
									)}
									{data.title && (
										<h1 className={`h-2`}>
											<Text content={data.title} asText />
										</h1>
									)}
									{data.subtitle && (
										<p className="h-4">
											<Text content={data.subtitle} asText />
										</p>
									)}
								</motion.div>
							)}
						</Grid.Col>

						<FutureDates uid={doc.uid} />

						{data.cover?.url && (
							<Grid.Col
								sm="screen-start / screen-end"
								md="col-2 / col-12"
								lg="col-3 / col-11"
							>
								<Placeholder
									src={data.cover.url}
									width={data.cover.dimensions.width}
									height={data.cover.dimensions.height}
									alt={data.cover.alt}
									layout="responsive"
									bg="var(--fg)"
								/>
							</Grid.Col>
						)}
						{data.long && (
							<Grid.Col
								md="col-2 / col-12"
								lg="col-3 / col-8"
								className="c-fg fs-sm"
							>
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
								{data.link.url && data.cta && (
									<Button
										size="lg"
										className="ta-center"
										type="primary"
										target={data.link.target}
										href={hrefResolver(data.link)}
									>
										<Text asText content={data.cta} />
									</Button>
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
		Prismic.Predicates.at("document.type", "event"),
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
	const doc = await client.getByUID("event", params.uid, {
		lang: locale,
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
