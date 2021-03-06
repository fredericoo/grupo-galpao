import styles from "./Slide.module.scss";

import Button from "components/Button/Button";
import Grid from "components/Grid/Grid";
import Columns from "components/Columns/Columns";
import Flow from "components/Flow/Flow";
import Text from "components/Text/Text";
import Placeholder from "components/Placeholder/Placeholder";

import { hrefResolver } from "prismic-configuration";

import { AnimatePresence, motion } from "framer-motion";

const Slide = ({ content }) => {
	return (
		<AnimatePresence>
			<div className={styles.slide}>
				{content.bgimg?.url && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{
							opacity: 0.8,
						}}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 90,
							delay: 0.3,
						}}
					>
						<Placeholder
							className={styles.bgimg}
							layout="fill"
							src={content.bgimg.url}
						/>
					</motion.div>
				)}
				<motion.div
					initial={{ translateY: "10%" }}
					animate={{
						translateY: "0%",
					}}
					style={{ height: "100%" }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
				>
					<Grid style={{ height: "100%" }}>
						<Grid.Col
							zIndex={1}
							rowSm={1}
							sm="screen-start / col-6"
							md="grid-start / span 3"
						>
							{content.img1?.url && <ImageBit image={content.img1} />}
						</Grid.Col>
						<Grid.Col
							zIndex={2}
							rowSm={1}
							sm="grid-start / grid-end"
							md="span 6"
							className={styles.textColumn}
						>
							<Flow>
								<header className={`${styles.header}`}>
									{content.subtitle && (
										<h3 className={`${styles.subtitle} smcp`}>
											<Text content={content.subtitle} asText />
										</h3>
									)}
									{content.logo?.url ? (
										<motion.figure
											key="logo"
											initial={{ translateY: "100%" }}
											animate={{ translateY: "0%" }}
											transition={{
												type: "spring",
												stiffness: 300,
												damping: 50,
											}}
											className={styles.logo}
										>
											<Placeholder
												src={content.logo.url}
												alt={content.logo.alt}
												width={content.logo.dimensions.width}
												height={content.logo.dimensions.height}
												layout="responsive"
												quality={100}
												objectFit="contain"
												bg="transparent"
											/>
										</motion.figure>
									) : (
										content.title && (
											<motion.h2
												initial={{ translateY: "100%" }}
												animate={{ translateY: "0%" }}
												transition={{
													type: "spring",
													stiffness: 300,
													damping: 50,
												}}
												className={`${styles.title} h-2`}
											>
												<Text content={content.title} asText />
											</motion.h2>
										)
									)}
								</header>
								<Columns
									sm={1}
									lg={
										!!content.text2[0]?.text?.length &&
										!!content.text[0]?.text?.length
											? 2
											: 1
									}
								>
									<div
										className={`${styles.textBlock} body fs-sm 
										${!content.text2[0]?.text?.length ? "ta-center" : ""}`}
									>
										{content.text && <Text content={content.text} />}
										{!content.text2[0]?.text?.length &&
											content.link &&
											content.cta && (
												<Button
													href={hrefResolver(content.link)}
													type="primary"
												>
													{content.cta}
												</Button>
											)}
									</div>
									<div className={`${styles.textBlock} body fs-sm`}>
										{content.text2 && <Text content={content.text2} />}
										{!!content.text2[0]?.text?.length &&
											content.link &&
											content.cta && (
												<Button
													href={hrefResolver(content.link)}
													type="primary"
												>
													{content.cta}
												</Button>
											)}
									</div>
								</Columns>
							</Flow>
						</Grid.Col>
						<Grid.Col zIndex={1} rowSm={1} sm="col-6 / screen-end" md="span 3">
							{content.img2?.url && (
								<ImageBit image={content.img2} delay={0.3} />
							)}
						</Grid.Col>
					</Grid>
				</motion.div>
			</div>
		</AnimatePresence>
	);
};

const ImageBit = ({ image, delay }) => (
	<div className={styles.image}>
		<motion.figure
			key={image.url}
			initial={{ translateY: "120%" }}
			animate={{ translateY: "0%" }}
			transition={{
				type: "spring",
				stiffness: 300,
				damping: 60,
				delay: delay || 0.15,
			}}
		>
			<Placeholder
				src={image.url}
				alt={image.alt}
				objectFit="contain"
				layout="fill"
			/>
		</motion.figure>
	</div>
);

export default Slide;
