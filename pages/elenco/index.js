import { Client } from "utils/prismicHelpers";
import Prismic from "prismic-javascript";
import { hrefResolver } from "prismic-configuration";

import { RichText } from "prismic-reactjs";
import Meta from "components/Meta/Meta";
import ColourSection from "components/ColourSection/ColourSection";
import Grid from "components/Grid/Grid";
import Text from "components/Text/Text";
import Columns from "components/Columns/Columns";
import MemberCard from "components/MemberCard/MemberCard";

const Shows = ({ docs, doc }) => {
	const page = doc.data;

	return (
		<ColourSection bg="#141415" fg="#fafafa">
			<Meta
				pageTitle={page.seo_title || RichText.asText(page.title)}
				pageDesc={page.seo_desc}
			/>
			<Grid className="c-fg py-3">
				<Grid.Col className="ta-center">
					<h1 className="h-1">
						<Text content={page.title} asText />
					</h1>
				</Grid.Col>
				<Grid.Col>
					<Columns sm="2" md="3" lg="4">
						{!!docs.length &&
							docs.map((doc, key) => (
								<MemberCard
									key={key}
									link={hrefResolver(doc)}
									name={doc.data.title}
									position={doc.data.position}
									photo={doc.data.img}
								/>
							))}
					</Columns>
				</Grid.Col>
			</Grid>
		</ColourSection>
	);
};

export default Shows;

export async function getStaticProps({ locale }) {
	const client = Client();
	const doc = await client.getSingle("elenco", {
		lang: locale,
	});

	const docs = await client.query(
		Prismic.Predicates.at("document.type", "member")
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
