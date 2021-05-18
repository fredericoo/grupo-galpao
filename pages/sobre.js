import { Client } from "utils/prismicHelpers";
import Prismic from "prismic-javascript";
import { groupHasItems } from "utils/groups";
import { hrefResolver } from "prismic-configuration";

import Meta from "components/Meta/Meta";
import Grid from "components/Grid/Grid";
import ColourSection from "components/ColourSection/ColourSection";
import Text from "components/Text/Text";
import Placeholder from "components/Placeholder/Placeholder";
import Columns from "components/Columns/Columns";
import MemberCard from "components/MemberCard/MemberCard";
import Metric from "components/Metric/Metric";
import Timeline from "components/Timeline/Timeline";

import { useEffect, useContext } from "react";
import { AvailableLocalesContext } from "utils/context";

const AboutPage = ({ doc, docs }) => {
	const data = doc.data;
	if (!data) return null;

	const [, setAvailableLocales] = useContext(AvailableLocalesContext);
	useEffect(() => doc && setAvailableLocales(doc.alternate_languages), [doc]);

	return (
		<>
			<Meta
				pageTitle={data.seo_title}
				pageDesc={data.seo_desc}
				pageImage={data.seo_img.url}
			/>
			<ColourSection bg="#F5F5F5" fg="#deab1c">
				<Grid
					className="py-5"
					style={{ gridTemplateRows: "min-content min-content 1fr" }}
				>
					<Grid.Col lg="grid-start / grid-end">
						{data.title && (
							<h1 className={`h-1 c-fg`} style={{ marginBottom: "-0.75em" }}>
								<Text content={data.title} asText />
							</h1>
						)}
					</Grid.Col>
					<Grid.Col lg="grid-start / col-7" rowLg="2">
						<Placeholder
							style={{ mixBlendMode: "multiply" }}
							src={data.img1.url}
							width={data.img1.dimensions.width}
							height={data.img1.dimensions.height}
							alt={data.img1.alt}
							layout="responsive"
						/>
					</Grid.Col>
					<Grid.Col
						lg="col-7 / col-12"
						rowLg="2/4"
						className="py-3 body fs-sm l-2"
					>
						<Text content={data.text} />
					</Grid.Col>
					<Grid.Col lg="grid-start / col-7" rowLg="3">
						<Placeholder
							src={data.img2.url}
							width={data.img2.dimensions.width}
							height={data.img2.dimensions.height}
							alt={data.img2.alt}
							layout="responsive"
						/>
					</Grid.Col>
					{groupHasItems(data.numbers) && (
						<Grid.Col className="c-fg">
							<ul
								style={{
									display: "flex",
									flexFlow: "row wrap",
									justifyContent: "center",
								}}
							>
								{data.numbers.map((item, key) => (
									<li key={key} style={{ margin: "1rem" }}>
										<Metric
											number={item.numbers_number}
											text={item.numbers_text}
										/>
									</li>
								))}
							</ul>
						</Grid.Col>
					)}
				</Grid>
			</ColourSection>
			<ColourSection bg="#141415" fg="#fafafa">
				<Grid className="c-fg py-3">
					<Grid.Col>
						<Columns sm="2" md="3" lg="4">
							{docs &&
								!!docs.length &&
								docs.map((doc) => (
									<MemberCard
										key={hrefResolver(doc)}
										link={hrefResolver(doc)}
										name={doc.data.title}
										position={doc.data.position}
										photo={doc.data.img}
									/>
								))}
						</Columns>
					</Grid.Col>
					{groupHasItems(data.team_members) && (
						<Grid.Col className="py-3">
							<h2 className="h-2 ta-center mb-3">
								<Text content={data.team} />
							</h2>
							<Columns sm="1" md="2" lg="4" className="fs-sm">
								{data.team_members.map((entry, key) => (
									<dl key={key}>
										<dt className="h-3">
											<Text content={entry.team_name} />
										</dt>
										<dt>
											<Text content={entry.team_position} />
										</dt>
									</dl>
								))}
							</Columns>
						</Grid.Col>
					)}
				</Grid>
			</ColourSection>

			{groupHasItems(data.timeline) && (
				<ColourSection bg="#0c2fb0" fg="#f5f5f5">
					<Grid className="py-5">
						<Grid.Col lg="col-2 / col-12" className="c-fg">
							{data.history && (
								<h2 className="h-2 ta-center mb-2">
									{<Text asText content={data.history} />}
								</h2>
							)}
							<Timeline events={data.timeline} />
						</Grid.Col>
						<Grid.Col sm="screen-start / screen-end" lg="col-2 / col-12">
							<Placeholder
								src={data.img3.url}
								width={data.img3.dimensions.width}
								height={data.img3.dimensions.height}
								alt={data.img3.alt}
								layout="responsive"
							/>
						</Grid.Col>
					</Grid>
				</ColourSection>
			)}
		</>
	);
};

export async function getStaticProps({ locale }) {
	const client = Client();
	const doc = await client.getSingle("about", {
		lang: locale,
		fetchLinks: ["member.title", "show.title"],
	});
	const docs = await client.query(
		Prismic.Predicates.at("document.type", "member")
	);
	if (doc && docs) {
		return {
			revalidate: 600,
			props: {
				doc: doc || {},
				docs: docs.results || [],
			},
		};
	}
	return { revalidate: 60, props: { doc: {}, docs: [] } };
}

export default AboutPage;
