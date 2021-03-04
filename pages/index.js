import Background from "../components/Background/Background";
import Hero from "../components/Hero/Hero";

import { Client } from "utils/prismicHelpers";
import Calendar from "components/Calendar/Calendar";
import HomeAbout from "components/HomeAbout/HomeAbout";
import HomeProducts from "components/HomeProducts/HomeProducts";
import Meta from "components/Meta/Meta";

export default function Home({ doc }) {
	if (!doc) return null;
	return (
		<>
			<Meta />
			<Background />
			<Hero banners={doc.data.banners} />
			<Calendar />
			<HomeAbout home={doc.data} />
			<HomeProducts
				subtitle={doc.data.souvenirs_subtitle}
				title={doc.data.souvenirs_title}
				text={doc.data.souvenirs_text}
				link={doc.data.souvenirs_link}
				cta={doc.data.souvenirs_cta}
			/>
		</>
	);
}

export async function getStaticProps({ locale }) {
	const client = Client();
	const doc = await client.getSingle("home", { lang: locale });

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
