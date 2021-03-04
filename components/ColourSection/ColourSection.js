import useColourEffect from "utils/hooks/useColourEffect";

const ColourSection = ({ bg, fg, children }) => {
	const [_, targetRef] = useColourEffect({
		bg,
		fg,
	});
	return <section ref={targetRef}>{children}</section>;
};

export default ColourSection;
