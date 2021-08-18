import { defaultToString, KeyValue } from './utils/map';
import HashTable from './hash-table';
import LinkedList from './linked-list';

export default class HashTableLinkedChaining extends HashTable {
	constructor(toStrFn = defaultToString) {
		super(toStrFn);
	}

	put(key, value) {
		if (key !== null) {
			const index = this.hashCode(key);
			if (!Object.prototype.hasOwnProperty.call(this.table, index)) {
				this.table[index] = new LinkedList();
			}
			this.table[index].push(new KeyValue(key, value));
			return true;
		}
		return false;
	}

	get(key) {
		const index = this.hashCode(key);
		const linklist = this.table[index];
		if (linklist !== null && !linklist.isEmpty()) {
			let current = linklist.getHead();
			while (current !== null) {
				if (current.element.getKey() === key) {
					return current.element.getValue();
				}
				current = current.next;
			}
		}
		return undefined;
	}

	remove(key) {
		const index = this.hashCode(key);
		const linklist = this.table[index];
		if (linklist !== null && !linklist.isEmpty()) {
			let current = linklist.getHead();
			while (current !== null) {
				if (current.element.getKey() === key) {
					linklist.remove(current.element);
					if (linklist.isEmpty()) {
						delete this.table[index];
					}
					return true;
				}
				current = current.next;
			}
		}
		return false;
	}

	size() {
		let count = 0;
		for (const linklist of Object.values(this.table)) {
			count += linklist.size();
		}
		return count;
	}
}
