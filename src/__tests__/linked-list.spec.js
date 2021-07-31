import { LinkedList } from '../index.js';

describe('Testing the LinkedList Data Type', () => {
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const { length } = numbers;
	let linkedList;

	const setupLinkedList = () => {
		const linkedListInstance = new LinkedList();
		numbers.forEach((number) => linkedListInstance.push(number));
		return linkedListInstance;
	};

	beforeEach(() => {
		linkedList = setupLinkedList();
	});

	test('It should be able to push items', () => {
		const linkedListToArray = linkedList
			.toString()
			.split(',')
			.map((strInt) => parseInt(strInt, 10));

		expect(linkedList.size()).toBe(length);
		expect(linkedListToArray).toEqual(numbers);
	});

	test('It should be able to insert by index', () => {
		// Reset the linkedList instance
		linkedList = new LinkedList();
		for (let index = 0; index < numbers.length; index++) {
			const element = numbers[index];
			linkedList.insertAtIndex(index, element);
			// Make sure the index matches
			expect(linkedList.indexOf(element)).toBe(index);
			// Make sure that the element at index matches
			expect(linkedList.nodeAtIndex(index).element).toBe(element);
			// Make sure the size matches
			expect(linkedList.size()).toBe(index + 1);
		}

		// Test index of element not in list
		expect(linkedList.indexOf(100)).toBe(-1);
	});

	test('It should be able to delete by index', () => {
		for (let index = 0; index < numbers.length; index++) {
			// Reset linkedList for each test
			linkedList = setupLinkedList();
			const removedElement = linkedList.removeAtIndex(index);

			expect(removedElement).toBe(numbers[index]);
		}

		// Remove out of bound index
		expect(linkedList.removeAtIndex(100)).toBe(null);
	});

	test('It should be able to delete by element', () => {
		for (let index = 0; index < numbers.length; index++) {
			const element = numbers[index];
			const removedElement = linkedList.remove(element);

			expect(removedElement).toBe(element);
		}

		// Remove out of bound index
		expect(linkedList.removeAtIndex(100)).toBe(null);
		expect(linkedList.isEmpty()).toBe(true);
	});
});
