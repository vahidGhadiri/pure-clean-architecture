import perfectionist from 'eslint-plugin-perfectionist';
import reactHooks from 'eslint-plugin-react-hooks';
import pluginVitest from '@vitest/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import nava from '@whydrf/eslint-plugin-nava';

const browserGlobals = {
    AbortController: 'readonly',
    URLSearchParams: 'readonly',
    sessionStorage: 'readonly',
    clearInterval: 'readonly',
    clearTimeout: 'readonly',
    localStorage: 'readonly',
    setInterval: 'readonly',
    setTimeout: 'readonly',
    navigator: 'readonly',
    document: 'readonly',
    console: 'readonly',
    window: 'readonly',
    fetch: 'readonly',
    URL: 'readonly',
};

const commonJsGlobals = { __dirname: 'readonly', process: 'readonly', require: 'readonly', module: 'readonly' };
const nodeScriptGlobals = { console: 'readonly', process: 'readonly' };

const vitestGlobals = {
    beforeEach: 'readonly',
    afterEach: 'readonly',
    beforeAll: 'readonly',
    afterAll: 'readonly',
    describe: 'readonly',
    expect: 'readonly',
    test: 'readonly',
    it: 'readonly',
    vi: 'readonly',
};

const projectAliasPattern =
    '^@(assets(?:/illustrations)?|shared|adapters|features|infrastructure|components|services|configs|domain|utils|hooks)(?:/.*)?$';
const perfectionistRecommendedLineLengthRules = perfectionist.configs['recommended-line-length'].rules;

export default [
    {
        ignores: [
            'eslint.config.mjs',
            '.dependency-cruiser.js',
            'node_modules/**',
            'coverage/**',
            '.husky/**',
            'build/**',
            'report/*',
            'dist/**',
            'out/**',
            '.next',
            'templates/**',
        ],
    },

    js.configs.recommended,
    ...tseslint.configs.recommended,

    {
        rules: {
            ...perfectionistRecommendedLineLengthRules,
            'prettier/prettier': 'error',
            'perfectionist/sort-imports': [
                'error',
                {
                    groups: [['builtin', 'external'], ['alias'], ['parent', 'sibling', 'index'], 'unknown'],
                    customGroups: [
                        { elementNamePattern: projectAliasPattern, groupName: 'alias' },
                        { elementNamePattern: '^src/', groupName: 'sibling' },
                    ],
                    fallbackSort: { type: 'alphabetical', order: 'asc' },
                    type: 'line-length',
                    newlinesBetween: 1,
                    order: 'desc',
                },
            ],
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                    fixStyle: 'separate-type-imports',
                },
            ],
            'nava/no-inline-type-imports': 'error',
            '@typescript-eslint/explicit-function-return-type': 'off',
            'no-empty': ['error', { allowEmptyCatch: true }],
            'nava/multiline-type-literals': 'error',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'nava/module-member-order': 'error',
            'perfectionist/sort-modules': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
        },
        plugins: {
            nava,
            'react-hooks': reactHooks,
            react: reactPlugin,
            perfectionist,
            prettier,
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaFeatures: { jsx: true },
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: false,
            },
            globals: browserGlobals,
        },
        settings: { react: { version: 'detect' } },
        files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
    },

    {
        files: [
            'src/configs/tailwind/**/*.js',
            '**/*.webpack.{js,cjs}',
            '**/*.config.{js,cjs}',
            'tailwind.config.js',
            'postcss.config.js',
        ],
        languageOptions: { parserOptions: { ecmaVersion: 'latest', sourceType: 'script' }, globals: commonJsGlobals },
        rules: { '@typescript-eslint/no-require-imports': 'off' },
    },
    {
        rules: { ...pluginVitest.configs.recommended.rules, '@typescript-eslint/no-explicit-any': 'off' },
        files: ['**/*.{test,spec}.{ts,tsx,js,jsx}'],
        languageOptions: { globals: vitestGlobals },
        plugins: { vitest: pluginVitest },
    },
    {
        languageOptions: { parserOptions: { ecmaVersion: 'latest', sourceType: 'module' }, globals: nodeScriptGlobals },
        files: ['scripts/**/*.mjs'],
    },
];

// Enforced via @whydrf/eslint-plugin-nava

// Enforced via @whydrf/eslint-plugin-nava
