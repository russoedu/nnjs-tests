module.exports = {
  root:   true,
  parser: '@typescript-eslint/parser',
  env:    {
    es2022: true,
    node:   true,
    jest:   true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended', // Out of the box Typescript rules
    'standard', // Out of the box StandardJS rules
  ],
  plugins: [
    '@typescript-eslint', // Let's us override rules below.
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType:  'module',
  },
  rules: {
    // P5 specific rules
    'no-new':                                   0,
    'new-cap':                                  0,
    '@typescript-eslint/no-non-null-assertion': 0,

    'no-undef':                  0,
    'no-redeclare':              'off',
    'no-throw-literal':          0,
    '@typescript-eslint/indent': 'off', // This is the job of StandardJS
    'no-unused-expressions':     'off',
    'no-var':                    2,
    'prefer-const':              2,
    'no-extra-boolean-cast':     'off',
    'object-curly-spacing':      [
      2,
      'always',
    ],
    'no-useless-escape': 'off',
    semi:                [
      'error',
      'never',
    ],
    'comma-dangle': [
      'error',
      {
        arrays:    'always-multiline',
        objects:   'always-multiline',
        imports:   'always-multiline',
        exports:   'always-multiline',
        functions: 'only-multiline',
      },
    ],
    'key-spacing': [
      'error',
      {
        align: 'value',
      },
    ],
    'no-dupe-class-members':                             'off',
    'no-unused-vars':                                    'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any':                'off',
    '@typescript-eslint/no-unused-vars':                 0,
    'multiline-comment-style':                           ['error', 'starred-block'],
  },
}
