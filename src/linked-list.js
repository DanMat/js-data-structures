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

	push(element) {
		const node = new Node(element);
		if (this.head === null) {
			// This handles the first push
			this.head = node;
		} else {
			let current = this.head;
			// Iterate to the last item
			while (current.next !== null) {
				current = current.next;
			}
			// Assign the new node to the end
			current.next = node;
		}
	}
}

export default LinkedList;
