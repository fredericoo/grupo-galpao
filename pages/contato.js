import styles from "./contato.module.scss";
import { Client } from "utils/prismicHelpers";
import { groupHasItems } from "utils/groups";

import Meta from "components/Meta/Meta";
import Grid from "components/Grid/Grid";
import ColourSection from "components/ColourSection/ColourSection";
import Text from "components/Text/Text";
import NewsletterForm from "components/NewsletterForm/NewsletterForm";
import { useEffect, useContext } from "react";
import { AvailableLocalesContext } from "utils/context";

const AboutPage = ({ doc }) => {
	const data = doc.data;
	const [, setAvailableLocales] = useContext(AvailableLocalesContext);
	useEffect(() => doc && setAvailableLocales(doc.alternate_languages), [doc]);
	return (
		<>
			{data && (
				<ColourSection bg="#F5F5F5" fg="#deab1c">
					<Meta
						pageTitle={data.seo_title}
						pageDesc={data.seo_desc}
						pageImage={data.seo_img.url}
					/>

					<Grid className="py-5">
						<Grid.Col lg="grid-start / col-7">
							{data.title && (
								<h1 className={`h-1 c-fg`}>
									<Text content={data.title} asText />
								</h1>
							)}
						</Grid.Col>
						<Grid.Col lg="col-7 / grid-end" className={`my-5 ${styles.formas}`}>
							<ul>
								{groupHasItems(data.formas) &&
									data.formas.map((forma, key) => (
										<li key={key}>
											<dt>{forma.forma}</dt>
											<dd>
												<Text content={forma.conteudo} />
											</dd>
										</li>
									))}
							</ul>
						</Grid.Col>
					</Grid>
					<Grid>
						<Grid.Col lg="grid-start / col-7">
							<h2 className="h-2 c-fg">Newsletter</h2>
						</Grid.Col>
						<Grid.Col lg="col-7 / grid-end">
							<NewsletterForm />
						</Grid.Col>
					</Grid>
				</ColourSection>
			)}
		</>
	);
};

export async function getStaticProps({ locale }) {
	const client = Client();
	const doc = await client.getSingle("contato", { lang: locale });

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

export default AboutPage;
