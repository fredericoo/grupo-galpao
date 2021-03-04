import styles from "./Prize.module.scss";

const Prize = ({ title, year, info }) => (
	<div className={styles.prize}>
		<div className={styles.textBox}>
			<h3 className={`h-3 ${styles.title}`}>{title}</h3>
			{info && <div className={`${styles.info} fs-xs`}>{info}</div>}
		</div>
		<img className={styles.laurel} src="/img/laurel.svg" />
	</div>
);

export default Prize;
