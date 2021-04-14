import { Client } from "utils/prismicHelpers";
import Prismic from "prismic-javascript";
import Meta from "components/Meta/Meta";
import ColourSection from "components/ColourSection/ColourSection";
import Grid from "components/Grid/Grid";
import Text from "components/Text/Text";
import ShowThumb from "components/ShowThumb/ShowThumb";
import Flow from "components/Flow/Flow";
import { RichText } from "prismic-reactjs";

const Shows = ({ docs, doc }) => {
	const page = doc.data;

	const sortDocsByLatestDate = (docs) => {
		const getLatestActivity = (activity) => {
			const latestActivity = activity.sort(
				(a, b) =>
					Math.max(+b.activity_from, +b.activity_to) -
					Math.max(+a.activity_from, +a.activity_to)
			)[0];
			return Math.max(latestActivity.activity_from, latestActivity.activity_to);
		};

		return docs.sort((a, b) =>
			!!a.data.activity.length
				? getLatestActivity(b.data.activity) -
				  getLatestActivity(a.data.activity)
				: -1
		);
	};

	if (!page) return null;

	return (
		<ColourSection bg="#fafafa" fg="#141415">
			{page && (
				<Grid className="c-fg py-3">
					<Grid.Col className="ta-center mb-3">
						<Meta
							pageTitle={page.seo_title || RichText.asText(page.title)}
							pageDesc={page.seo_desc}
						/>
						<h1 className="h-1">
							<Text content={page.title} asText />
						</h1>
					</Grid.Col>
					<Grid.Col>
						<Flow spacing="4rem">
							{!!docs.length &&
								sortDocsByLatestDate(docs).map((doc, key) => (
									<ShowThumb key={key} doc={doc} />
								))}
						</Flow>
					</Grid.Col>
				</Grid>
			)}
		</ColourSection>
	);
};

export default Shows;

export async function getStaticProps({ locale }) {
	const client = Client();
	const doc = await client.getSingle("repertorio", {
		lang: locale,
	});

	const docs = await client.query(
		Prismic.Predicates.at("document.type", "show"),
		{ fetchLinks: ["membro.nome", "membro.img", "membro.position"] }
	);

	if (docs) {
		return {
			revalidate: 60,
			props: {
				docs: docs.results || [],
				doc: doc || {},
			},
		};
	}
	return { revalidate: 60, props: { docs: [], doc: {} } };
}
