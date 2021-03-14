async function getImageUrl(destaque) {
	const cheerio = require("cheerio");
	return await fetch(destaque.url)
		.then((res) => res.text())
		.then((html) => {
			const $ = cheerio.load(html, { decodeEntities: false });
			return {
				title: destaque.title,
				url: destaque.url,
				price: destaque.price,
				img: $("#container_thumb", html)[0].attribs["href"],
			};
		})
		.catch((err) => err);
}

export default async function loja(req, res) {
	const iconv = require("iconv-lite");
	const cheerio = require("cheerio");

	const url = "https://www.lojagrupogalpao.com.br/lancamentos";
	const products = await fetch(url)
		.then((res) => res.arrayBuffer())
		.then((arrayBuffer) =>
			iconv.decode(new Buffer(arrayBuffer), "ISO-8859-1").toString()
		)
		.then((html) => {
			const getUrlFromNode = (child) =>
				!!$("a", child).length ? $("a", child)[0].attribs["href"] : "";

			const getPriceFromNode = (child) =>
				$(".product-price .product-price", child)
					.text()
					.match(/(\d+[\,\.]\d\d)/);

			const $ = cheerio.load(html, { decodeEntities: false });
			return Object.values($(".product", html))
				.filter((child) => !!getPriceFromNode(child))
				.slice(0, 3)
				.map((child) => {
					const price = getPriceFromNode(child);
					const url = getUrlFromNode(child);
					return {
						title: $(".product-name", child).text(),
						price: price ? price[1] : "",
						url: url,
					};
				});
		})
		.catch(function (err) {
			res.status(501).json({ success: false, data: "Internal Server Error" });
		});

	const output = await Promise.all(
		products.map((destaque) => getImageUrl(destaque))
	);

	res.setHeader("Cache-Control", "s-maxage=43200, stale-while-revalidate");
	res.status(200).json({ success: true, data: output });
}
