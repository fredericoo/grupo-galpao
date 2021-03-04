import { Client } from "utils/prismicHelpers";
import Prismic from "prismic-javascript";
import Meta from "components/Meta/Meta";
import ColourSection from "components/ColourSection/ColourSection";
import Grid from "components/Grid/Grid";
import Text from "components/Text/Text";
import ShowThumb from "components/ShowThumb/ShowThumb";
import Flow from "components/Flow/Flow";

const Shows = ({ docs, doc }) => {
	const page = doc.data;

	return (
		<ColourSection bg="#fafafa" fg="#141415">
			<Grid className="c-fg py-3">
				<Grid.Col>
					<h1 className="h-1">
						<Text content={page.title} asText />
					</h1>
				</Grid.Col>
				<Grid.Col>
					<Flow spacing="2rem">
						{!!docs.length &&
							docs.map((doc, key) => <ShowThumb key={key} doc={doc} />)}
					</Flow>
				</Grid.Col>
			</Grid>
			<Meta />
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
