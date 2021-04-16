import styles from "./MemberCard.module.scss";
import Link from "next/link";
import Text from "components/Text/Text";
import Placeholder from "components/Placeholder/Placeholder";

const MemberCard = ({ name, photo, position, link }) => {
	if (link) {
		return (
			<Link href={link}>
				<a className={`ta-center ${styles.wrapper}`}>
					<figure className={styles.image}>
						<Placeholder
							src={photo?.url || "/img/placeholder.png"}
							width={916}
							height={567}
							alt={name}
							layout="responsive"
						/>
					</figure>

					<h3 className="h-3 my-1">
						<span>
							<Text content={name} asText />
						</span>
					</h3>
					<h4 className={`smcp ${styles.position}`}>
						<Text content={position} asText />
					</h4>
				</a>
			</Link>
		);
	} else {
		return null;
	}
};

export default MemberCard;
