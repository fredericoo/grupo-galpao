import styles from "./Grid.module.scss";

const Grid = ({
	gap = "2rem",
	style,
	container,
	subgrid,
	children,
	className,
}) => {
	return (
		<div
			className={`${styles.grid} 
					${subgrid ? styles.subgrid : ""} 
					${container ? styles.container : ""} 
					${className ? className : ""} `}
			style={{ ...style, "--gap": gap }}
		>
			{children}
		</div>
	);
};

const Col = ({
	children,
	className,
	sm = "grid-start / grid-end",
	md,
	lg,
	xl,
	rowSm = "auto",
	rowMd,
	rowLg,
	rowXl,
	zIndex,
	style,
}) => {
	const colStyle = {
		...style,
		"--colSm": sm,
		"--colMd": md,
		"--colLg": lg,
		"--colXl": xl,
		"--rowSm": rowSm,
		"--rowMd": rowMd,
		"--rowLg": rowLg,
		"--rowXl": rowXl,
		"--zIndex": zIndex,
	};

	return (
		<div
			className={`${className ? className : ""} ${styles.col}`}
			style={colStyle}
		>
			{children}
		</div>
	);
	// if (Array.isArray(children) || typeof children === "string") {
	// 	return (
	// 		<div
	// 			className={`${className ? className : ""} ${styles.col}`}
	// 			style={style}
	// 		>
	// 			{children}
	// 		</div>
	// 	);
	// } else {
	// 	return (
	// 		<children.type
	// 			{...children.props}
	// 			className={`${className ? className : ""} ${styles.col} ${
	// 				children.props.className ? children.props.className : ""
	// 			}`}
	// 			style={style}
	// 		/>
	// 	);
	// }
};

Grid.Col = Col;
export default Grid;
