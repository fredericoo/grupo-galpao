import styles from "./HomeProducts.module.scss";

import useColourEffect from "utils/hooks/useColourEffect";

import Grid from "components/Grid/Grid";
import Text from "components/Text/Text";
import Button from "components/Button/Button";
import Columns from "components/Columns/Columns";
import ProductCard from "components/ProductCard/ProductCard";

import { hrefResolver } from "prismic-configuration";

const HomeProducts = ({ subtitle, title, text, link, cta }) => {
	const [isInViewport, targetRef] = useColourEffect({
		fg: "#141415",
		bg: "#FFCB05",
	});

	return (
		<section ref={targetRef} className="py-5">
			<Grid>
				<Grid.Col lg="col-5 / col-9" className="ta-center">
					{subtitle && <Text content={subtitle} asText />}
					{title && (
						<h2 className="h-2">
							<Text content={title} asText />
						</h2>
					)}
				</Grid.Col>
				<Grid.Col
					md="col-3 / col-11"
					lg="grid-start / col-4"
					xl="col-2 / col-4"
					className="body"
				>
					{text && <Text content={text} />}
					{link && (
						<Button href={hrefResolver(link)} type="ghost">
							{cta}
						</Button>
					)}
				</Grid.Col>
				<Grid.Col lg="col-4 / grid-end">
					<Columns sm={1} md={3}>
						{Array(3)
							.fill({})
							.map((product, key) => (
								<ProductCard key={key} product={product} />
							))}
					</Columns>
				</Grid.Col>
			</Grid>
		</section>
	);
};

export default HomeProducts;
