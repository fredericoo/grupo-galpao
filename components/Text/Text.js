import { RichText } from "prismic-reactjs";

const Text = ({ content, asText }) => {
	if (Array.isArray(content)) {
		if (asText) return RichText.asText(content);
		return <RichText render={content} />;
	}
	if (typeof content === "string") {
		return <>{content}</>;
	}
	return null;
};
export default Text;
