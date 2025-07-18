import globals from 'globals';
import eslint from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import nextPlugin from '@next/eslint-plugin-next';
import jestDomPlugin from 'eslint-plugin-jest-dom';
import testingLibraryPlugin from 'eslint-plugin-testing-library';

export default [
  {
    ignores: ['coverage/', 'dist/'],
  },
  eslint.configs.recommended,
  importPlugin.flatConfigs.recommended, // Remove when airbnb added
  jsxA11y['flatConfigs'].recommended, // Remove when airbnb added
  // TODO Add `airbnb` with eslint v9 support
  // https://github.com/airbnb/javascript/issues/2961
  reactPlugin.configs.flat.recommended,
  nextPlugin['flatConfig'].recommended,
  jestDomPlugin.configs['flat/recommended'],
  testingLibraryPlugin.configs['flat/react'],
  {
    name: 'next-tag-example',
    files: ['**/*.{js,jsx,cjs,mjs}'],
    languageOptions: {
      ecmaVersion: 15,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2024,
        ...globals.jest,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      react: {
        pragma: 'React',
        version: 'detect',
      },
    },
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
];
