import styles from "./contato.module.scss";
import { Client } from "utils/prismicHelpers";
import { groupHasItems } from "utils/groups";

import Meta from "components/Meta/Meta";
import Grid from "components/Grid/Grid";
import ColourSection from "components/ColourSection/ColourSection";
import Text from "components/Text/Text";
import Columns from "components/Columns/Columns";
import Body from "components/Body/Body";
import Flow from "components/Flow/Flow";
import Placeholder from "components/Placeholder/Placeholder";
import Button from "components/Button/Button";

const Patrocinio = ({ doc }) => {
	if (!doc) return null;
	const data = doc.data;

	return (
		<>
			{data && (
				<>
					<ColourSection bg="#F5F5F5" fg="#141415">
						<Meta
							pageTitle={data.seo_title}
							pageDesc={data.seo_desc}
							pageImage={data.seo_img.url}
						/>

						<Grid className="py-5 c-fg">
							<Grid.Col className="ta-center">
								{data.title && (
									<h1 className={`h-2`}>
										<Text content={data.title} asText />
									</h1>
								)}
							</Grid.Col>
							<Grid.Col lg="grid-start / col-7">
								{groupHasItems(data.images) &&
									data.images.map(({ image }) => (
										<Placeholder
											src={image.url}
											width={image.dimensions.width}
											height={image.dimensions.height}
										/>
									))}
							</Grid.Col>
							<Grid.Col lg="col-7 / grid-end">
								<Flow spacing="4rem">
									<section>
										<h2 className="h-3 mb-1">
											<Text content={data.companies} asText />
										</h2>
										<Body className="fs-sm">
											<Text content={data.text} />
										</Body>
									</section>

									<section>
										<h2 className="h-3 mb-1">
											<Text content={data.people} asText />
										</h2>
										<Body className="fs-sm">
											<Text content={data.text1} />
										</Body>

										{data.cta && data.link && (
											<div className="ta-center">
												<Button href={data.link} type="ghost">
													<a target="_blank">{data.cta}</a>
												</Button>
											</div>
										)}
									</section>
								</Flow>
							</Grid.Col>
						</Grid>
					</ColourSection>
					<ColourSection fg="#F5F5F5" bg="#141415">
						<Grid className="py-5 c-fg fs-sm">
							<Grid.Col className={`my-5 ${styles.formas}`}>
								<h1 className={`h-2 mb-3 ta-center`}>
									<Text content={data.supporters} asText />
								</h1>
								<Columns md="2" lg="4">
									{groupHasItems(data.vivagalpao) &&
										data.vivagalpao.map((entry) => (
											<p key={entry.nome}>
												<Text content={entry.nome} asText />
											</p>
										))}
								</Columns>
							</Grid.Col>
						</Grid>
					</ColourSection>
				</>
			)}
		</>
	);
};

export async function getStaticProps({ locale }) {
	const client = Client();
	const doc = await client.getSingle("patrocinio", { lang: locale });

	if (doc) {
		return {
			revalidate: 600,
			props: {
				doc: doc || {},
			},
		};
	}
	return { revalidate: 60, props: { doc: {} } };
}

export default Patrocinio;
