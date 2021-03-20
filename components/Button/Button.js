import Link from "next/link";
import styles from "./Button.module.scss";

const Button = ({
	children,
	href,
	onClick,
	type = "primary",
	size = "md",
	disabled = false,
}) => {
	const buttonClass = `${styles.button} ${
		type ? styles[`type--${type}`] : ""
	} ${size ? styles[`size--${size}`] : ""}
	${disabled ? styles.disabled : ""}`;

	if (!href)
		return (
			<button
				onClick={disabled ? () => {} : onClick}
				type="button"
				className={buttonClass}
			>
				{children}
			</button>
		);

	return (
		<Link href={href}>
			<a className={buttonClass}>{children}</a>
		</Link>
	);
};
export default Button;
