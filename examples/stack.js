import { Stack } from '../src/index.js';

const DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// node -e "import('./stack.js').then(module => { console.log( module.decimalToBaseConverter(123) ) })"
const decimalToBaseConverter = (decimal, base = 2) => {
	if(!Number.isInteger(decimal)) {
		throw new Error('Please enter a decimal number.')
	}

	if(base < 2 && base > 36) {
		throw new Error('Please enter a base number between 2 and 36.')
	}

	const converter = new Stack();
	let decimalToTransform = decimal;

	while(decimalToTransform !== 0) {
		// We use alphabets to denote digits above 9
		converter.push(DIGITS[decimalToTransform % base]);
		decimalToTransform = Math.floor(decimalToTransform/base);
	}

	let transformedNumber = '';
	while(!converter.isEmpty()) {
		transformedNumber += converter.pop();
	}

	return transformedNumber;
}

export { decimalToBaseConverter };