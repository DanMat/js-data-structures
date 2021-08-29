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

const _getLeftChildIndex = (index) => {
	return 2 * index + 1;
};

const _getRightChildIndex = (index) => {
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

	insert(value) {
		if (value !== null) {
			// The new element is pushed at the end
			this.heap.push(value);
			// This will swap the value with the parent
			// Till the parent is smaller than the
			// value being inserted
			this.bubbleUp(this.heap.length - 1);
			return true;
		}
		return false;
	}

	bubbleUp(index) {
		let parent = getParentIndex(index);
		while (
			index > 0 &&
			this.compareFn({
				currentNode: this.heap[index],
				key: this.heap[parent],
			}) === Compare.BIGGER_THAN
		) {
			// The parent of the current index
			// is bigger than the index.
			// So, swap them.
			swap(this.heap, parent, index);

			// Repeat this all the way
			// up to the root index
			index = parent;
			parent = getParentIndex(index);
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
