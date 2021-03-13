import styles from "./ProductCard.module.scss";

import useTranslation from "next-translate/useTranslation";

import Flow from "components/Flow/Flow";
import Placeholder from "components/Placeholder/Placeholder";
import Text from "components/Text/Text";
import Link from "next/link";

const ProductCard = ({ title, price, image, link }) => {
	const { t } = useTranslation();
	return (
		<WrapperTag link={link}>
			<Flow>
				<figure className={styles.image}>
					{image && <Placeholder src={image} layout="fill" alt={image.alt} />}
				</figure>
				<figcaption
					className={`${styles.info} ff-headings ${
						!title ? styles.skeleton : ""
					}`}
				>
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
							{price ? price.match(/(\d+)[\.\,]/)[1] : "12"}
						</span>
						{t("common:separator.decimals")}
						<span className={styles.priceCents}>
							{price ? price.match(/[\.\,](\d+)/)[1] : "34"}
						</span>
					</p>
				</figcaption>
			</Flow>
		</WrapperTag>
	);
};

const WrapperTag = ({ link, children }) =>
	link ? (
		<Link href={link}>
			<a target="_blank" className={styles.product}>
				{children}
			</a>
		</Link>
	) : (
		<div className={styles.product}>{children}</div>
	);

export default ProductCard;
