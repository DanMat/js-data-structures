import { Compare, defaultCompare, swap } from './utils/tree';

/**
 * Binary tree rep
 *
 *          1
 *        /   \
 *       2     3
 *     /  \   /  \
 *    4    5 6    7
 *
 * Array rep
 *
 * | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
 *   0   1   2   3   4   5   6
 *
 */

const getLeftChildIndex = (index) => {
	return 2 * index + 1;
};

const getRightChildIndex = (index) => {
	return 2 * index + 2;
};

const getParentIndex = (index) => {
	if (index === 0) return undefined;
	return Math.floor((index - 1) / 2);
};

class MinHeap {
	constructor(compareFn = defaultCompare) {
		this.compareFn = compareFn;
		this.heap = [];
	}

	getLeftChild(index) {
		return this.heap[getLeftChildIndex(index)];
	}

	getRightChild(index) {
		return this.heap[getRightChildIndex(index)];
	}

	getParent(index) {
		return this.heap[getParentIndex(index)];
	}

	insert(value) {
		if (value !== null) {
			// The new element is pushed at the end
			this.heap.push(value);
			// This will swap the value with the parent
			// Till the parent is smaller than the
			// value being inserted
			this.bubbleUp();
			return true;
		}
		return false;
	}

	bubbleUp() {
		let index = this.size() - 1;

		while (
			this.getParent(index) &&
			this.compareFn({
				currentNode: this.heap[index],
				key: this.getParent(index),
			}) === Compare.BIGGER_THAN
		) {
			// The parent of the current index
			// is bigger than the index.
			// So, swap them.
			swap(this.heap, index, getParentIndex(index));
			// Repeat this all the way
			// up to the root index
			index = getParentIndex(index);
		}
	}

	// Removes the min value
	extract() {
		if (this.isEmpty()) return undefined;

		const firstValue = this.heap[0];
		// Override the first element with the last element
		this.heap[0] = this.heap[this.heap.length - 1];
		// Dedup last elem
		this.heap.pop();

		// Start bubbling this new value down
		this.bubbleDown(0);
		return firstValue;
	}

	bubbleDown(index) {
		let key = index;
		const leftIndex = getLeftChildIndex(index);
		const rightIndex = getRightChildIndex(index);
		const size = this.size();

		// Update the key if the element
		// is smaller than it's left child.
		if (
			leftIndex < size &&
			this.compareFn({
				currentNode: this.getLeftChild(index),
				key: this.heap[key],
			}) === Compare.BIGGER_THAN
		) {
			key = leftIndex;
		}

		// Update the key if the element
		// is smaller than it's right child.
		if (
			rightIndex < size &&
			this.compareFn({
				currentNode: this.getRightChild(index),
				key: this.heap[key],
			}) === Compare.BIGGER_THAN
		) {
			key = rightIndex;
		}

		// If a smaller value is detcted
		// than the current index. Then swap
		if (index !== key) {
			swap(this.heap, index, key);
			// Keep travelling down the path
			this.bubbleDown(key);
		}
	}

	size() {
		return this.heap.length;
	}

	isEmpty() {
		return this.size() === 0;
	}

	findMin() {
		return this.isEmpty() ? undefined : this.heap[0];
	}

	getArray() {
		return this.heap;
	}
}

export default MinHeap;
