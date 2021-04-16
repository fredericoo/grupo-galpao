import styles from "./MemberCard.module.scss";
import Link from "next/link";
import Text from "components/Text/Text";
import Placeholder from "components/Placeholder/Placeholder";

const Wrapper = ({ href, children }) => {
	const className = `ta-center ${styles.wrapper}`;
	return href ? (
		<Link href={href}>
			<a className={className}>{children}</a>
		</Link>
	) : (
		<div className={className}>{children}</div>
	);
};
const MemberCard = ({ name, photo, position, link }) => (
	<Wrapper href={link}>
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
	</Wrapper>
);

export default MemberCard;
