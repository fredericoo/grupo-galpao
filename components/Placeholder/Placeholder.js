import Image from "next/image";
import { useState } from "react";
import styles from "./Placeholder.module.scss";

const Placeholder = ({ style, bg = "#f0f0f0", ...props }) => {
	if (!props || !props.src) return null;
	const [loaded, setLoaded] = useState(false);
	const handleLoad = (e) => {
		if (e.target.src.indexOf("data:image/gif;base64") < 0) {
			setLoaded(true);
		}
	};
	return (
		<div
			style={{ ...style, "--placeholder_bg": bg }}
			className={`${styles.placeholder} ${loaded ? styles.loaded : ""}`}
		>
			<Image
				objectFit="cover"
				className={`${styles.image}`}
				{...props}
				src={props.src.replace("auto=compress,format", "")}
				onLoad={handleLoad}
				quality={90}
			/>
		</div>
	);
};

export default Placeholder;
