module.exports = {
	// -- Prismic API endpoint
	// Determines which repository to query and fetch data from
	// Configure your site's access point here
	apiEndpoint: process.env.PRISMIC_API_ENDPOINT,
	accessToken: process.env.PRISMIC_ACCESS_TOKEN,

	// -- Link resolution rules
	// Manages links to internal Prismic documents
	// Modify as your project grows to handle any new routes you've made
	linkResolver: function (doc) {
		if (doc.type === "show") {
			return `/${doc.lang}/repertorio/${doc.uid}`;
		}
		if (doc.type === "homepage") {
			return `/${doc.lang}`;
		}
		return "/";
	},

	// Additional helper function for Next/Link component
	hrefResolver: function (doc) {
		if (doc.type === "show") {
			return `/${doc.lang}/repertorio/${doc.uid}`;
		}
		if (doc.type === "homepage") {
			return `/${doc.lang}`;
		}
		return "/";
	},
};
