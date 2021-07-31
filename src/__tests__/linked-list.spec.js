import { LinkedList } from '../index.js';

describe('Testing the LinkedList Data Type', () => {
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const { length } = numbers;
	let linkedList;

	beforeEach(() => {
		linkedList = new LinkedList();
		numbers.forEach((number) => linkedList.push(number));
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
		for (let index = 0; index < numbers.length; index++) {
			const element = numbers[index];
			linkedList.insertAtIndex(index, element);
			// Make sure the index matches
			expect(linkedList.indexOf(element)).toBe(index);
			// Make sure that the element at index matches
			expect(linkedList.nodeAtIndex(index).element).toBe(element);
		}
	});
});
