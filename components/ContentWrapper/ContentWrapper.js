import styles from "./ContentWrapper.module.scss";

const ContentWrapper = ({ navbarOpen, children }) => (
	<main className={`${styles.wrapper} ${navbarOpen ? styles.navbarOpen : ""}`}>
		{children}
	</main>
);

export default ContentWrapper;
