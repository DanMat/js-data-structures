import { Compare, defaultCompare } from './utils';

const merge = (leftHalf, rightHalf, compareFn) => {
	const result = [];
	let indexOfLeftHalf = 0;
	let indexOfRightHalf = 0;

	while (
		indexOfLeftHalf < leftHalf.length &&
		indexOfRightHalf < rightHalf.length
	) {
		let elementToPush;
		if (
			compareFn(leftHalf[indexOfLeftHalf], rightHalf[indexOfRightHalf]) ===
			Compare.LESS_THAN
		) {
			elementToPush = leftHalf[indexOfLeftHalf];
			indexOfLeftHalf += 1;
		} else {
			elementToPush = rightHalf[indexOfRightHalf];
			indexOfRightHalf += 1;
		}
		// Merge the left and right half elements
		// in sorted order
		result.push(elementToPush);
	}
	// Concat the element which was left in the sub array.
	return result.concat(
		indexOfLeftHalf < leftHalf.length
			? leftHalf.slice(indexOfLeftHalf)
			: rightHalf.slice(indexOfRightHalf)
	);
};

const mergeSort = (list = [], compareFn = defaultCompare) => {
	const { length } = list;
	// Condition to break the recursion
	// And, start merging the arrays
	if (length < 2) return list;

	// Keep splitting the arrays into two halfs
	// and call the merge sort method
	const mid = Math.floor(length / 2);
	const subLeft = mergeSort(list.slice(0, mid), compareFn);
	const subRight = mergeSort(list.slice(mid), compareFn);
	return merge(subLeft, subRight, compareFn);
};

export default mergeSort;
