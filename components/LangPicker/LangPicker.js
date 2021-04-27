import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import styles from "./LangPicker.module.scss";
import Link from "next/link";
import { AvailableLocalesContext } from "utils/context";
import { useContext, useEffect, useState } from "react";

const LangPicker = () => {
	const router = useRouter();
	const [altLangs] = useContext(AvailableLocalesContext);
	const [availableLocales, setAvailableLocales] = useState([]);
	useEffect(() => {
		const altLocales = altLangs
			? altLangs.map((lang) => lang.lang)
			: router.locales;
		const available = router.locales.filter(
			(lang) => lang === router.locale || altLocales.includes(lang)
		);
		setAvailableLocales(available);
	}, [router, altLangs]);

	let { t } = useTranslation();
	return (
		<ul className={`${styles.locales}`}>
			{availableLocales.length > 1 &&
				availableLocales.map((locale) => (
					<li key={locale}>
						<Link
							href={
								altLangs?.find((x) => x.lang == locale)?.uid || router.asPath
							}
							locale={locale}
						>
							<a
								className={`smcp ${styles.locale} ${
									locale === router.locale ? styles.active : ""
								}`}
							>
								{t(`common:locales.${locale}`)}
							</a>
						</Link>
					</li>
				))}
		</ul>
	);
};

export default LangPicker;
