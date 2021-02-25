import { useEffect, useContext } from "react";
import { ColourContext } from "utils/context";
import useIsInViewport from "use-is-in-viewport";

const useColourEffect = ({ bg, fg }) => {
	const [isInViewport, targetRef] = useIsInViewport({
		modBottom: "-50%",
		modTop: "-49.9%",
	});
	const [colourPalette, setColourPalette] = useContext(ColourContext);
	useEffect(() => {
		if (isInViewport) setColourPalette({ ...colourPalette, bg, fg });
	}, [isInViewport]);
	return [isInViewport, targetRef];
};

export default useColourEffect;
