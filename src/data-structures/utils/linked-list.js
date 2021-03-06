class Node {
	constructor(element) {
		this.element = element;
		this.next = undefined;
	}
}

class DoublyNode extends Node {
	constructor(element) {
		super(element);
		this.previous = undefined;
	}
}

// The elements which are saved inside the linklist
// can be of any type.
// So, we give the ability to override the equal method
export const defaultEquals = (a, b) => a === b;
// The node stringification can be overriden as well
export const defaultStringify = (elem) => elem;

export const isIndexOutOfBound = (index, size) => !(index >= 0 && index < size);
// The new index location is within bound check
export const isValidIndex = (index, size) => !(index < 0 || index > size);
export const isInsertToNewListOrInsertAtLast = (index, size) =>
	(size === 0 && index === 0) || index === size;

export { Node, DoublyNode };
