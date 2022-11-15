module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transform:              {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFiles: [
    '<rootDir>/src/_jest/setup.js',
  ],
  collectCoverage:   false,
  coverageReporters: [
    'text',
    'html',
  ],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputName:          'test-results.xml',
        usePathForSuiteName: 'true',
      },
    ],
  ],
}
