import { RichText } from "prismic-reactjs";

const Text = ({ content, asText }) => {
	if (typeof content === "object") {
		if (asText) return RichText.asText(content);
		return <RichText render={content} />;
	}
	if (typeof content === "string") {
		return <>{content}</>;
	}
	return null;
};
export default Text;
