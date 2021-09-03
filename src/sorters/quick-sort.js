import { Compare, defaultCompare } from './utils';

// Using Hoare's partition scheme
const partition = (list, left, right, compareFn) => {
	// We select the middle element as the pivot
	const pivot = list[Math.floor((left + right) / 2)];
	let indexOfLeftHalf = left;
	let indexOfRightHalf = right;

	// Keep moving the left and right pointers till they intersect
	while (indexOfLeftHalf <= indexOfRightHalf) {
		// Keep moving the left pointer till a number
		// larger than the pivot is encountered
		while (compareFn(list[indexOfLeftHalf], pivot) === Compare.LESS_THAN) {
			indexOfLeftHalf += 1;
		}
		// Keep moving the right pointer till a number
		// smaller than the pivot is encountered
		while (compareFn(list[indexOfRightHalf], pivot) === Compare.BIGGER_THAN) {
			indexOfRightHalf -= 1;
		}
		// Make sure the pointers haven't crossed each other
		// before swapping the elements
		if (indexOfLeftHalf <= indexOfRightHalf) {
			[list[indexOfLeftHalf], list[indexOfRightHalf]] = [
				list[indexOfRightHalf],
				list[indexOfLeftHalf],
			];
			// Move the pointers after the swap
			indexOfLeftHalf += 1;
			indexOfRightHalf -= 1;
		}
	}
	// This would be the position of the
	// pivot in the final sorted list
	return indexOfLeftHalf;
};

const quick = (list, left, right, compareFn) => {
	// Condition to break the recursion
	if (list.length > 1) {
		const index = partition(list, left, right, compareFn);
		// Check if there is a smaller segment of the array
		// that the partition function has not sorted
		if (left < index - 1) {
			quick(list, left, index - 1, compareFn);
		}
		if (index < right) {
			quick(list, index, right, compareFn);
		}
	}
	return list;
};

const quickSort = (list = [], compareFn = defaultCompare) => {
	return quick(list, 0, list.length - 1, compareFn);
};

export default quickSort;
