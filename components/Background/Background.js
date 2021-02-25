import styles from "./Background.module.scss";
import { useContext } from "react";
import { ColourContext } from "utils/context";

const Background = () => {
	const [colourPalette, _] = useContext(ColourContext);
	return (
		<aside
			className={styles.background}
			style={{ backgroundColor: colourPalette?.bg }}
		></aside>
	);
};

export default Background;
