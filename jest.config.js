module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': ['ts-jest'],
  },
}
