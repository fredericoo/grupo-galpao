import styles from "./HomeProducts.module.scss";

import useColourEffect from "utils/hooks/useColourEffect";

import Grid from "components/Grid/Grid";
import Text from "components/Text/Text";
import Button from "components/Button/Button";
import Columns from "components/Columns/Columns";
import ProductCard from "components/ProductCard/ProductCard";

import { hrefResolver } from "prismic-configuration";
import { useState, useEffect } from "react";

const HomeProducts = ({ subtitle, title, text, link, cta }) => {
	const [products, setProducts] = useState(Array(3).fill({}));
	const [error, setError] = useState(false);

	useEffect(
		() =>
			fetch("/api/loja")
				.then((res) => res.json())
				.then((res) => (res.success ? setProducts(res.data) : setError(true))),
		[]
	);

	const [, targetRef] = useColourEffect({
		fg: "#17235f",
		bg: "#deab1c",
	});

	if (error) return null;

	return (
		<section ref={targetRef} className={`py-5 ${styles.section}`}>
			<Grid>
				<Grid.Col lg="col-5 / col-9" className="ta-center">
					{subtitle && (
						<div className="h-3">
							<Text content={subtitle} asText />
						</div>
					)}
					{title && (
						<h2 className="h-1 ff-condensed">
							<Text content={title} asText />
						</h2>
					)}
				</Grid.Col>
				<Grid.Col
					md="col-3 / col-11"
					lg="grid-start / col-4"
					xl="col-2 / col-4"
					className="body mb-2"
				>
					{text && <Text content={text} />}
					{link && (
						<Button href={hrefResolver(link)} target="_blank" type="primary">
							{cta}
						</Button>
					)}
				</Grid.Col>
				<Grid.Col lg="col-4 / grid-end">
					<Columns sm={1} md={3}>
						{products.map((product, key) => (
							<ProductCard
								key={key}
								title={product.title}
								price={product.price}
								image={product.img}
								link={product.url}
							/>
						))}
					</Columns>
				</Grid.Col>
			</Grid>
		</section>
	);
};

export default HomeProducts;
