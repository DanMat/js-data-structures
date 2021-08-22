import { ArrayWrapper, defaultCompare } from './utils';

const selectionSort = (array, compareFn = defaultCompare) => {
	const arrayWrapper = new ArrayWrapper(array, compareFn);
	const length = arrayWrapper.length();
	let minElementIndex;

	for (let iteration = 0; iteration < length; iteration++) {
		// The current elem is assumed to be the min
		minElementIndex = iteration;
		// Start comparing with all other elements after the current elem
		for (let comparer = iteration; comparer < length; comparer++) {
			if (arrayWrapper.isGreaterThan(minElementIndex, comparer)) {
				// Find the min element in each pass and update
				// the min element index we maintain
				minElementIndex = comparer;
			}
		}
		// After each iteration start swapping
		if (iteration !== minElementIndex) {
			arrayWrapper.swap(iteration, minElementIndex);
		}
	}

	return arrayWrapper.getArray();
};

export default selectionSort;
