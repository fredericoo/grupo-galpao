import styles from "./Loader.module.scss";

const Loader = () => (
	<div className={styles.wrapper}>
		<svg version="1.1" viewBox="0 0 512 512">
			<polygon
				points="414.2,487.1 255.6,372.2 97.8,487.1 157.8,301 0,186.1 195.5,186.1 255.6,0 316.5,186.1 512,186.1 
        	353.3,301 "
			/>
		</svg>
	</div>
);

export default Loader;
