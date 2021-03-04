import styles from "./Timeline.module.scss";
import { useState } from "react";
import Text from "components/Text/Text";
import Placeholder from "components/Placeholder/Placeholder";
import { RichText } from "prismic-reactjs";
import Button from "components/Button/Button";
import Flow from "components/Flow/Flow";

const Timeline = ({ events }) => {
	return (
		<ul className={styles.timeline}>
			{events?.map((event, key) => (
				<Event
					key={key}
					title={event.timeline_title}
					year={event.timeline_ano}
					short={event.timeline_short}
					long={event.timeline_long}
					img={event.timeline_img}
				/>
			))}
		</ul>
	);
};

const Event = ({ year, title, short, long, img }) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<li className={styles.event}>
			<div className={styles.img}>
				<Placeholder
					src={img.url}
					width={img.dimensions.width}
					height={img.dimensions.height}
					alt={img.alt}
					layout="responsive"
				/>
				<p>{year}</p>
			</div>
			<div className={styles.txt}>
				<h3 className="h-3" style={{ marginBottom: "1rem" }}>
					<Text asText content={title} />
				</h3>
				<div className="body fs-sm">
					<Text content={short} />
					{!!RichText.asText(long).length && !expanded && (
						<Button onClick={() => setExpanded(true)} type="ghost">
							Ler Mais
						</Button>
					)}
					{expanded && <Text content={long} />}
				</div>
			</div>
		</li>
	);
};

export default Timeline;
