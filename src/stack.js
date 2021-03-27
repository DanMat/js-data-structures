// JS classes still don't officially support private properties.
// So, Using a weak map to store the stack items so that they are 
// inaccessible to the end user.
const stackItem = new WeakMap();

// Getter for the stack items
const getStackInstances = ref => {
	const { _length, ...items } = stackItem.get(ref);
	return {
		itemInstance: items,
		lengthInstance: _length
	}
};

// Setter for the stack items
const setStackInstances = (ref, items = {}, _length = 0) =>
	stackItem.set(ref, {
		...items,
		_length
	});

class Stack {
	constructor() {
		setStackInstances(this);
	}

	push(elem) {
		let { itemInstance, lengthInstance } = getStackInstances(this);
		itemInstance[lengthInstance] = elem;
		lengthInstance+=1;
		setStackInstances(this, itemInstance, lengthInstance);
	}

	pop() {
		if(this.isEmpty()) {
			return undefined;
		}
		let { itemInstance, lengthInstance } = getStackInstances(this);
		lengthInstance-=1;
		const itemValue = itemInstance[lengthInstance];
		delete itemInstance[lengthInstance];
		setStackInstances(this, itemInstance, lengthInstance);
		return itemValue;
	}

	peek() {
		const { itemInstance, lengthInstance } = getStackInstances(this);
		return itemInstance[lengthInstance];
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
}

export default Stack;