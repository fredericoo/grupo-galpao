import styles from "./NewsletterForm.module.scss";
import Head from "next/head";

const NewsletterForm = () => {
	return (
		<>
			<Head>
				<script
					src="https://optin.entregaemails.com.br/accounts/105267/forms/3"
					type="text/javascript"
					charset="utf-8"
					async
					defer
				></script>
			</Head>

			<div className={styles.form} id="opt_3"></div>
		</>
	);
};

export default NewsletterForm;
