import { LinkedList } from './index';
import { defaultEquals, defaultStringify } from './utils/linked-list';

class DoublyLinkedList extends LinkedList {
	constructor(equals = defaultEquals, stringifyNode = defaultStringify) {
		super(equals, stringifyNode);
		this.tail = null;
	}
}

export default DoublyLinkedList;
