import { Stack } from '../index.js';

describe('Testing the Stack Data Type', () => {
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const length = numbers.length;

	test('It should be able to push items', () => {
		const stack = new Stack();

		numbers.forEach((number) => stack.push(number));

		expect(stack.size()).toBe(length);
	});
});
