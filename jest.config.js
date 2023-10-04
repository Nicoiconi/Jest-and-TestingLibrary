export default {
  testEnvironment: 'jsdom',
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)', // x defecto se use la carpeta __test__
    '**/?(*.)+(spec|test|tests).[tj]s?(x)' // archivos llamados de cualquier manera, que tengan en el nombre spec, test o tests y que sea tjs, js y jsx
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};