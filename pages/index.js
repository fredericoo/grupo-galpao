import Hero from "../components/Hero/Hero";

import { Client } from "utils/prismicHelpers";
import Calendar from "components/Calendar/Calendar";
import HomeAbout from "components/Home/HomeAbout/HomeAbout";
import HomeProducts from "components/Home/HomeProducts/HomeProducts";
import Meta from "components/Meta/Meta";
import HomeEvents from "components/Home/HomeEvents/HomeEvents";
import HomeInstagram from "components/Home/HomeInstagram/HomeInstagram";

export default function Home({ doc }) {
	if (!doc?.data) return null;

	return (
		<>
			<Meta />
			<Hero banners={doc.data.banners} />
			<HomeEvents title={doc.data.events_title} cta={doc.data.events_cta} />
			<HomeAbout home={doc.data} />
			<HomeInstagram count={4} />
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
