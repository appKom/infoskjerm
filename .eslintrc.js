module.exports = {
  'env': {
    'node': true,
    'es6': true
  },
  'extends': [
    'eslint:recommended',
    'react-app',
    'react-app/jest'
  ],
  'parserOptions': {
    'parser': 'babel-eslint',
    'sourceType': 'module',
    'ecmaVersion': 2019,
    'impliedStrict': true,
  },
  'rules': {
    'indent': [ 'error', 2 ],
    // 'linebreak-style': [ 'error', 'unix' ],
    'quotes': [ 'error', 'single' ],
    'semi': [ 'error', 'always' ],
    'space-before-function-paren': [ 'error', 'never' ],
    'no-trailing-spaces': 'error',
    'default-case': 'error',
    'eqeqeq': [ 'error', 'smart' ],
    'array-bracket-newline': [ 'error', { 'multiline': true }],
    'array-bracket-spacing': [ 'error', 'always', {'singleValue': false, 'objectsInArrays': false, 'arraysInArrays': false}],
    'block-spacing': 'error',
    'brace-style': [ 'error', '1tbs', { 'allowSingleLine': true }],
    'no-lonely-if': 'error',
    'no-mixed-spaces-and-tabs': [ 'error', 'smart-tabs' ],
    'no-nested-ternary': 'error',
    'no-negated-condition': 'error',
    'arrow-spacing': 'error',
    'prefer-spread': 'error',
    'rest-spread-spacing': [ 'error', 'never' ],
    // 'no-unused-vars': [ 'error', { 'ignoreRestSiblings': true }]
  }
};