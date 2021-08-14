import {
	Node,
	defaultEquals,
	defaultStringify,
	isIndexOutOfBound,
	isValidIndex,
} from './utils/linked-list';

class LinkedList {
	constructor(equals = defaultEquals, stringifyNode = defaultStringify) {
		this.head = null;
		this.count = 0;
		this.equals = equals;
		this.stringify = stringifyNode;
	}

	push(element) {
		const node = new Node(element);
		if (this.head === null) {
			// This handles the first push
			this.head = node;
		} else {
			let currentNode = this.head;
			// Iterate to the last item
			while (currentNode.next !== undefined) {
				currentNode = currentNode.next;
			}
			// Assign the new node to the end
			currentNode.next = node;
		}
		this.count += 1;
	}

	insertAtIndex(index, element) {
		// Handle invalid indexes
		if (!isValidIndex(index, this.size())) return false;

		// Handle empty list insert
		if (this.size() === 0 && index === 0) {
			return this.push(element);
		}

		const node = new Node(element);
		let currentNode = this.head;

		if (index === 0) {
			// Handle first node by making the new node to point to the
			// current node. And, updating the head to the new node.
			node.next = currentNode;
			this.head = node;
		} else {
			// Link the new node to point to the current node
			// And, update the previous node to point to the new node
			const previousNode = this.nodeAtIndex(index - 1);
			currentNode = previousNode.next;
			node.next = currentNode;
			previousNode.next = node;
		}
		this.count += 1;
		return true;
	}

	remove(element) {
		const indexOfNode = this.indexOf(element);
		return this.removeAtIndex(indexOfNode);
	}

	removeAtIndex(index) {
		if (isIndexOutOfBound(index, this.size())) return null;
		let currentNode = this.head;
		if (index === 0) {
			// Handle first node by moving the head to
			// the node the current node is pointing to
			this.head = currentNode.next;
		} else {
			const previousNode = this.nodeAtIndex(index - 1);
			currentNode = previousNode.next;
			// We detach the node at index by re-pointing the previous
			// node to the one the node at index is pointing to
			previousNode.next = currentNode.next;
		}
		this.count -= 1;
		return currentNode.element;
	}

	nodeAtIndex(index) {
		if (isIndexOutOfBound(index, this.size())) return null;
		let node = this.head;
		// Loop to index to get the node
		for (let i = 0; i < index; i += 1) {
			node = node.next;
		}
		return node;
	}

	indexOf(element) {
		let currentNode = this.head;
		let index = 0;

		while (currentNode !== undefined) {
			if (this.equals(element, currentNode.element)) {
				// We return the first matching node element.
				return index;
			}
			index += 1;
			currentNode = currentNode.next;
		}
		return -1;
	}

	getHead() {
		return this.head;
	}

	size() {
		return this.count;
	}

	isEmpty() {
		return this.size() === 0;
	}

	clear() {
		this.head = undefined;
		this.count = 0;
	}

	toString() {
		// When the list is empty
		if (this.head === null) return '';
		let currentNode = this.head;
		let objString = this.stringify(currentNode.element);
		for (let index = 0; currentNode.next !== undefined; index++) {
			currentNode = currentNode.next;
			objString += `,${this.stringify(currentNode.element)}`;
		}
		return objString;
	}
}

export default LinkedList;
