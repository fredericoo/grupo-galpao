import styles from "./Hero.module.scss";
import { useContext, useEffect, useState, useRef } from "react";
import { ColourContext } from "utils/context";
import Slide from "./Slide";

import Grid from "components/Grid/Grid";
import Button from "components/Button/Button";
import useColourEffect from "../../utils/hooks/useColourEffect";

const Hero = ({ banners }) => {
	const [interacted, setInteracted] = useState(false);
	const [colourPalette, setPalette] = useContext(ColourContext);
	const [slide, setSlide] = useState(0);
	const [isInViewport, targetRef] = useColourEffect({
		bg: banners[slide].bg,
		fg: banners[slide].fg,
	});
	const interval = useRef();

	const slides = {
		previous: slide <= 0 ? banners.length - 1 : slide - 1,
		next: slide + 1 >= banners.length ? 0 : slide + 1,
	};

	useEffect(() => {
		if (!isInViewport) setInteracted(true);
	}, [isInViewport]);

	const changeSlide = (slideNo) => {
		const current = banners[slideNo];
		setPalette({
			colourPalette,
			bg: current.bg || "var(--colour__bg)",
			fg: current.fg || "var(--colour__main)",
		});
		setSlide(slideNo);
	};

	useEffect(() => {
		clearTimeout(interval.current);
		if (!interacted) {
			const nextSlide = () => changeSlide(slides.next);
			interval.current = setTimeout(() => nextSlide(), 6000);
		}
		return () => clearTimeout(interval.current);
	}, [slide, interacted]);

	return (
		<section
			ref={targetRef}
			className={styles.hero}
			onClick={() => setInteracted(true)}
		>
			<Slide key={slide} content={banners[slide]} />
			<Grid container className={styles.nav}>
				<Grid.Col className={styles.previous} sm="span 4">
					<Button
						disabled={!isInViewport}
						onClick={() => (changeSlide(slides.previous), setInteracted(true))}
						type="ghost"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="butt"
							strokeLinejoin="arcs"
						>
							<path d="M19 12H6M12 5l-7 7 7 7" />
						</svg>
					</Button>
				</Grid.Col>
				<Grid.Col sm="span 4" className={styles.outof}>
					<span className={styles.current}>{slide + 1}</span> ⁄{" "}
					<span className={styles.total}>{banners.length}</span>
				</Grid.Col>
				<Grid.Col className={styles.next} sm="span 4">
					<Button
						onClick={() => (changeSlide(slides.next), setInteracted(true))}
						type="ghost"
						disabled={!isInViewport}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="butt"
							strokeLinejoin="arcs"
						>
							<path d="M5 12h13M12 5l7 7-7 7" />
						</svg>
					</Button>
				</Grid.Col>
			</Grid>
		</section>
	);
};

export default Hero;
