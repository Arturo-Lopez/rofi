module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb', 'airbnb-typescript', 'next/core-web-vitals', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: 'web/tsconfig.json',
    tsconfigRootDir: __dirname + '/../..',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react/jsx-props-no-spreading': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
  },
  ignorePatterns: ['.next', 'node_modules', '*.config.js'],
};
