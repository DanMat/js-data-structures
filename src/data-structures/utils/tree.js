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

export const defaultCompare = ({ currentNode, key }) => {
	if (currentNode === key) {
		return Compare.EQUALS;
	}
	return key > currentNode ? Compare.BIGGER_THAN : Compare.LESS_THAN;
};

export const print = (value) => console.info(value);

export { Node };
