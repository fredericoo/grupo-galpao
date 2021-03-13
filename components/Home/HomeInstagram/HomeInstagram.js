import styles from "./HomeInstagram.module.scss";

import { useState, useEffect } from "react";
import Grid from "components/Grid/Grid";
import Columns from "components/Columns/Columns";
import Placeholder from "components/Placeholder/Placeholder";
import ColourSection from "components/ColourSection/ColourSection";
import useTranslation from "next-translate/useTranslation";

export const HomeInstagram = ({ count = 3 }) => {
	const [posts, setPosts] = useState(Array(count).fill({}));
	const [error, setError] = useState(false);
	useEffect(
		() =>
			fetch("/api/instagram")
				.then((res) => res.json())
				.then((data) =>
					setPosts(data.posts.data.user.edge_owner_to_timeline_media.edges)
				)
				.catch((err) => setError(true)),
		[]
	);

	if (error) return null;

	return (
		<ColourSection fg="#f5f5f5" bg="#141415">
			<Grid className="py-5">
				<Grid.Col>
					<Columns sm={2} lg={count}>
						{posts.slice(0, count).map((post) => (
							<Post
								imageSrc={post.node?.display_url}
								commentCount={post.node?.edge_media_to_comment.count}
								likeCount={post.node?.edge_media_preview_like.count}
								caption={post.node?.edge_media_to_caption.edges[0].node.text}
								width={post.node?.dimensions.width}
								height={post.node?.dimensions.height}
								isSkeleton={!!post.node}
								link={
									post.node
										? `https://instagram.com/p/${post.node?.shortcode}`
										: null
								}
							/>
						))}
					</Columns>
				</Grid.Col>
			</Grid>
		</ColourSection>
	);
};

const Post = ({
	imageSrc,
	width = 1080,
	height = 1080,
	caption,
	likeCount = 0,
	commentCount = 0,
	link,
	isSkeleton,
}) => {
	const { t } = useTranslation();
	return (
		<LinkWrapper link={link}>
			<figure className={`${styles.post} ${isSkeleton ? styles.skeleton : ""}`}>
				<div className={styles.image} style={{ "--ratio": height / width }}>
					{imageSrc && <img src={imageSrc} />}
				</div>
				<div className={styles.info}>
					<span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="butt"
							strokeLinejoin="arcs"
						>
							<path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
						</svg>{" "}
						{likeCount}{" "}
						<span className="visually-hidden">{t("common:curtidas")}</span>
					</span>
					<span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="butt"
							strokeLinejoin="arcs"
						>
							<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
						</svg>{" "}
						{commentCount}{" "}
						<span className="visually-hidden">{t("common:comentarios")}</span>
					</span>
				</div>
			</figure>
		</LinkWrapper>
	);
};

const LinkWrapper = ({ link, children }) =>
	link ? (
		<a href={link} target="_blank">
			{children}
		</a>
	) : (
		<>{children}</>
	);

export default HomeInstagram;
