import { groupHasItems } from "utils/groups";
import ColourSection from "components/ColourSection/ColourSection";
import Prizes from "components/Prizes/Prizes";
import Grid from "components/Grid/Grid";
import Columns from "components/Columns/Columns";
import { RichText } from "prismic-reactjs";
import { Client } from "utils/prismicHelpers";

const PrizesPage = ({ doc }) => {
	const data = doc.data;
	if (!data) return false;

	return (
		<>
			{groupHasItems(data.prizes) && (
				<ColourSection bg="#ffcb05" fg="#000000">
					<Grid className="c-fg">
						<Grid.Col>
							<h1 className="ta-center py-3 h-1">
								{RichText.asText(data.title_prizes)}
							</h1>
							<Prizes entries={data.prizes} />
						</Grid.Col>
					</Grid>
				</ColourSection>
			)}
			{groupHasItems(data.festival) && (
				<ColourSection bg="#fafafa" fg="#172063">
					<Grid>
						<Grid.Col>
							<h2 className="c-fg ta-center h-2 mb-5">
								{RichText.asText(data.title_national)}
							</h2>
							<Columns lg={3} md={2} className="c-fg">
								{data.festival
									.sort((a, b) => b.year - a.year)
									.map((festival) => (
										<Festival
											key={RichText.asText(festival.festival)}
											title={festival.festival}
											year={festival.year}
											state={festival.state}
										/>
									))}
							</Columns>
						</Grid.Col>
					</Grid>
				</ColourSection>
			)}
			{groupHasItems(data.festival1) && (
				<ColourSection fg="#fafafa" bg="#172063">
					<Grid>
						<Grid.Col>
							<h2 className="c-fg ta-center h-2 my-5">
								{RichText.asText(data.title_international)}
							</h2>
							<Columns lg={3} md={2} className="c-fg">
								{data.festival1
									.sort((a, b) => b.year - a.year)
									.map((festival) => (
										<Festival
											key={RichText.asText(festival.festival)}
											title={festival.festival}
											year={festival.year}
											state={festival.state}
										/>
									))}
							</Columns>
						</Grid.Col>
					</Grid>
				</ColourSection>
			)}
		</>
	);
};

const Festival = ({ year, title, state }) => (
	<div className="ta-center">
		<p className="ff-text l-2">{year}</p>
		<h3 className="h-3">{RichText.asText(title)}</h3>
		<p className="h-4 l-2">{state}</p>
	</div>
);

export async function getStaticProps({ locale }) {
	const client = Client();
	const doc = await client.getSingle("premios_e_festivais", {
		lang: locale,
	});

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

export default PrizesPage;
