export const groupHasItems = (group) => {
	if (!group || !Array.isArray(group) || !group.length) return false;
	return (
		group.length > 1 ||
		!!group.filter(
			(item) => !!Object.values(item).filter((value) => value).length
		).length
	);
};
