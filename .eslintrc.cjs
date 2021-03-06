module.exports = {
	extends: ['eslint:recommended', 'airbnb', 'prettier'],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			impliedStrict: true
		}
	},
	settings: {
		react: {
			version: "999.999.999"
		}
	},
	rules: {
		// Prefer single quotes for strings
		quotes: ['error', 'single', { avoidEscape: true }],

		// Unused variables are errors. If intentionally unused, start the
		// variable name with _ or unused- or ignored
		'no-unused-vars': [
			'error',
			{
				varsIgnorePattern: '^(_|unused-|[iI]gnored)',
				argsIgnorePattern: '^(_|unused-|[iI]gnored)'
			}
		],

		// This is okay with us stylistically, so disable it
		'no-else-return': ['off'],

		'no-tabs': ['off'],
		'arrow-body-style': ['off'],

		'comma-dangle': ['off'],

		// Use AirBNB's config except change the limit from 100 to 150 characters. That's
		// roughly what will show on our laptop screen in a Sublime Text window.
		'max-len': [
			'error',
			150,
			2,
			{
				ignoreUrls: true,
				ignoreComments: false
			}
		],

		// We use underscore to turn off the unused var linter
		// errors. So, disable it.
		'no-underscore-dangle': ['off'],

		'global-require': ['off'],

		// This is a preference. You may intend to add more exports later.
		'import/prefer-default-export': ['off'],

		// If it imports, it imports.
		'import/extensions': ['off'],

		// Keep it an error, but allow ++ and -- in for loops. We can probably
		// disable this rule entirely if people don't like it.
		'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],

		// Prevent logs but allow info, error and warning.
		'no-console': [2, { allow: ['info', 'warn', 'error'] }],
		'max-classes-per-file': ['off'],

		// Allow for of loop
		'no-restricted-syntax': ["error", "ForInStatement", "LabeledStatement", "WithStatement"],

		// Need to assign to params for recursive method in tree
		'no-param-reassign': ['off']
	},
	env: {
		browser: true,
		commonjs: true,
		node: true,
		es6: true,
		jest: true
	},
	globals: {
		describe: false,
		expect: false,
		it: false,
		mount: false,
		render: false,
		shallow: false
	}
};
