import styles from "./ProductCard.module.scss";

import useTranslation from "next-translate/useTranslation";

import Flow from "components/Flow/Flow";
import Placeholder from "components/Placeholder/Placeholder";
import Text from "components/Text/Text";

const ProductCard = ({ title, price, image, link }) => {
	const { t } = useTranslation();
	return (
		<Flow>
			<figure className={styles.image}>
				{image?.url && (
					<Placeholder src={image.url} layout="fill" alt={image.alt} />
				)}
			</figure>
			<figcaption className={`${styles.info} ${!title ? styles.skeleton : ""}`}>
				<h3 className={styles.name}>
					{title ? (
						<Text content={title} asText />
					) : (
						<span>Nome do produto</span>
					)}
				</h3>
				<p className={styles.price}>
					<span className={styles.currency}>R$</span>
					<span className={styles.priceMain}>
						{price ? price.match(/(\d+)\./)[1] : "12"}
					</span>
					{t("common:separator.decimals")}
					<span className={styles.priceCents}>
						{price ? price.match(/\.(\d+)/)[1] : "34"}
					</span>
				</p>
			</figcaption>
		</Flow>
	);
};

export default ProductCard;
