import styles from "./HomeAbout.module.scss";
import useColourEffect from "utils/hooks/useColourEffect";

import Grid from "components/Grid/Grid";
import Columns from "components/Columns/Columns";
import Text from "components/Text/Text";
import Button from "components/Button/Button";
import Metric from "components/Metric/Metric";
import Placeholder from "components/Placeholder/Placeholder";
import { hrefResolver } from "prismic-configuration";

const HomeAbout = ({ home }) => {
	const [isInViewport, targetRef] = useColourEffect({
		bg: "#F5F5F5",
		fg: "#deab1c",
	});

	return (
		<section
			className={`${styles.section} ${isInViewport ? styles.inViewport : ""}`}
			ref={targetRef}
		>
			<Grid>
				<Grid.Col lg="col-2 / col-12">
					{home.sobre_title && (
						<h2 className={`h-1 ${styles.header}`}>
							<Text content={home.sobre_title} asText />
						</h2>
					)}
				</Grid.Col>
				<Grid.Col lg="col-2 / col-8" className={styles.image}>
					{home.image?.url && (
						<Placeholder
							src={home.image.url}
							width={home.image.dimensions.width}
							height={home.image.dimensions.height}
							layout="responsive"
						/>
					)}
				</Grid.Col>
				<Grid.Col md="col-2 / col-12" lg="col-9 / col-12">
					<div className={`body fs-sm ${styles.text}`}>
						{home.sobre_texto && <Text content={home.sobre_texto} />}
						{home.sobre_link && (
							<Button link={hrefResolver(home.sobre_link)} type="ghost">
								<Text asText content={home.sobre_cta} />
							</Button>
						)}
					</div>
				</Grid.Col>
				<Grid.Col md="col-2 / col-12">
					{home.sobre_numbers && (
						<Columns sm="1" md="3">
							{home.sobre_numbers.map((number, key) => (
								<Metric key={key} text={number.texto} number={number.numero} />
							))}
						</Columns>
					)}
				</Grid.Col>
			</Grid>
		</section>
	);
};

export default HomeAbout;
