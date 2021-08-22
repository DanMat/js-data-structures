export const defaultToString = (element) => {
	if (element === null) return 'NULL';
	else if (element === undefined) return 'UNDEFINED';
	else if (typeof element === 'string' || element instanceof String)
		return element;
	else return element.toString();
};

class KeyValue {
	constructor(key, value) {
		this.key = key;
		this.value = value;
	}

	getKey() {
		return this.key;
	}

	getValue() {
		return this.value;
	}

	toString() {
		return `[#${this.key}: ${this.value}]`;
	}
}

export { KeyValue };
