import { defaultToString, KeyValue } from './utils/map';

export default class Dictionary {
	constructor(toStringFn = defaultToString) {
		this.table = {};
		this.toStringFn = toStringFn;
	}

	hasKey(key) {
		return Object.prototype.hasOwnProperty.call(
			this.table,
			this.toStringFn(key)
		);
	}

	set(key, value) {
		if (key !== null) {
			this.table[this.toStringFn(key)] = new KeyValue(key, value);
			return true;
		}
		return false;
	}

	keyValues() {
		return Object.values(this.table);
	}

	keys() {
		return this.keyValues().map((keyValuePair) => keyValuePair.getKey());
	}

	values() {
		return this.keyValues().map((keyValuePair) => keyValuePair.getValue());
	}

	remove(key) {
		if (this.hasKey(key)) {
			delete this.table[this.toStringFn(key)];
			return true;
		}
		return false;
	}

	forEach(callback) {
		const keyValues = this.keyValues();
		for (let index = 0; index < keyValues.length; index++) {
			const ret = callback(
				keyValues[index].getKey(),
				keyValues[index].getValue()
			);
			//  Break the iteration if the callback returns false
			if (ret === false) break;
		}
	}

	size() {
		return Object.keys(this.table).length;
	}

	isEmpty() {
		return this.size() === 0;
	}

	clear() {
		this.table = {};
	}

	toString() {
		if (this.isEmpty()) return '';
		const keyValues = this.keyValues();
		let stringifiedDict = keyValues[0].toString();
		for (let index = 1; index < keyValues.length; index++) {
			stringifiedDict += `,${keyValues[index].toString()}`;
		}
		return stringifiedDict;
	}
}
