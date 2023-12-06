module.exports = {
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1',
    '@pages/(.*)$': '<rootDir>/src/app/pages/$1',
    '@shared/(.*)$': '<rootDir>/src/app/shared/$1',
    '@src/(.*)$': '<rootDir>/src/$1'
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/cypress/']
};
