import { Compare, defaultCompare, Node, print } from './utils/tree';

export default class BinarySearchTree {
	constructor(compareFn = defaultCompare) {
		this.root = undefined;
		this.compareFn = compareFn;
	}

	insert(key) {
		const insertNode = (node, newKey) => {
			if (
				this.compareFn({ currentNode: node.key, key: newKey }) ===
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
	inOrderTraverse(callback = print) {
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
	preOrderTraverse(callback = print) {
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
	postOrderTraverse(callback = print) {
		const postOrderTraverseNode = (node, callbk) => {
			if (node !== undefined) {
				postOrderTraverseNode(node.left, callbk);
				postOrderTraverseNode(node.right, callbk);
				callbk(node.key);
			}
		};

		postOrderTraverseNode(this.root, callback);
	}

	min() {
		const minNode = (node) => {
			let current = node;
			while (current.left !== undefined) {
				current = current.left;
			}
			return current.key;
		};

		return this.root === undefined
			? print('Tree is empty.')
			: minNode(this.root);
	}

	max() {
		const maxNode = (node) => {
			let current = node;
			while (current.right !== undefined) {
				current = current.right;
			}
			return current.key;
		};

		return this.root === undefined
			? print('Tree is empty.')
			: maxNode(this.root);
	}

	search(key) {
		const searchNode = (node, searchKey) => {
			if (node === undefined) {
				return false;
			}

			if (
				this.compareFn({ currentNode: node.key, key: searchKey }) ===
				Compare.BIGGER_THAN
			) {
				return searchNode(node.right, searchKey);
			} else if (
				this.compareFn({ currentNode: node.key, key: searchKey }) ===
				Compare.LESS_THAN
			) {
				return searchNode(node.left, searchKey);
			}
			return true;
		};

		return searchNode(this.root, key);
	}
}
