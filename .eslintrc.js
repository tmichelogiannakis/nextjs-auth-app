module.exports = {
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json',
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-use-before-define': ['error'],
    'no-console': ['error', { allow: ['warn', 'error'] }]
  },
  settings: {
    react: { version: 'detect' }
  }
};
