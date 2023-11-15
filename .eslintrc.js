module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: false
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'import', 'react', 'react-hooks'],
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:react/all',
        'plugin:react-hooks/recommended',
        'prettier'
    ],
    settings: {
        react: {
            version: 'detect'
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx', '.native.js']
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.native.js']
            },
            typescript: {
                alwaysTryTypes: true
            }
        }
    },
    root: true,
    env: {
        jest: true
    },
    rules: {
        'object-curly-newline': [
            'error',
            {
                multiline: true,
                consistent: true
            }
        ],
        '@typescript-eslint/array-type': ['error', { default: 'array' }],
        '@typescript-eslint/ban-ts-comment': [
            'error',
            {
                'ts-expect-error': 'allow-with-description',
                'ts-ignore': false,
                'ts-nocheck': true,
                'ts-check': true,
                minimumDescriptionLength: 3
            }
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-unnecessary-type-constraint': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/prefer-for-of': ['error'],
        '@typescript-eslint/require-await': ['error'],
        'import/newline-after-import': ['error', { count: 1 }],
        'import/no-unused-modules': 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.tsx'] }],
        'no-console': 'warn',
        'no-return-await': ['error'],
        'react/no-unused-prop-types': 'off',
        'react/display-name': 'off',
        'react/jsx-sort-props': 'off',
        'react/jsx-max-depth': 'off',
        'react/jsx-no-bind': 'off',
        'react-hooks/rules-of-hooks': 'off',
        'react/function-component-definition': 'off',
        'react/forbid-component-props': 'off',
        'react/prop-types': 'off',
        'react/jsx-no-useless-fragment': 'off',
        'import/order': 'off',
        'react/jsx-no-literals': 'off',
        'react/no-unstable-nested-components': 'off',
        'react/require-default-props': 'off',
        'react/destructuring-assignment': 'off',
        'react/jsx-no-leaked-render': 'off',
        'react/jsx-handler-names': 'off',
        'import/no-named-as-default-member': 'off',
        'react/self-closing-comp': 'warn',
        'react/no-multi-comp': 'off',
        'import/no-named-as-default': 'off',
        'no-case-declarations': 2,
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never'
            }
        ]
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            rules: {
                'react/jsx-props-no-spreading': 0
            }
        }
    ]
};