import { LinkedList } from './index';
import {
	defaultEquals,
	defaultStringify,
	DoublyNode,
	isInsertToNewListOrInsertAtLast,
	isValidIndex,
} from './utils/linked-list';

class DoublyLinkedList extends LinkedList {
	constructor(equals = defaultEquals, stringifyNode = defaultStringify) {
		super(equals, stringifyNode);
		this.tail = undefined;
	}

	push(element) {
		const newNode = new DoublyNode(element);

		if (this.head === undefined) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			// Attach the new element to the tail
			// And, point the previous pointer
			// of the new element to the tail.
			this.tail.next = newNode;
			newNode.prev = this.tail;
			// Update the tail to the new element
			this.tail = newNode;
		}
		this.count += 1;
	}

	insertAtIndex(index, element) {
		// Handle invalid indexes
		if (!isValidIndex(index, this.size())) return false;

		// Handle empty list and last element insert
		if (isInsertToNewListOrInsertAtLast(index, this.size())) {
			return this.push(element);
		}

		const newNode = new DoublyNode(element);
		let currentNode = this.head;

		if (index === 0) {
			// Point the new node's next to the current head
			// and the current head's previous to the new node.
			newNode.next = this.head;
			currentNode.prev = newNode;
			// Update the head to the new node.
			this.head = newNode;
		} else {
			// Get the previous and the node at index
			const previousNode = this.nodeAtIndex(index - 1);
			currentNode = previousNode.next;

			// Insert the new node inbetween them
			// By updating the new node's pointer
			// To the current and previous nodes
			newNode.next = currentNode;
			newNode.prev = previousNode;

			// Next update the current and previous node's pointers
			// to the new node we are inserting.
			previousNode.next = newNode;
			currentNode.prev = newNode;
		}

		this.count += 1;
		return true;
	}

	getTail() {
		return this.tail;
	}

	clear() {
		super.clear();
		this.tail = undefined;
	}
}

export default DoublyLinkedList;
