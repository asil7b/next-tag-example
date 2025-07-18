module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
  ],
  setupFiles: [
    'react-app-polyfill/jsdom',
    '<rootDir>/test/setup.env.js',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/test/setup.tests.js',
  ],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
