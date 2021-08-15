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
}
