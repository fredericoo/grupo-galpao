import styles from "./Body.module.scss";

const Body = ({ children, className }) => (
	<div className={`${styles.body} ${className ? className : ""}`}>
		{children}
	</div>
);

export default Body;
