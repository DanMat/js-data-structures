import { ArrayWrapper, defaultCompare } from './utils';

const bubbleSort = (array, compareFn = defaultCompare) => {
	const arrayWrapper = new ArrayWrapper(array, compareFn);
	const length = arrayWrapper.length();
	for (let iteration = 0; iteration < length; iteration++) {
		// We compare with the next element hence the -1
		// We negate the iteration number since that number has been sorted.
		for (let window = 0; window < length - 1 - iteration; window++) {
			if (arrayWrapper.isGreaterThan(window, window + 1)) {
				arrayWrapper.swap(window, window + 1);
			}
		}
	}
	return arrayWrapper.getArray();
};

export default bubbleSort;
