module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**',
    '!**/main/**',
    '!**/mocks/**',
    '!**/errors/**',
    '!**/protocols/**',
    '!**/**helper.ts',
    '!**/**type.ts',
    '!**/index.ts',
    '!**/migrations/**.ts',
    '!**/entities/**.ts',
    '!**/requests/**.ts',
    '**/routes/**'
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
