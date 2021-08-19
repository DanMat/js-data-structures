import { Compare, defaultCompare, Node, printNode } from './utils/tree';

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

	// Go to the smallest leaf first
	inOrderTraverse(callback = printNode) {
		const inOrderTraverseNode = (node, callbk) => {
			if (node !== undefined) {
				inOrderTraverseNode(node.left, callbk);
				callbk(node.key);
				inOrderTraverseNode(node.right, callbk);
			}
		};

		inOrderTraverseNode(this.root, callback);
	}

	// Visit the node prior to it's descendant
	preOrderTraverse(callback = printNode) {
		const preOrderTraverseNode = (node, callbk) => {
			if (node !== undefined) {
				callbk(node.key);
				preOrderTraverseNode(node.left, callbk);
				preOrderTraverseNode(node.right, callbk);
			}
		};

		preOrderTraverseNode(this.root, callback);
	}

	// Visit the node after visiting the descendant
	postOrderTraverse(callback = printNode) {
		const postOrderTraverseNode = (node, callbk) => {
			if (node !== undefined) {
				postOrderTraverseNode(node.left, callbk);
				postOrderTraverseNode(node.right, callbk);
				callbk(node.key);
			}
		};

		postOrderTraverseNode(this.root, callback);
	}
}
