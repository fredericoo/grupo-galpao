import { Client } from "utils/prismicHelpers";
import Prismic from "prismic-javascript";
import { RichText } from "prismic-reactjs";

import Meta from "components/Meta/Meta";
import Text from "components/Text/Text";
import ColourSection from "components/ColourSection/ColourSection";
import Grid from "components/Grid/Grid";
import Placeholder from "components/Placeholder/Placeholder";
import { AvailableLocalesContext } from "utils/context";
import { useEffect, useContext } from "react";

export default function Post({ doc }) {
	const [, setAvailableLocales] = useContext(AvailableLocalesContext);
	useEffect(() => doc && setAvailableLocales(doc.alternate_languages), [doc]);

	if (doc && doc.data) {
		const data = doc.data;
		return (
			<ColourSection bg="#141415" fg="#fafafa">
				<Meta
					pageTitle={data.seo_title || RichText.asText(data.title)}
					pageDesc={data.seo_desc || RichText.asText(data.short)}
					pageImage={data.seo_img?.url || data.img?.url}
				/>
				<Grid className="py-3 c-fg">
					{data.img?.url && (
						<Grid.Col
							sm="grid-start / grid-end"
							md="col-3 / col-11"
							lg="grid-start / col-5"
						>
							<Placeholder
								src={data.img.url}
								width={data.img.dimensions.width}
								height={data.img.dimensions.height}
								alt={data.img.alt}
								layout="responsive"
								bg="var(--fg)"
							/>
						</Grid.Col>
					)}

					<Grid.Col
						style={{ overflow: "hidden" }}
						md="col-4 / col-10"
						lg="col-5 / col-9"
					>
						{data.title && (
							<>
								<h1 className="h-2 my-1">
									<Text content={data.title} asText />
								</h1>
								<p className="h-3">
									<Text content={data.position} asText />
								</p>
								{data.bio && (
									<div className="body fs-sm">
										<Text content={data.bio} />
									</div>
								)}
							</>
						)}
					</Grid.Col>
				</Grid>
			</ColourSection>
		);
	}
	return null;
}

export async function getStaticPaths() {
	const client = Client();
	const documents = await client.query([
		Prismic.Predicates.at("document.type", "member"),
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
	const doc = await client.getByUID("member", params.uid, {
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
