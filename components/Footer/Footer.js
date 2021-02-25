import styles from "./Footer.module.scss";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

import Grid from "components/Grid/Grid";
import Columns from "components/Columns/Columns";
import moment from "moment-timezone";
import { useState, useEffect } from "react";

const Footer = () => {
	const { t } = useTranslation();
	const [times, setTimes] = useState({ br: "", us: "" });

	useEffect(() => {
		const interval = setInterval(() => {
			setTimes({
				br: moment().tz("America/Sao_Paulo").format("h:mm:ss a"),
				us: moment().tz("America/New_York").format("h:mm:ss a"),
			});
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<footer className={`${styles.section}`}>
			<h2 className="visually-hidden">{t("common:footer")}</h2>
			<Grid container className="py-3 s-sm">
				<Grid.Col>
					<Columns sm={1} md={2} lg={4}>
						<section className={styles.logo}>
							<img src="/img/pbnb-full.svg" />
						</section>
						<section className={styles.links}>
							<h3>Links</h3>
							<p>
								<Link href="/material">Request a Sample Material</Link>
							</p>
							<p>
								<Link href="/call">Book a Courtesy Call</Link>
							</p>
						</section>
						<section className={styles.column}>
							<h3>Brazil</h3>
							<p className={`${styles.time} l-2`}>{times.br}</p>
							<p>
								<Link href="https://www.google.com/maps/place/R.+Ouro+Fino,+395+-+Cruzeiro,+Belo+Horizonte+-+MG,+30310-110,+Brazil/@-19.9417481,-43.9279316,17z/data=!3m1!4b1!4m5!3m4!1s0xa699c7ea8510bf:0xfe655261aaffb3d9!8m2!3d-19.9417481!4d-43.9257376">
									<a target="_blank" className={styles.pin}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width=".85rem"
											height=".85rem"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="butt"
											strokeLinejoin="arcs"
										>
											<circle cx="12" cy="10" r="3" />
											<path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
										</svg>
									</a>
								</Link>{" "}
								{t("common:address1.line1")} <br />
								{t("common:address1.line2")} <br />
								{t("common:address1.line3")}
							</p>
							<p>
								<a href="tel:+19174762086" className={styles.pin}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width=".85rem"
										height=".85rem"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="butt"
										strokeLinejoin="arcs"
									>
										<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
									</svg>
								</a>
								+1 917 476-2086
							</p>
							<p>
								<a href="mailto:pbnb@pbnb.re" className={styles.pin}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width=".85rem"
										height=".85rem"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="butt"
										strokeLinejoin="arcs"
									>
										<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
										<polyline points="22,6 12,13 2,6"></polyline>
									</svg>
								</a>
								pbnb@pbnb.re
							</p>
						</section>
						<section className={styles.column}>
							<h3>United States </h3>
							<p className={`${styles.time} l-2`}>{times.us}</p>
							<p>
								<Link href="https://www.google.com/maps/place/6824+Tammy+Ct,+Bethesda,+MD+20817,+USA/@38.9776673,-77.1816414,17z/data=!3m1!4b1!4m5!3m4!1s0x89b7cadbc87a1341:0xa3aee2fe59cae37e!8m2!3d38.9776632!4d-77.1794527">
									<a target="_blank" className={styles.pin}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width=".85rem"
											height=".85rem"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="butt"
											strokeLinejoin="arcs"
										>
											<circle cx="12" cy="10" r="3" />
											<path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
										</svg>
									</a>
								</Link>{" "}
								{t("common:address2.line1")} <br />
								{t("common:address2.line2")} <br />
								{t("common:address2.line3")}
							</p>
							<p>
								<a href="tel:+12023138825" className={styles.pin}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width=".85rem"
										height=".85rem"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="butt"
										strokeLinejoin="arcs"
									>
										<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
									</svg>
								</a>
								+1 202 313-8825
							</p>
							<p>
								<a href="mailto:pbnb@pbnb.re" className={styles.pin}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width=".85rem"
										height=".85rem"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="butt"
										strokeLinejoin="arcs"
									>
										<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
										<polyline points="22,6 12,13 2,6"></polyline>
									</svg>
								</a>
								pbnb@pbnb.re
							</p>
						</section>
					</Columns>
				</Grid.Col>
			</Grid>
		</footer>
	);
};
export default Footer;
