class Node {
	constructor(key) {
		this.key = key;
		this.left = undefined;
		this.right = undefined;
	}
}

export const Compare = {
	LESS_THAN: -1,
	BIGGER_THAN: 1,
	EQUALS: 0,
};

export const defaultCompare = ({ currentNode, newKey }) => {
	if (currentNode === newKey) {
		return Compare.EQUALS;
	}
	return newKey > currentNode ? Compare.BIGGER_THAN : Compare.LESS_THAN;
};

export const printNode = (element) => console.info(element);

export { Node };
