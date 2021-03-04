import styles from "./Footer.module.scss";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

import Image from "next/image";
import Grid from "components/Grid/Grid";
import Columns from "components/Columns/Columns";
import { useState, useEffect } from "react";
import Sponsors from "components/Sponsors/Sponsors";

const Footer = () => {
	const { t } = useTranslation();

	return (
		<footer className={`${styles.section}`}>
			<h2 className="visually-hidden">{t("common:footer")}</h2>
			<Grid className="s-sm c-fg">
				<Grid.Col
					className="py-2"
					lg="grid-start / col-10"
					rowLg="1"
					style={{ alignSelf: "end" }}
				>
					<Sponsors />
				</Grid.Col>
				<Grid.Col sm="col-8 / screen-end" rowLg="1">
					<Image
						className={styles.star}
						src="/img/star.png"
						width="1080"
						height="1080"
						layout="responsive"
					/>
				</Grid.Col>
			</Grid>
		</footer>
	);
};
export default Footer;
