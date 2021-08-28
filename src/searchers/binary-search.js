import { Compare, defaultCompare } from './utils';
import { quickSort } from '../sorters';

const NOT_FOUND = -1;

const searchRecursively = (list, low, high, val, compareFn) => {
	if (low <= high) {
		const mid = Math.floor((high + low) / 2);
		const elem = list[mid];

		if (compareFn(elem, val) === Compare.LESS_THAN) {
			return searchRecursively(list, mid + 1, high, val, compareFn);
		} else if (compareFn(elem, val) === Compare.BIGGER_THAN) {
			return searchRecursively(list, low, mid - 1, val, compareFn);
		} else {
			return mid;
		}
	}
	return NOT_FOUND;
};

const binarySearch = (list, val, compareFn = defaultCompare) => {
	const sortedList = quickSort(list);
	return searchRecursively(sortedList, 0, sortedList.length, val, compareFn);
};

export default binarySearch;
