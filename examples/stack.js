const { Stack } = require('../src');

const DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const decimalToBaseConverter = (decimal, base = 2) => {
	if(!Number.isInteger(decimal)) {
		throw new Error('Please enter a decimal number.')
	}

	if(base >= 2 && base <= 36) {
		throw new Error('Please enter a base number between 2 and 36.')
	}

	const converter = new Stack();
	let decimalToTransform = decimal;

	while(decimalToTransform !== 0) {
		converter.push(DIGITS[decimalToTransform % base]);
		decimalToTransform /= base;
	}

	return converter.join('');
}

module.exports = {
	decimalToBaseConverter
};