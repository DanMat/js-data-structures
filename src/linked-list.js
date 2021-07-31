class Node {
	constructor(element) {
		this.element = element;
		this.next = null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.count = 0;
	}

	isIndexOutOfBound(index) {
		// Make sure that the index is less
		// than the node count we maintain.
		return !(index >= 0 && index < this.count);
	}

	nodeAtIndex(index) {
		if (this.isIndexOutOfBound(index)) return null;
		let node = this.head;
		// Loop to index to get the node
		for (let i = 0; i < index; i += 1) {
			node = node.next;
		}
		return node;
	}

	push(element) {
		const node = new Node(element);
		if (this.head === null) {
			// This handles the first push
			this.head = node;
		} else {
			let currentNode = this.head;
			// Iterate to the last item
			while (currentNode.next !== null) {
				currentNode = currentNode.next;
			}
			// Assign the new node to the end
			currentNode.next = node;
		}
		this.count += 1;
	}

	removeAtIndex(index) {
		if (this.isIndexOutOfBound(index)) return null;
		let currentNode = this.head;
		if (index === 0) {
			// Handle first node
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
}

export default LinkedList;
