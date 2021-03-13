import styles from "./Metric.module.scss";
import Text from "components/Text/Text";

const Metric = ({ text, number }) => (
	<div className={styles.metric}>
		<p className={`${styles.text} h-3`}>
			<Text content={text} />
		</p>
		<p className={`${styles.number} h-1`}>
			<Text content={number} />
		</p>
	</div>
);

export default Metric;
