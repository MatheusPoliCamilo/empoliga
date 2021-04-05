module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  roots: ['<rootDir>/__tests__'],
  testPathIgnorePatterns: ['/node_modules/'],
  globals: {
    // we must specify a custom tsconfig for tests because we need the typescript transform
    // to transform jsx into js rather than leaving it jsx such as the next build requires.  you
    // can see this setting in tsconfig.jest.json -> "jsx": "react"
    // https://github.com/vercel/next.js/issues/8663#issue-490553899
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
}
