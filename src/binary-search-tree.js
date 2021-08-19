import { Compare, defaultCompare, Node, print } from './utils/tree';

/**
 * These methods are scoped for the usage BST
 */
const minNode = (node) => {
	let current = node;
	while (current.left !== undefined) {
		current = current.left;
	}
	return current;
};

const maxNode = (node) => {
	let current = node;
	while (current.right !== undefined) {
		current = current.right;
	}
	return current;
};

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
		return this.root === undefined
			? print('Tree is empty.')
			: minNode(this.root).key;
	}

	max() {
		return this.root === undefined
			? print('Tree is empty.')
			: maxNode(this.root).key;
	}

	search(key) {
		return searchNode(this.root, key);
	}

	remove(key) {
		const removeNode = (node, deleteKey) => {
			// Search for the key first
			if (node === undefined) {
				return undefined;
			}
			if (
				this.compareFn({ currentNode: node.key, key: deleteKey }) ===
				Compare.BIGGER_THAN
			) {
				// Update the parent reference of the child with the
				// changes that might occur in the recursion
				node.right = removeNode(node.right, deleteKey);
				// This returns the updated node value to the
				// previous iteration of the recursion.
				return node;
			} else if (
				this.compareFn({ currentNode: node.key, key: deleteKey }) ===
				Compare.LESS_THAN
			) {
				node.left = removeNode(node.left, deleteKey);
				return node;
			}

			// We found a match at this point to the deleteKey
			// case 1: Delete leaf node
			if (node.left === undefined && node.right === undefined) {
				node = undefined;
				// This will update the parent node's reference
				// of the leaf node to undefined.
				return node;
			}

			// case 2: Node has one child
			if (node.left === undefined) {
				// Replace the current node with the right child
				node = node.right;
				// Return the updated node to update
				// the parent's reference.
				return node;
			} else if (node.right === undefined) {
				// Replace the current node with the left child
				node = node.left;
				return node;
			}

			// case 3: Node with 2 children
			const minNodeInRightSubTree = minNode(node.right);
			// Update the key which needs to be removed with
			// the min node from the right-hand side subtree
			node.key = minNodeInRightSubTree.key;
			// The previous step created a duplicate node.
			// So, we need to delete the min value we found
			// on the right-hand side subtree and update our
			// current nodes right reference with the new structure.
			node.right = removeNode(node.right, minNodeInRightSubTree.key);
			// Return the updated node
			return node;
		};

		this.root = removeNode(this.root, key);
	}
}
