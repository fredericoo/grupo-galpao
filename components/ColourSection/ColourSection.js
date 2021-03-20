import useColourEffect from "utils/hooks/useColourEffect";

const ColourSection = ({ bg, fg, children }) => {
	const [_, targetRef] = useColourEffect({
		bg: bg || "#ffffff",
		fg: fg || "#000000",
	});
	return <section ref={targetRef}>{children}</section>;
};

export default ColourSection;
