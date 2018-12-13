module.exports = {
  parser: 'babel-eslint',
  extends: 'yoctol',
  plugins: ['jsx-a11y', 'react'],
  env: {
    browser: true,
  },
  rules: {
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/mouse-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/destructuring-assignment': 'off',
    'react/sort-prop-types': [
      'error',
      {
        callbacksLast: true,
        ignoreCase: false,
        requiredFirst: false,
      },
    ],
    'react/no-deprecated': ['warn'],
    'react/prefer-stateless-function': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
  },
};
