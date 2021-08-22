import { Queue } from '../index.js';

describe('Testing the Queue Data Type', () => {
	const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const { length } = numbers;
	let queue;

	beforeEach(() => {
		queue = new Queue();
		numbers.forEach((number) => queue.enqueue(number));
	});

	test('It should be able to enqueue items', () => {
		const queueToArray = queue
			.toString()
			.split(',')
			.map((strInt) => parseInt(strInt, 10));

		expect(queue.size()).toBe(length);
		expect(queueToArray).toEqual(numbers);
	});

	test('It should dequeue the first pushed item', () => {
		for (let index = 0; index < length; index++) {
			expect(queue.dequeue()).toBe(numbers[index]);
			expect(queue.size()).toBe(length - index - 1);
		}
		// Dequeuing an empty queue should return undefined
		expect(queue.dequeue()).toBe(undefined);
	});

	test('It should be able to peak the first pushed item without Dequeuing', () => {
		expect(queue.peek()).toBe(numbers[0]);
		expect(queue.size()).toBe(length);
	});

	test('It should be able to clear all the elements', () => {
		queue.clear();
		expect(queue.size()).toBe(0);
		expect(queue.isEmpty()).toBe(true);
	});

	test('It should be able to join the items in the queue using a seperator', () => {
		const seperator = '-';
		const numberArrayToString = numbers.join(seperator);

		expect(queue.join(seperator)).toBe(numberArrayToString);

		// Join on empy queue should return empty string
		queue.clear();
		expect(queue.join(seperator)).toBe('');
	});
});
