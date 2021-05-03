import styles from "./styles.module.scss";

const Filter = ({ categories, filter, setFilter }) => {
	return (
		<ul className={styles.ul}>
			<li
				className={`${styles.li} ${filter === "" ? styles.active : ""}`}
				key={"todos"}
			>
				<button onClick={() => setFilter("")}>Todos</button>
			</li>
			{categories.map((cat) => (
				<li
					key={cat}
					className={`${styles.li} ${filter === cat ? styles.active : ""}`}
				>
					<button onClick={() => setFilter(cat)}>{cat}</button>
				</li>
			))}
		</ul>
	);
};

export default Filter;
