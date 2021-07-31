import { Stack } from '../index.js';

describe('Testing the Stack Data Type', () => {
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const { length } = numbers;
	let stack;

	beforeEach(() => {
		stack = new Stack();
		numbers.forEach((number) => stack.push(number));
	});

	test('It should be able to push items', () => {
		const stackToArray = stack
			.toString()
			.split(',')
			.map((strInt) => parseInt(strInt, 10));

		expect(stack.size()).toBe(length);
		expect(stackToArray).toEqual(numbers);
	});

	test('It should pop the last pushed item', () => {
		for (let index = 0; index < length; index++) {
			expect(stack.pop()).toBe(numbers[length - index - 1]);
			expect(stack.size()).toBe(length - index - 1);
		}
		// Popping an empty stack should return undefined
		expect(stack.pop()).toBe(undefined);
	});

	test('It should be able to peak the last pushed item without popping', () => {
		expect(stack.peek()).toBe(numbers[length - 1]);
		expect(stack.size()).toBe(length);
	});

	test('It should be able to clear all the elements', () => {
		stack.clear();
		expect(stack.size()).toBe(0);
		expect(stack.isEmpty()).toBe(true);
	});

	test('It should be able to join the items in the stack using a seperator', () => {
		const seperator = '-';
		const numberArrayToString = numbers.join(seperator);

		expect(stack.join(seperator)).toBe(numberArrayToString);

		// Join on empy stack should return empty string
		stack.clear();
		expect(stack.join(seperator)).toBe('');
	});
});
