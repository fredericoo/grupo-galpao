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
			{photo?.url ? (
				<Placeholder
					src={photo?.url || "/img/placeholder.png"}
					width={916}
					height={567}
					alt={name}
					layout="responsive"
					sizes="(max-width: 768px) 150px,
                                    (max-width: 1920px) 300px,
                                    600px"
				/>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 916 567"
					fill="currentColor"
				>
					<path
						transform="translate(320,150)"
						d="M194.2,228.3l-74.4-53.9l-74,53.9L74,141.1L0,87.2h91.7L119.8,0l28.5,87.2H240l-74.4,53.9L194.2,228.3L194.2,228.3z"
					/>
				</svg>
			)}
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
