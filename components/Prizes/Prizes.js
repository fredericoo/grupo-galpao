import styles from "./Prizes.module.scss";
import Prize from "./Prize";

const Prizes = ({ entries, showYears = true }) => {
	const entriesByYear = Array.from(
		new Set(entries.map((entry) => entry.prizes_year))
	)
		.map((year) => ({
			year,
			prizes: entries.filter((entry) => entry.prizes_year === year),
		}))
		.sort((a, b) => b.year - a.year);

	return (
		<div>
			{entriesByYear.map((group, key) => (
				<div key={key}>
					{showYears && <h3 className="h-2 ta-center my-3">{group.year}</h3>}
					<ul className={styles.prizes}>
						{group.prizes
							.filter((prize) => prize.prizes_title)
							.map((prize, key) => (
								<li key={key}>
									<Prize
										title={prize.prizes_title}
										year={prize.prizes_year}
										info={prize.prizes_cat}
										member={prize.prizes_actor}
										show={prize.prizes_play}
									/>
								</li>
							))}
					</ul>
				</div>
			))}
		</div>
	);
};

export default Prizes;
