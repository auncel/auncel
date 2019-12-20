module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
  ],
  rules: {
    "linebreak-style": ["error", "unix"],
    "jsx-a11y/href-no-hash": 0,
    "jsx-a11y/img-has-alt": 0,
    "import/no-unresolved": 0, // 和 ts 冲突
    "import/extensions": 0,
    "import/prefer-default-export": 0,
    "react/jsx-filename-extension": 1,
    "no-bitwise": 0,
    "no-param-reassign": 1, // 要启用
    "import/first": 1, // @@
    "no-useless-constructor": 1, // @@
    "class-methods-use-this": 1,
    "@typescript-eslint/no-unused-vars": 1,
    "no-empty-function": 1, // @@
    "no-unused-vars": 1, // @@
    "no-useless-catch": 1, // @@
    "@typescript-eslint/ban-ts-ignore": 1,
    "no-use-before-define": 1,
    "@typescript-eslint/no-use-before-define": 1,
    "no-restricted-syntax": 1,
    "no-fallthrough": 1,
    "no-plusplus": 0,
    "@typescript-eslint/interface-name-prefix": [2, { "prefixWithI": "always" } ], // @@
    "no-irregular-whitespace": 1,
    "max-len": [1, { "code": 80 }],
    "no-empty": 1,
    "@typescript-eslint/no-empty-function": 1,
    "no-return-await": 1,
    "no-useless-escape": 1,
    "no-multi-assign": 1,
    "no-shadow": 1,
    "no-undef": 1,
    "no-duplicate-case": 1,
    "no-cond-assign": 1,
    "no-await-in-loop": 1,
    "@typescript-eslint/no-var-requires": 1,
    "react/jsx-filename-extension": [1, { "extensions": [".tsx"] }]
  },
  "settings": {
    "import/extensions": [
      ".js",
      ".jsx",
      ".ts",
      ".tsx"
    ]
  }
};