import useSWR from "swr";
import { Client } from "utils/prismicHelpers";
import { useRouter } from "next/router";
import { createContext, useContext } from "react";

const ConfigContext = createContext({ data: {}, error: {} });

export const ConfigProvider = ({ children }) => {
	const { locale } = useRouter();

	async function fetcher(lang) {
		const client = Client();

		const doc = await client.getSingle("config", {
			lang: lang,
			fetchLinks: ["logos.title", "logos.logos"],
		});
		return doc.data;
	}
	const config = useSWR(locale, fetcher, {
		revalidateOnFocus: false,
	});

	return (
		<ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
	);
};

export const useConfig = () => {
	const config = useContext(ConfigContext);
	return config;
};
