import styles from "./Flow.module.scss";

const Flow = ({
	className,
	spacing = "1rem",
	horizontal = false,
	children,
	style,
}) => (
	<div
		style={{ ...style, "--flow__spacing": spacing }}
		className={`${styles.flow} ${horizontal && styles.horizontal} ${
			className ? className : ""
		}`}
	>
		{children}
	</div>
);

export default Flow;
