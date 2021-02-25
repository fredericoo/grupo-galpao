import Head from "next/head";
import Grid from "components/Grid/Grid";
import Background from "../components/Background/Background";
import Hero from "../components/Hero/Hero";

import { Client } from "utils/prismicHelpers";
import Calendar from "components/Calendar/Calendar";
import HomeAbout from "components/HomeAbout/HomeAbout";

export default function Home({ doc }) {
	if (!doc) return null;
	return (
		<>
			<Background />
			<Hero banners={doc.data.banners} />
			<Calendar />
			<HomeAbout home={doc.data} />
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
