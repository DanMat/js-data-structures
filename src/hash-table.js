import { defaultToString, KeyValue } from './utils/map';

const loseloseHashCode = (tableKey) => {
	let hash = 0;

	for (const [index] of Object.entries(tableKey)) {
		hash += tableKey.charCodeAt(index);
	}

	return hash;
};

export default class HashTable {
	constructor(toStrFn = defaultToString) {
		this.toStrFn = toStrFn;
		this.table = {};
	}

	hashCode(key) {
		if (typeof key === 'number') return key;
		return loseloseHashCode(this.toStrFn(key));
	}

	hasKey(key) {
		return Object.prototype.hasOwnProperty.call(this.table, this.hashCode(key));
	}

	put(key, value) {
		if (key !== null) {
			this.table[this.hashCode(key)] = new KeyValue(key, value);
			return true;
		}
		return false;
	}

	get(key) {
		return this.hasKey(key)
			? this.table[this.hashCode(key)].getValue()
			: undefined;
	}

	remove(key) {
		if (this.hasKey(key)) {
			delete this.table[this.hashCode(key)];
			return true;
		}
		return false;
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
		const keys = Object.keys(this.table);
		let stringifiedDict = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
		for (let index = 1; index < keys.length; index++) {
			stringifiedDict += `,{${keys[index]} => ${this.table[
				keys[index]
			].toString()}}`;
		}
		return stringifiedDict;
	}
}
