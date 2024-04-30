module.exports = {
  env: {
    browser : true,
    es2021  : true,
    node    : true,
  },
  extends: [
    'airbnb-base',
    '@nuxtjs/eslint-config-typescript',
    'airbnb-typescript/base',
    'plugin:vue/vue3-recommended',
  ],
  parserOptions: {
    ecmaVersion         : 'latest',
    parser              : '@typescript-eslint/parser',
    sourceType          : 'module',
    project             : './tsconfig.json',
    extraFileExtensions : ['.vue'],
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'no-console'           : 'off',
    'no-underscore-dangle' : 'off',
    'comma-dangle'         : ['error', 'always-multiline'],
    'key-spacing'          : ['error', {
      align: {
        beforeColon : true,
        afterColon  : true,
        on          : 'colon',
      },
    }],
    'max-len'                           : ['error', 150],
    'no-shadow'                         : 'off',
    'class-methods-use-this'            : 'off',
    '@typescript-eslint/no-shadow'      : 'off',
    'import/extensions'                 : ['error', 'ignorePackages', { ts: 'never' }],
    'import/no-extraneous-dependencies' : ['error', { devDependencies: true }],
    'vue/multi-word-component-names'    : 'off',
    'no-spaced-func'                    : 'off',
    'no-unused-vars'                    : 'off',
    'vue/script-setup-uses-vars'        : 'error',
    'vue/no-v-html'                     : 'off',
    'vue/require-default-prop'          : 'off',
    'linebreak-style'                   : ['error', 'unix'],
    '@typescript-eslint/no-unused-vars' : [
      'error',
      {
        argsIgnorePattern         : '^_',
        varsIgnorePattern         : '^_',
        caughtErrorsIgnorePattern : '^_',
      },
    ],
    'vue/no-v-for-template-key'    : 'off',
    'import/prefer-default-export' : 'off',
    'no-plusplus': 'off',
    'vue/no-multiple-template-root': 'off',
    "@typescript-eslint/consistent-type-imports": "error",
    "no-await-in-loop": 'off'
  }
};
