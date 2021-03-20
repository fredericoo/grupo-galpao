import Link from "next/link";
import Text from "components/Text/Text";

const MemberCard = ({ name, photo, position, link }) => {
	if (link) {
		return (
			<Link href={link}>
				{photo && (
					<Placeholder
						src={photo.url}
						width={photo.dimensions.width}
						height={photo.dimensions.height}
						alt={photo.alt}
					/>
				)}
				<h3>
					<Text content={name} asText />
				</h3>
				<h4>
					<Text content={position} asText />
				</h4>
			</Link>
		);
	} else {
		return null;
	}
};

export default MemberCard;
