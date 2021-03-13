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
		"https://instagram28.p.rapidapi.com/medias?user_id=146277005&next_cursor=QVFDQjY1YkdMY0x0YTFEdWo4R21CNFVuMUV0WmpIdUdlWVNTaXY4VXlVdkYyZEhJT2tBay1aRDN4OWpUMFZHbG1KNmpiMnQ2Z09FVjFhWHUxTDBfNDh5Yg==&batch_size=20",
		requestOptions
	)
		.then((response) => response.json())
		.then((data) => {
			res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
			res.json({ timestamp, posts: data });
		})
		.catch((err) => {
			res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate");
			res.json({ err });
		});
}

export default instagram;
