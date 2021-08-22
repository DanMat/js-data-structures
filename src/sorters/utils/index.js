export const Compare = {
	LESS_THAN: -1,
	BIGGER_THAN: 1,
	EQUALS: 0,
};

export const defaultCompare = (a, b) => {
	if (a === b) {
		return Compare.EQUALS;
	}
	return a > b ? Compare.BIGGER_THAN : Compare.LESS_THAN;
};

class ArrayWrapper {
	constructor(array = [], compareFn = defaultCompare) {
		this.array = array;
		this.compareFn = compareFn;
	}

	getArray() {
		return this.array;
	}

	length() {
		return this.array.length;
	}

	swap(i, j) {
		[this.array[i], this.array[j]] = [this.array[j], this.array[i]];
	}

	compare(i, j) {
		return this.compareFn(this.array[i], this.array[j]);
	}

	isLessThan(i, j) {
		return this.compare(i, j) === Compare.LESS_THAN;
	}

	isGreaterThan(i, j) {
		return this.compare(i, j) === Compare.BIGGER_THAN;
	}

	isEqualTo(i, j) {
		return this.compare(i, j) === Compare.EQUALS;
	}
}

export { ArrayWrapper };
