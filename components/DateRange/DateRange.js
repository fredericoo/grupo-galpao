import moment from "moment";

export const DateRange = ({ from, to, formats }) => {
	const start = moment(from);
	const end = moment(to);
	const output = { start: [], joint: [], end: [] };

	let sameDate = true;
	formats.forEach((format) => {
		output.end.unshift(format(end));
		if (format(start) !== format(end) || !sameDate) {
			output.start.unshift(format(start));
			sameDate = false;
		}
	});

	if (!sameDate) output.joint.unshift("—");

	return (
		<>
			<SingleDate text={output.start.join(" ")} />
			{output.joint}
			<SingleDate text={output.end.join(" ")} />
		</>
	);
};

export default DateRange;

const SingleDate = ({ text }) => (
	<span style={{ display: "inline-block" }}>{text}</span>
);
