export default class Set {
	constructor() {
		// We use an object to save our set
		// to make lookups efficient.
		this.items = {};
	}

	has(element) {
		return Object.prototype.hasOwnProperty.call(this.items, element);
	}

	add(element) {
		if (!this.has(element)) {
			this.items[element] = element;
			return true;
		}
		return false;
	}

	delete(element) {
		if (this.has(element)) {
			delete this.items[element];
			return true;
		}
		return false;
	}

	values() {
		return Object.values(this.items);
	}

	size() {
		return Object.keys(this.items).length;
	}

	isEmpty() {
		return this.size() === 0;
	}

	clear() {
		this.items = {};
	}

	toString() {
		if (this.isEmpty()) return '';
		return this.values().reduce((acc, elem) => {
			const delimiter = acc.length ? ',' : '';
			return `${acc}${delimiter}${elem}`;
		}, '');
	}

	// Addition of all elements in both the sets
	union(otherSet) {
		const unionSet = new Set();
		this.values().forEach((element) => unionSet.add(element));
		otherSet.values().forEach((element) => unionSet.add(element));
		return unionSet;
	}

	// Collection of all elements which are not common to both the sets
	disjunctiveUnion(otherSet) {
		const disjunctiveSet = new Set();
		this.values().forEach((element) => {
			if (!otherSet.has(element)) {
				disjunctiveSet.add(element);
			}
		});
		otherSet.values().forEach((element) => {
			if (!this.has(element)) {
				disjunctiveSet.add(element);
			}
		});
		return disjunctiveSet;
	}

	// Collection of all elements which are common to both the sets
	intersection(otherSet) {
		const intersectionSet = new Set();
		// Iterate the smaller set for better performance.
		const smallerSet = this.size() > otherSet.size() ? otherSet : this;
		smallerSet.values().forEach((element) => {
			if (otherSet.has(element)) {
				intersectionSet.add(element);
			}
		});
		return intersectionSet;
	}

	// Negate the elements in the other set from the current set
	difference(otherSet) {
		const differenceSet = new Set();
		this.values().forEach((element) => {
			if (!otherSet.has(element)) {
				differenceSet.add(element);
			}
		});
		return differenceSet;
	}

	// Check if the other set contains the current set
	isSubsetOf(otherSet) {
		// The subset instance needs to be
		// smaller than the compared instance.
		if (this.size() > otherSet.size()) return false;
		return this.values().every((element) => otherSet.has(element));
	}
}
