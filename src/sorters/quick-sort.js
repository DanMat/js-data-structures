import { Compare, defaultCompare } from './utils';

const partition = (list, left, right, compareFn) => {
	const pivot = list[Math.floor((left + right) / 2)];
	let indexOfLeftHalf = left;
	let indexOfRightHalf = right;

	while (indexOfLeftHalf <= indexOfRightHalf) {
		while (compareFn(list[indexOfLeftHalf], pivot) === Compare.LESS_THAN) {
			indexOfLeftHalf += 1;
		}
		while (compareFn(list[indexOfRightHalf], pivot) === Compare.BIGGER_THAN) {
			indexOfRightHalf -= 1;
		}
		if (indexOfLeftHalf <= indexOfRightHalf) {
			[list[indexOfLeftHalf], list[indexOfRightHalf]] = [
				list[indexOfRightHalf],
				list[indexOfLeftHalf],
			];
			indexOfLeftHalf += 1;
			indexOfRightHalf -= 1;
		}
	}
	return indexOfLeftHalf;
};

const quick = (list, left, right, compareFn) => {
	// Condition to break the recursion
	// And, start merging the arrays
	if (list.length > 1) {
		const index = partition(list, left, right, compareFn);
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
