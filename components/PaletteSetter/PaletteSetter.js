import { useContext } from "react";
import { ColourContext } from "utils/context";

const PaletteSetter = ({ children }) => {
	const [colourPalette, _] = useContext(ColourContext);
	return (
		<div style={{ "--bg": colourPalette?.bg, "--fg": colourPalette?.fg }}>
			{children}
		</div>
	);
};

export default PaletteSetter;
