module.exports = {
	root: true,
	env: {browser: true, es6: true},
	extends: [
		// 'eslint:recommended',
		// 'plugin:react/recommended',
		// 'plugin:react-hooks/recommended',
		// 'plugin:@typescript-eslint/recommended',
		'airbnb',
		'plugin:react/jsx-runtime',
		// 'airbnb-typescript',
		'airbnb/hooks',
		'plugin:unicorn/recommended',
		'plugin:perfectionist/recommended-natural',
		'plugin:prettier/recommended'
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	// parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['react-refresh', 'unicorn', 'perfectionist', 'prettier'],
	settings: {
		react: {
			version: 'detect'
		}
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: './tsconfig.json'
			},
			extends: [
				'plugin:@typescript-eslint/recommended',
				// 'airbnb',
				'airbnb-typescript',
				// 'plugin:react/jsx-runtime',
				// 'airbnb/hooks',
				// 'plugin:unicorn/recommended',
				'plugin:prettier/recommended'
			],
			plugins: ['@typescript-eslint'],
			rules: {
				'@typescript-eslint/no-use-before-define': ['error', {functions: false}]
			}
		}
	],
	rules: {
		'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
		'prettier/prettier': 'warn',
		'no-console': 'warn',
		'max-len': [1, {code: 160, ignoreStrings: true}],
		'consistent-return': ['warn'],
		camelcase: 'warn',
		'perfectionist/sort-imports': [
			'warn',
			{
				'newlines-between': 'never',
				'custom-groups': {
					value: {
						react: ['react', 'react-*']
					},
					type: {
						react: 'react'
					}
				},
				groups: [
					'type',
					'builtin-type',
					'external-type',
					'internal-type',
					'parent-type',
					'sibling-type',
					'index-type',
					'react',
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
					'object',
					'style',
					'side-effect',
					'side-effect-style',
					'unknown'
				]
			}
		],
		'perfectionist/sort-jsx-props': [
			'warn',
			{
				// "type": "natural",
				// "order": "asc",
				groups: ['href', 'className', 'unknown', 'value', 'callback', 'multiline', 'shorthand', 'key'],
				'custom-groups': {
					key: 'key',
					// "alt": "alt",
					// "descr": "descr",
					// "src": "src",
					// "name":["name", "title", "subtitle"],
					value: 'value',
					href: ['href', 'src'],
					className: 'className',
					callback: 'on*'
				}
			}
		],
		'perfectionist/sort-objects': [
			'warn',
			{
				// "type":"natural",
				'ignore-pattern': ['*+(B|b)reakpoint+(s|)'],
				'styled-components': false,
				groups: ['id', 'name', 'src', 'size', 'unknown'],
				'custom-groups': {
					id: 'id',
					name: ['name', 'title', 'subtitle'],
					src: ['src', 'href'],
					size: ['width', 'height']
				}
			}
		],
		'perfectionist/sort-object-types': [
			'warn',
			{
				groups: ['id', 'name', 'unknown'],
				'custom-groups': {
					id: 'id',
					name: 'name'
				}
			}
		],
		'perfectionist/sort-classes': [
			'warn',
			{
				groups: [
					'index-signature',
					'static-property',
					'private-property',
					'property',
					'constructor',
					'static-method',
					'private-method',
					'static-private-method',
					'method',
					['get-method', 'set-method'],
					'unknown'
				]
			}
		],
		'import/order': 'off',
		// 'import/extensions': ['warn', {js: 'never', jsx: 'never', ts: 'never', tsx: 'never'}],
		'lines-between-class-members': 'warn',
		'no-restricted-syntax': ['warn', 'ForOfStatement', 'ForInStatement'],
		'react/button-has-type': 'warn',
		'react/jsx-max-props-per-line': ['warn', {when: 'multiline'}],
		'react/jsx-props-no-spreading': ['warn', {html: 'ignore'}],
		'react/require-default-props': 'off',
		'react/prop-types': 'off',

		'jsx-a11y/click-events-have-key-events': 'warn',
		'jsx-a11y/no-static-element-interactions': 'warn',
		'jsx-a11y/no-noninteractive-element-interactions': 'warn',
		'jsx-a11y/control-has-associated-label': [
			'warn',
			{
				depth: 3,
				ignoreElements: ['audio', 'canvas', 'embed', 'input', 'textarea', 'tr', 'video']
			}
		],
		'jsx-a11y/label-has-associated-control': [
			'warn',
			{
				labelAttributes: ['label'],
				depth: 3
				// "ignoreElements": ["audio", "canvas", "embed", "input", "textarea", "tr", "video"]
			}
		],
		'react/no-array-index-key': 'warn',
		'react/jsx-no-useless-fragment': 'warn',
		'react/jsx-no-constructed-context-values': 'warn',
		'import/prefer-default-export': 'warn',
		'no-unused-vars': ['warn', {args: 'none'}],
		'@typescript-eslint/no-unused-vars': ['warn', {args: 'none'}],
		'no-use-before-define': ['error', {functions: false}],
		'unicorn/filename-case': [
			'warn',
			{
				cases: {
					camelCase: true,
					pascalCase: true,
					kebabCase: true
				}
			}
		],
		'unicorn/prevent-abbreviations': [
			'warn',
			{
				extendDefaultReplacements: false
			}
		],
		'unicorn/better-regex': 'warn',
		'unicorn/catch-error-name': 'warn',
		'unicorn/consistent-destructuring': 'warn',
		'unicorn/consistent-function-scoping': 'warn',
		'unicorn/custom-error-definition': 'off',
		'unicorn/empty-brace-spaces': 'warn',
		'unicorn/error-message': 'warn',
		'unicorn/escape-case': 'warn',
		'unicorn/expiring-todo-comments': 'warn',
		'unicorn/explicit-length-check': 'warn',
		'unicorn/import-style': 'warn',
		'unicorn/new-for-builtins': 'warn',
		'unicorn/no-abusive-eslint-disable': 'warn',
		'unicorn/no-array-callback-reference': 'warn',
		'unicorn/no-array-for-each': 'warn',
		'unicorn/no-array-method-this-argument': 'warn',
		'unicorn/no-array-push-push': 'warn',
		'unicorn/no-array-reduce': 'warn',
		'unicorn/no-await-expression-member': 'warn',
		'unicorn/no-console-spaces': 'warn',
		'unicorn/no-document-cookie': 'warn',
		'unicorn/no-empty-file': 'warn',
		'unicorn/no-for-loop': 'warn',
		'unicorn/no-hex-escape': 'warn',
		'unicorn/no-instanceof-array': 'warn',
		'unicorn/no-invalid-remove-event-listener': 'warn',
		'unicorn/no-keyword-prefix': 'off',
		'unicorn/no-lonely-if': 'warn',
		'no-negated-condition': 'off',
		'unicorn/no-negated-condition': 'warn',
		'no-nested-ternary': 'off',
		// "unicorn/no-nested-ternary": "warn",
		'unicorn/no-new-array': 'warn',
		'unicorn/no-new-buffer': 'warn',
		'unicorn/no-null': 'warn',
		'unicorn/no-object-as-default-parameter': 'warn',
		'unicorn/no-process-exit': 'warn',
		'unicorn/no-static-only-class': 'warn',
		'unicorn/no-thenable': 'warn',
		'unicorn/no-this-assignment': 'warn',
		'unicorn/no-typeof-undefined': 'warn',
		'unicorn/no-unnecessary-await': 'warn',
		'unicorn/no-unnecessary-polyfills': 'warn',
		'unicorn/no-unreadable-array-destructuring': 'warn',
		'unicorn/no-unreadable-iife': 'warn',
		'unicorn/no-unused-properties': 'off',
		'unicorn/no-useless-fallback-in-spread': 'warn',
		'unicorn/no-useless-length-check': 'warn',
		'unicorn/no-useless-promise-resolve-reject': 'warn',
		'unicorn/no-useless-spread': 'warn',
		'unicorn/no-useless-switch-case': 'warn',
		'unicorn/no-useless-undefined': 'warn',
		'unicorn/no-zero-fractions': 'warn',
		'unicorn/number-literal-case': 'warn',
		'unicorn/numeric-separators-style': 'warn',
		'unicorn/prefer-add-event-listener': 'warn',
		'unicorn/prefer-array-find': 'warn',
		'unicorn/prefer-array-flat': 'warn',
		'unicorn/prefer-array-flat-map': 'warn',
		'unicorn/prefer-array-index-of': 'warn',
		'unicorn/prefer-array-some': 'warn',
		'unicorn/prefer-at': 'warn',
		'unicorn/prefer-blob-reading-methods': 'warn',
		'unicorn/prefer-code-point': 'warn',
		'unicorn/prefer-date-now': 'warn',
		'unicorn/prefer-default-parameters': 'warn',
		'unicorn/prefer-dom-node-append': 'warn',
		'unicorn/prefer-dom-node-dataset': 'warn',
		'unicorn/prefer-dom-node-remove': 'warn',
		'unicorn/prefer-dom-node-text-content': 'warn',
		'unicorn/prefer-event-target': 'warn',
		'unicorn/prefer-export-from': 'warn',
		'unicorn/prefer-includes': 'warn',
		'unicorn/prefer-json-parse-buffer': 'off',
		'unicorn/prefer-keyboard-event-key': 'warn',
		'unicorn/prefer-logical-operator-over-ternary': 'warn',
		'unicorn/prefer-math-trunc': 'warn',
		'unicorn/prefer-modern-dom-apis': 'warn',
		'unicorn/prefer-modern-math-apis': 'warn',
		'unicorn/prefer-module': 'warn',
		'unicorn/prefer-native-coercion-functions': 'warn',
		'unicorn/prefer-negative-index': 'warn',
		'unicorn/prefer-node-protocol': 'warn',
		'unicorn/prefer-number-properties': 'warn',
		'unicorn/prefer-object-from-entries': 'warn',
		'unicorn/prefer-optional-catch-binding': 'warn',
		'unicorn/prefer-prototype-methods': 'warn',
		'unicorn/prefer-query-selector': 'warn',
		'unicorn/prefer-reflect-apply': 'warn',
		'unicorn/prefer-regexp-test': 'warn',
		'unicorn/prefer-set-has': 'warn',
		'unicorn/prefer-set-size': 'warn',
		'unicorn/prefer-spread': 'warn',
		'unicorn/prefer-string-replace-all': 'warn',
		'unicorn/prefer-string-slice': 'warn',
		'unicorn/prefer-string-starts-ends-with': 'warn',
		'unicorn/prefer-string-trim-start-end': 'warn',
		'unicorn/prefer-switch': 'warn',
		'unicorn/prefer-ternary': 'warn',
		'unicorn/prefer-top-level-await': 'warn',
		'unicorn/prefer-type-error': 'warn',
		'unicorn/relative-url-style': 'warn',
		'unicorn/require-array-join-separator': 'warn',
		'unicorn/require-number-to-fixed-digits-argument': 'warn',
		'unicorn/require-post-message-target-origin': 'off',
		'unicorn/string-content': 'off',
		'unicorn/switch-case-braces': 'warn',
		'unicorn/template-indent': 'warn',
		'unicorn/text-encoding-identifier-case': 'warn',
		'unicorn/throw-new-error': 'warn'
	}
};
