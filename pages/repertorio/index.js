import { Client } from "utils/prismicHelpers";
import Prismic from "prismic-javascript";
import Meta from "components/Meta/Meta";

const Shows = ({ docs, doc }) => {
	return <Meta />;
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
				docs: docs || [],
				doc: doc || {},
			},
		};
	}
	return { revalidate: 60, props: { docs: [], doc: {} } };
}
