import { Compare, defaultCompare, Node } from './utils/tree';

export default class BinarySearchTree {
	constructor(compareFn = defaultCompare) {
		this.root = undefined;
		this.compareFn = compareFn;
	}

	insert(key) {
		const insertNode = (node, newKey) => {
			if (
				this.compareFn({ currentNode: node.key, newKey }) ===
				Compare.BIGGER_THAN
			) {
				if (node.right === undefined) {
					node.right = new Node(newKey);
				} else {
					insertNode(node.right, newKey);
				}
			} else if (node.left === undefined) {
				node.left = new Node(newKey);
			} else {
				insertNode(node.left, newKey);
			}
		};

		// First insert
		if (this.root === undefined) {
			this.root = new Node(key);
		} else {
			insertNode(this.root, key);
		}
	}
}
