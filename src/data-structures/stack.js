// JS classes still don't officially support private properties.
// So, using a weak map to store the stack items so that they are
// inaccessible to the end users using our stack implementation.
// Also, WeakMap has garbage collection.
const stackItem = new WeakMap();

// Getter for the stack items
const getStackInstances = (ref) => {
	const { _length, ...items } = stackItem.get(ref);
	return {
		itemInstance: items,
		lengthInstance: _length,
	};
};

// Setter for the stack items
const setStackInstances = (ref, items = {}, _length = 0) =>
	stackItem.set(ref, {
		...items,
		_length,
	});

class Stack {
	constructor() {
		setStackInstances(this);
	}

	push(elem) {
		const stackInstances = getStackInstances(this);
		const { itemInstance } = stackInstances;
		let { lengthInstance } = stackInstances;

		// Pushing the new element to the
		// stack object which we maintain.
		// And, bumping up the stack's length.
		itemInstance[lengthInstance] = elem;
		lengthInstance += 1;
		setStackInstances(this, itemInstance, lengthInstance);
	}

	pop() {
		// Make sure that the stack is not empty first
		if (this.isEmpty()) {
			return undefined;
		}
		const stackInstances = getStackInstances(this);
		const { itemInstance } = stackInstances;
		let { lengthInstance } = stackInstances;

		// Retrive the last item from our stack object to return
		// And, delete the same from our stack obj
		lengthInstance -= 1;
		const itemValue = itemInstance[lengthInstance];
		delete itemInstance[lengthInstance];
		setStackInstances(this, itemInstance, lengthInstance);
		return itemValue;
	}

	peek() {
		const { itemInstance, lengthInstance } = getStackInstances(this);
		return itemInstance[lengthInstance - 1];
	}

	clear() {
		setStackInstances(this);
	}

	size() {
		return getStackInstances(this).lengthInstance;
	}

	isEmpty() {
		return getStackInstances(this).lengthInstance === 0;
	}

	toString() {
		return this.join();
	}

	join(separator = ',') {
		// Make sure that the stack is not empty first
		if (this.isEmpty()) {
			return '';
		}
		const { itemInstance, lengthInstance } = getStackInstances(this);
		let stringifyStack = itemInstance[0];

		for (let index = 1; index < lengthInstance; index++) {
			stringifyStack += separator + itemInstance[index];
		}
		return stringifyStack;
	}
}

export default Stack;
