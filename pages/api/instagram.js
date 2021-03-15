import moment from "moment";

async function instagram(_, res) {
	const timestamp = moment().format();

	const reqHeaders = new Headers();
	reqHeaders.append("x-rapidapi-key", process.env.RAPIDAPI_KEY);
	reqHeaders.append("x-rapidapi-host", "instagram28.p.rapidapi.com");

	const requestOptions = {
		method: "GET",
		headers: reqHeaders,
		redirect: "follow",
	};

	await fetch(
		"https://instagram28.p.rapidapi.com/medias?user_id=146277005&batch_size=5",
		requestOptions
	)
		.then((response) => response.json())
		.then((data) => {
			res.setHeader("Cache-Control", "s-maxage=43200, stale-while-revalidate");
			res.json({ timestamp, posts: data });
		})
		.catch((err) => {
			res.json({ err });
		});
}

export default instagram;
