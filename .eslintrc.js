module.exports = {
  root:   true,
  parser: '@typescript-eslint/parser',
  env:    {
    node:    true,
    browser: true,
    jest:    true,
    es2022:  true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType:  'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  globals: {
    React:   true,
    JSX:     true,
    process: true,
  },
  rules: {
    'no-redeclare':                    'off',
    '@typescript-eslint/no-redeclare': 'warn',
    'react/no-unescaped-entities':     'off',
    'no-extra-semi':                   'error',
    'quote-props':                     ['error', 'as-needed'],
    'space-before-function-paren':     ['error', 'always'],
    indent:                            ['error', 2],
    'react/react-in-jsx-scope':        'off',
    'no-throw-literal':                0,
    'no-unused-expressions':           'off',
    'no-var':                          2,
    'prefer-const':                    2,
    'no-extra-boolean-cast':           'off',
    'array-bracket-spacing':           ['error', 'never'],
    'object-curly-spacing':            ['error', 'always'],
    'no-useless-escape':               'off',
    semi:                              ['error','never'],
    'comma-dangle':                    [
      'error',
      {
        arrays:    'always-multiline',
        objects:   'always-multiline',
        imports:   'always-multiline',
        exports:   'always-multiline',
        functions: 'never',
      },
    ],
    'key-spacing': [
      'error',
      {
        align: 'value',
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any':                'off',
    '@typescript-eslint/no-unused-vars':                 [
      'error',
      {
        varsIgnorePattern: '^env$|^_.+?',
      },
    ],
    'multiline-comment-style': ['error', 'starred-block'],
    quotes:                    ['error', 'single'],
  },
}
