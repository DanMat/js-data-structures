const getMaxValue = (list) => {
	let max = list[0];
	for (const item of list) {
		if (item > max) {
			max = item;
		}
	}
	return max;
};

// Meant only for positive whole numbers
const countingSort = (list = []) => {
	if (list.length < 2) return list;
	const maxValue = getMaxValue(list);

	// Form a new array with the
	// highest number in the list
	const counts = new Array(maxValue + 1);
	for (const item of list) {
		// hash the array elements and their count
		// In the new counts array.
		// This way, when we traverse the indexes of the counts
		// array we would have a sorted base array
		if (!counts[item]) {
			counts[item] = 0;
		}
		counts[item] += 1;
	}

	const sortedList = [];
	for (const [sortedNumberString, count] of Object.entries(counts)) {
		// The index is the sorted list of numbers
		const sortedNumber = parseInt(sortedNumberString, 10);
		// The count denotes dups in the list
		sortedList.push(...new Array(count).fill(sortedNumber));
	}
	return sortedList;
};

export default countingSort;
