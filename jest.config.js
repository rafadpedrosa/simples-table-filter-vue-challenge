module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['./tests/setup.js'],
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)']
}
