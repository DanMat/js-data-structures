import { LinkedList } from './index';
import {
	defaultEquals,
	defaultStringify,
	DoublyNode,
	isValidIndex,
} from './utils/linked-list';

class DoublyLinkedList extends LinkedList {
	constructor(equals = defaultEquals, stringifyNode = defaultStringify) {
		super(equals, stringifyNode);
		this.tail = null;
	}

	push(element) {
		const node = new DoublyNode(element);

		if (this.head === null) {
			this.head = node;
			this.tail = node;
		} else {
			// Attach the new element to the tail
			// And, point the previous pointer
			// of the new element to the tail.
			this.tail.next = node;
			node.prev = this.tail;
			// Update the tail to the new element
			this.tail = node;
		}
		this.count += 1;
	}

	insertAtIndex(index, element) {
		// Handle invalid indexes
		if (!isValidIndex(index, this.size())) return false;

		// Handle empty list and last element insert
		if ((this.size() === 0 && index === 0) || index === this.size()) {
			return this.push(element);
		}

		const node = new DoublyNode(element);
		let current = this.head;

		if (index === 0) {
			// Point the new node's next to the current head
			// and the current head's previous to the new node.
			node.next = this.head;
			current.prev = node;
			// Update the head to the new node.
			this.head = node;
		} else {
			// Get the previous and the node at index
			const previous = this.nodeAtIndex(index - 1);
			current = previous.next;

			// Insert the new node inbetween them
			// By updating the new node's pointer
			// To the current and previous nodes
			node.next = current;
			node.prev = previous;

			// Next update the current and previous node's pointers
			// to the new node we are inserting.
			previous.next = node;
			current.prev = node;
		}

		this.count += 1;
		return true;
	}
}

export default DoublyLinkedList;
