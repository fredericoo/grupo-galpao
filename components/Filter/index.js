import styles from "./styles.module.scss";
import useTranslation from "next-translate/useTranslation";

const Filter = ({ categories, filter, setFilter }) => {
	const { t } = useTranslation();

	return (
		<ul className={styles.ul}>
			<li
				className={`${styles.li} ${filter === "" ? styles.active : ""}`}
				key={"all"}
			>
				<button onClick={() => setFilter("")}>
					{t("common:categories.Todos")}
				</button>
			</li>
			{categories.map((cat) => (
				<li
					key={cat}
					className={`${styles.li} ${filter === cat ? styles.active : ""}`}
				>
					<button onClick={() => setFilter(cat)}>
						{t(`common:categories.${cat}`)}
					</button>
				</li>
			))}
		</ul>
	);
};

export default Filter;
