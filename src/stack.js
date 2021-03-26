const stackItem = new WeakMap();

const getStackInstances = ref => ({
	itemInstance: stackItem.get(ref),
	lengthInstance: stackItem.get(ref).length
});

const setStackInstances = ref =>
	stackItem.set(ref, {
		length: 0
	});

class Stack {
	constructor() {
		setStackInstances(this);
	}

	push(elem) {
		const { itemInstance, lengthInstance } = getStackInstances(this);
		itemInstance[lengthInstance] = elem;
		lengthInstance++;
	}

	pop() {
		if(this.isEmpty()) {
			return undefined;
		}
		const { itemInstance, lengthInstance } = getStackInstances(this);
		const itemValue = itemInstance[lengthInstance];
		delete itemInstance[lengthInstance];
		lengthInstance--;
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