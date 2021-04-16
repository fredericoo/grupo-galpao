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
