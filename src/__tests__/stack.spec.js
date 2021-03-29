import { Stack } from '../index.js';

describe('Testing the Stack Data Type', () => {
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const length = numbers.length;
	let stack;

	beforeEach(() => {
		stack = new Stack();
	});

	test('It should be able to push items', () => {
		numbers.forEach((number) => stack.push(number));
		const stackToArray = stack
			.toString()
			.split(',')
			.map((strInt) => parseInt(strInt));

		expect(stack.size()).toBe(length);
		expect(stackToArray).toEqual(numbers);
	});
});
