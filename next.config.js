const nextTranslate = require("next-translate");

module.exports = {
	...nextTranslate({
		webpack: (config, { isServer, webpack }) => {
			return config;
		},
	}),
	images: {
		domains: [
			"images.prismic.io",
			"galpao.cdn.prismic.io",
			"images.tcdn.com.br",
			"scontent-lga3-1.cdninstagram.com",
			"scontent-iad3-2.cdninstagram.com",
		],
		deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048],
	},
	async headers() {
		return [
			{
				source: "/:path*{/fonts}?",
				headers: [
					{
						key: "Cache-Control",
						value: "public,max-age=31536000,immutable",
					},
				],
			},
			{
				source: "/:path*{/img}?",
				headers: [
					{
						key: "Cache-Control",
						value: "public,max-age=31536000,immutable",
					},
				],
			},
		];
	},
};
