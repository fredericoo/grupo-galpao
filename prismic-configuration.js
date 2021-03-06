module.exports = {
	// -- Prismic API endpoint
	// Determines which repository to query and fetch data from
	// Configure your site's access point here
	apiEndpoint: "https://galpao.cdn.prismic.io/api/v2",
	accessToken: process.env.PRISMIC_ACCESS_TOKEN,

	// -- Link resolution rules
	// Manages links to internal Prismic documents
	// Modify as your project grows to handle any new routes you've made
	linkResolver: function (doc) {
		if (doc.type === "show") {
			return `/${doc.lang}/repertorio/${doc.uid}`;
		}
		if (doc.type === "member") {
			return `/${doc.lang}/elenco/${doc.uid}`;
		}
		if (doc.type === "event") {
			return `/${doc.lang}/agenda/${doc.uid}`;
		}
		if (doc.type === "home") {
			return `/${doc.lang}`;
		}
		if (doc.type === "premios_e_festivais") {
			return `/${doc.lang}/premios-festivais`;
		}
		if (doc.link_type === "Web") {
			return doc.url;
		}
		if (doc.url) {
			return doc.url;
		}
		return `/${doc.uid}`;
	},

	// Additional helper function for Next/Link component
	hrefResolver: function (doc) {
		if (doc.type === "show") {
			return `/${doc.lang}/repertorio/${doc.uid}`;
		}
		if (doc.type === "member") {
			return `/${doc.lang}/elenco/${doc.uid}`;
		}
		if (doc.type === "event") {
			return `/${doc.lang}/agenda/${doc.uid}`;
		}
		if (doc.type === "premios_e_festivais") {
			return `/${doc.lang}/premios-festivais`;
		}
		if (doc.type === "home") {
			return `/${doc.lang}`;
		}
		if (doc.link_type === "Web") {
			return doc.url;
		}
		if (doc.url) {
			return doc.url;
		}
		return `/${doc.uid}`;
	},
};
