module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/jestImports.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
  },
  coverageProvider: 'v8',
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules']
};
