import styles from "./PhotoCarousel.module.scss";
import Placeholder from "components/Placeholder/Placeholder";
import Button from "components/Button/Button";
import { useState } from "react";

const PhotoCarousel = ({ photos }) => {
	if (typeof photos != "object" || !photos.length || !photos[0].image.url)
		return null;

	const [slideIndex, setSlideIndex] = useState(0);

	const changeSlide = (slideNo) => {
		setSlideIndex(slideNo);
	};

	const displaySlides = {
		previous: slideIndex <= 0 ? photos.length - 1 : slideIndex - 1,
		current: slideIndex,
		next: slideIndex + 1 >= photos.length ? 0 : slideIndex + 1,
	};

	return (
		<div className={`${styles.section} grid grid--full`}>
			<CarouselSlide
				key={"prev" + photos[displaySlides.previous].image.url}
				photo={photos[displaySlides.previous].image}
				onClick={() => changeSlide(displaySlides.previous)}
			>
				<Button type="ghost">
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
			</CarouselSlide>
			<CarouselSlide
				key={photos[displaySlides.current].image.url}
				photo={photos[displaySlides.current].image}
			/>
			<CarouselSlide
				key={"next" + photos[displaySlides.next].image.url}
				onClick={() => changeSlide(displaySlides.next)}
				photo={photos[displaySlides.next].image}
			>
				<Button type="ghost">
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
			</CarouselSlide>
			<div className={`${styles.slideNo}`}>
				{" "}
				{slideIndex + 1} / {photos.length}
			</div>
		</div>
	);
};

const CarouselSlide = ({ photo, onClick, children }) => {
	if (!photo.url) return null;
	const photoProps = onClick
		? { layout: "fill", objectFit: "cover" }
		: {
				objectFit: "contain",
				objectPosition: "center",
				layout: "fill",
		  };
	return (
		<figure
			className={`${styles.slide} ${onClick ? styles.interactive : ""}`}
			onClick={onClick}
		>
			{children}
			<Placeholder src={photo.url} {...photoProps} alt={photo.alt} />
		</figure>
	);
};

export default PhotoCarousel;
