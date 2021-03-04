import styles from "./Sponsors.module.scss";

import {
	Selos,
	Master,
	Patrocinio,
	Apoio,
	Realizacao,
} from "components/Sponsors/svg";

export const Sponsors = () => (
	<div className={styles.sponsors}>
		<Selos />
		<Master />
		<Patrocinio />
		<Apoio />
		<Realizacao />
	</div>
);

export default Sponsors;
