import styles from "./Navbar.module.scss";

import { useState, useEffect } from "react";
import { hrefResolver } from "prismic-configuration";
import { Client } from "utils/prismicHelpers";
import useSWR from "swr";

import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import Link from "next/link";

import LangPicker from "components/LangPicker/LangPicker";

const Navbar = ({ parent, isOpen, setIsOpen }) => {
	const { asPath, locale } = useRouter();
	const toggle = () => setIsOpen(!isOpen);
	const { t } = useTranslation();

	useEffect(() => {
		setIsOpen(false);
	}, [asPath]);

	async function fetcher(lang) {
		const client = Client();

		const doc = await client.getSingle("config", {
			lang: lang,
		});
		return doc.data.menu;
	}
	const { data: menu, error } = useSWR(locale, fetcher, {
		revalidateOnFocus: false,
	});

	return (
		<nav className={`${styles.navbar} bg-bg`}>
			<div className={`${styles.backBtn} c-fg`}>
				{!!parent && (
					<Link href={parent}>
						<a>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="butt"
								strokeLinejoin="arcs"
							>
								<path d="M15 10L9 4l-6 6" />
								<path d="M20 20h-7a4 4 0 0 1-4-4V5" />
							</svg>
						</a>
					</Link>
				)}
			</div>
			<div className={styles.logo}>
				<Link href="/">
					<a>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 120">
							<g fill="currentColor">
								<path d="M15.3,41.3992A15.3,15.3,0,0,0,0,56.7V90.4255a15.3,15.3,0,0,0,30.6008,0V70.3169H14.241v8.1169h7.2447V90.4255q.0076.2178,0,.4356a6.1852,6.1852,0,1,1-12.3628-.4356V56.7q-.0076-.2178,0-.4356A6.1852,6.1852,0,0,1,21.4857,56.7v3.2475h9.1151V56.7A15.3,15.3,0,0,0,15.3,41.3992Z" />
								<path d="M69.4409,60.4558q.0037-18.1714-15.3465-18.7418v-.0012H38.7328v63.7h9.119V78.1852H53.207l.8683,2.6083v.0234l7.62,24.6031h9.7425L61.5726,76.3185C67.3179,73.0787,69.4409,67.8268,69.4409,60.4558ZM54.0793,70.1907H47.8366v-19.86h4.6359a6.5929,6.5929,0,0,1,1.6219.1263v-.0018c5.36.5063,6.2313,3.8786,6.2313,9.7405C60.3257,66.1935,59.4345,69.69,54.0793,70.1907Z" />
								<path d="M97.1766,90.1731c0,4.4945-2.5016,6.6174-5.6228,6.6174-3.24,0-5.7376-2.1229-5.7376-6.6174V41.7013H76.701V91.1188A14.7993,14.7993,0,0,0,106.3,91.0452V41.7128h-9.123Z" />
								<path d="M140.259,46.2073a14.0265,14.0265,0,0,0-10.3662-4.4945H114.78v63.7033h9.1152V80.5529h5.9977a13.8316,13.8316,0,0,0,11.9918-6.6174,23.0691,23.0691,0,0,0,2.4978-12.7414C144.3824,53.5744,143.38,49.581,140.259,46.2073ZM129.8928,71.935h-5.9977V50.3307h5.9977c5.994.6236,5.994,5.2442,5.994,10.8634C135.8868,67.0656,135.7605,71.3038,129.8928,71.935Z" />
								<path d="M165.9867,41.2117q-.5436-.0177-1.0873.0045A14.8911,14.8911,0,0,0,150.6251,56.7V90.4064q-.0217.5414-.0042,1.0833A14.8909,14.8909,0,0,0,165.9867,105.89q.5.0132,1.0006-.0073A14.8607,14.8607,0,0,0,181.226,90.4255V56.7q.0213-.5082.0081-1.0168A14.8642,14.8642,0,0,0,165.9867,41.2117Zm6.1373,50.0744a6.2108,6.2108,0,0,1-12.3837-.8644V56.7a6.1877,6.1877,0,1,1,12.3665,0V90.4217A5.8419,5.8419,0,0,1,172.124,91.2861Z" />
								<path d="M220.5059,41.3992a15.3,15.3,0,0,0-15.3,15.3V90.4255a15.3,15.3,0,0,0,30.6008,0V70.3169h-16.36v8.1169h7.2447V90.4255q.0077.2178,0,.4356a6.1852,6.1852,0,1,1-12.3627-.4356V56.7q-.0078-.2178,0-.4356a6.1852,6.1852,0,1,1,12.3627.4356v3.2475h9.1152V56.7A15.3,15.3,0,0,0,220.5059,41.3992Z" />
								<path d="M257.7968,41.709v-.0154h-3.7485l-14.241,63.6957h9.1152l2.6239-13.7359h6.2464v.0153h6.2427l2.6239,13.7359h9.1152L261.5377,41.709Zm-.004,41.4527h-4.6245L257.6628,60.07h.1263l4.4982,23.0922Z" />
								<polygon points="289.396 41.713 280.277 41.713 280.277 105.408 307.504 105.408 307.504 96.289 289.396 96.289 289.396 41.713" />
								<path d="M342.9664,61.4209c0-7.62-1.0023-11.613-4.1235-14.9868A14.5352,14.5352,0,0,0,328.3507,41.94v8.6179c5.9977.6235,5.9977,5.2443,5.9977,10.8633,0,5.8716-.1262,10.1174-5.9977,10.741H322.483L322.48,50.5576h5.8677V41.94H313.36V105.643h9.1226V80.78h5.8677a13.8275,13.8275,0,0,0,11.9918-6.6175A23.0045,23.0045,0,0,0,342.9664,61.4209Z" />
								<polygon points="363.576 29.721 363.576 29.725 363.576 29.725 363.576 29.721" />
								<path d="M353.0739,37.486a3.6413,3.6413,0,0,1,3.8808-3.3852,38.1618,38.1618,0,0,1,6.6213,1.87h0a25.5069,25.5069,0,0,0,6.2615,1.6218c5.7452,0,7.9944-4.3759,9.119-9.8687h-4.6245q.0105.1706.0053.3416a3.7676,3.7676,0,0,1-3.8764,3.6556,34.8067,34.8067,0,0,1-6.8852-1.9967v0a22.2945,22.2945,0,0,0-6.12-1.6217c-5.619,0-7.8682,4.4983-8.9928,9.995h4.6207A3.6165,3.6165,0,0,1,353.0739,37.486Z" />
								<polygon points="363.58 41.709 363.576 41.709 359.831 41.709 345.579 105.405 354.706 105.405 357.452 91.669 363.572 91.669 363.572 83.177 359.078 83.177 363.45 60.07 363.576 60.07 363.58 60.07 363.702 60.07 368.197 83.177 363.576 83.177 363.576 91.669 369.819 91.669 372.569 105.405 381.684 105.405 367.447 41.709 363.58 41.709" />
								<path d="M400.9169,41.2117q-.5435-.0177-1.0872.0045A14.8912,14.8912,0,0,0,385.5553,56.7V90.4064q-.0217.5414-.0042,1.0833A14.8909,14.8909,0,0,0,400.9169,105.89q.5.0132,1.0006-.0073a14.8607,14.8607,0,0,0,14.2387-15.4576V56.7q.0213-.5082.0082-1.0168A14.8643,14.8643,0,0,0,400.9169,41.2117Zm6.1374,50.0744a6.2089,6.2089,0,0,1-12.38-.8644V56.7a6.1858,6.1858,0,1,1,12.3627,0V90.4217A5.8419,5.8419,0,0,1,407.0543,91.2861Z" />
							</g>

							<path
								className={styles.star}
								fill="currentColor"
								d="M484.851,70.94,461.7435,54.2056,438.7623,70.94,447.5065,43.84,424.5293,27.1009h28.4779L461.7514,0l8.8666,27.1009h28.478L475.9884,43.8357Z"
							/>
						</svg>
					</a>
				</Link>
			</div>
			<div
				className={`${styles.viewport} ${isOpen ? styles.open : ""}`}
				onClick={(e) => {
					e.preventDefault;
					toggle();
				}}
			>
				<div className={`${styles.tools} ${isOpen ? styles.open : ""}`}>
					<ul className={styles.menu}>
						{menu &&
							menu
								.filter((option) => option.link.url || option.link.uid)
								.map((option) => {
									const href = hrefResolver(option.link);
									if (typeof href === undefined) return;
									return (
										<li key={option.label}>
											<Link href={href}>
												<a
													target={option.link.target}
													className={`h-2 ${styles.item} ${
														asPath === href ? styles.active : ""
													}`}
												>
													<span>{option.label}</span>
												</a>
											</Link>
										</li>
									);
								})}
					</ul>
					<LangPicker />
				</div>
			</div>
			{menu && !error && (
				<button
					label={t("common:menu")}
					className={`${styles.toggler}`}
					type="button"
					onClick={toggle}
				>
					<div className={`${styles.togglerIcon} ${isOpen ? styles.open : ""}`}>
						<span></span>
					</div>
				</button>
			)}
		</nav>
	);
};

export default Navbar;
