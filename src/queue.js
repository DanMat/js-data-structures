// JS classes still don't officially support private properties.
// So, using a weak map to store the queue items so that they are
// inaccessible to the end users using our queue implementation.
// Also, WeakMap has garbage collection.
const queueItem = new WeakMap();

// Getter for the queue items
const getQueueInstances = (ref) => {
	const { _length, _top, ...items } = queueItem.get(ref);
	return {
		itemInstance: items,
		lengthInstance: _length,
		topInstance: _top,
	};
};

// Setter for the queue items
const setQueueInstances = (ref, items = {}, _length = 0, _top = 0) =>
	queueItem.set(ref, {
		...items,
		_length,
		_top,
	});

class Queue {
	constructor() {
		setQueueInstances(this);
	}

	enqueue(elem) {
		const queueInstances = getQueueInstances(this);
		const { itemInstance, topInstance } = queueInstances;
		let { lengthInstance } = queueInstances;

		// Enqueue the new element to the
		// queue object which we maintain.
		// And, bumping up the queue's length.
		itemInstance[lengthInstance] = elem;
		lengthInstance += 1;
		setQueueInstances(this, itemInstance, lengthInstance, topInstance);
	}

	dequeue() {
		// Make sure that the queue is not empty first
		if (this.isEmpty()) {
			return undefined;
		}
		const queueInstances = getQueueInstances(this);
		const { itemInstance, lengthInstance } = queueInstances;
		let { topInstance } = queueInstances;

		// Retrive the first item from the top of our queue object to return
		// And, delete the same from our queue obj
		const itemValue = itemInstance[topInstance];
		delete itemInstance[topInstance];
		topInstance += 1;
		setQueueInstances(this, itemInstance, lengthInstance, topInstance);
		return itemValue;
	}

	peek() {
		const { itemInstance, topInstance } = getQueueInstances(this);
		return itemInstance[topInstance];
	}

	clear() {
		setQueueInstances(this);
	}

	size() {
		const { topInstance, lengthInstance } = getQueueInstances(this);
		return lengthInstance - topInstance;
	}

	isEmpty() {
		return this.size() === 0;
	}

	toString() {
		return this.join();
	}

	join(separator = ',') {
		// Make sure that the queue is not empty first
		if (this.isEmpty()) {
			return '';
		}
		const { itemInstance, lengthInstance, topInstance } = getQueueInstances(
			this
		);
		let stringifyQueue = itemInstance[topInstance];

		for (let index = topInstance + 1; index < lengthInstance; index++) {
			stringifyQueue += separator + itemInstance[index];
		}
		return stringifyQueue;
	}
}

export default Queue;
