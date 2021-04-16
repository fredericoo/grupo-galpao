import styles from "./Prize.module.scss";
import Text from "components/Text/Text";
import Link from "next/link";
import { hrefResolver } from "prismic-configuration";

const Prize = ({ title, year, info, member, show }) => (
	<div className={styles.prize}>
		<div className={styles.textBox}>
			{year && <div className={`${styles.year} fs-xs`}>{year}</div>}
			<h3 className={`h-3 ${styles.title}`}>{title}</h3>
			{info && <div className={`${styles.info} fs-xs`}>{info}</div>}
			{member.data && (
				<div className={`${styles.info} fs-xs`}>
					<Text content={member.data.title} asText />
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="12"
						height="12"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="butt"
						strokeLinejoin="arcs"
					>
						<path d="M9 10l6-6 6 6" />
						<path d="M4 20h7a4 4 0 0 0 4-4V5" />
					</svg>
				</div>
			)}
			{show.data && (
				<div className={`${styles.info} fs-xs`}>
					<Text content={show.data.title} asText />
				</div>
			)}
		</div>
		<img className={styles.laurel} src="/img/laurel.svg" />
	</div>
);

export default Prize;
