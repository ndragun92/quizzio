// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import typegen from 'eslint-typegen'
import perfectionist from 'eslint-plugin-perfectionist'
import markdown from '@eslint/markdown'

export default createConfigForNuxt({
  features: {
    stylistic: {
      commaDangle: 'always-multiline',
    },
    tooling: true,
    typescript: true,
  },
})
  .overrideRules({
    'vue/no-multiple-template-root': 'off',
  })
  .prepend({
    languageOptions: {
      globals: {
        $fetch: 'readonly',
        NodeJS: 'readonly',
      },
    },
  })

  .override('nuxt/javascript', {
    rules: {
      'curly': ['error', 'all'], // Including if blocks with a single statement
      'dot-notation': 'error',
      'logical-assignment-operators': [
        'error',
        'always',
        { enforceForIfStatements: true },
      ],
      'no-console': [
        'warn',
        { allow: ['warn', 'error', 'debug', 'time', 'timeEnd'] },
      ],
      'no-lonely-if': 'error', // No single if in an "else" block
      'no-useless-rename': 'error',
      'object-shorthand': 'error',
      'prefer-const': [
        'error',
        { destructuring: 'any', ignoreReadBeforeAssign: false },
      ],
      'require-await': 'error',
      'sort-imports': ['error', { ignoreDeclarationSort: true }],
    },
  })

  .override('nuxt/typescript/rules', {
    rules: {
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': true,
        },
      ],
      '@typescript-eslint/no-dynamic-delete': 'off',
      '@typescript-eslint/no-unused-vars': [
        'off',
        {
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '',
        },
      ],
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/unified-signatures': 'off',
      ...{
        // TODO: Discuss if we want to enable this
        '@typescript-eslint/ban-types': 'off',
        // TODO: Discuss if we want to enable this
        '@typescript-eslint/no-explicit-any': 'off',
        // TODO: Discuss if we want to enable this
        '@typescript-eslint/no-invalid-void-type': 'off',
      },
    },
  })

  .override('nuxt/vue/rules', {
    rules: {},
  })

  // Stylistic rules
  .override('nuxt/stylistic', {
    rules: {
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/indent-binary-ops': 'off',
      '@stylistic/max-statements-per-line': 'off',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/quote-props': ['error', 'consistent'],
      '@stylistic/space-before-function-paren': ['error', 'always'],
    },
  })

  // Append local rules
  .append(
    {
      files: ['*.{js,ts}'],
      ignores: [],
      name: 'local/requires/explicit-node-imports',
      rules: {
        // Ban direct use of restricted global identifiers
        'no-restricted-globals': [
          'error',
          {
            message:
              'Use explicit import: import process from "node:process" (or a scoped alias). Implicit globals are banned for clarity and tree-shakability.',
            name: 'process',
          },
          {
            message:
              'Use explicit import: import { performance } from "node:perf_hooks". Implicit global performance is banned in server contexts to ensure Node.js-specific usage.',
            name: 'performance',
          },
        ],
      },
    },
    // Sort rule keys in eslint config
    {
      files: ['**/eslint.config.mjs'],
      name: 'local/sort-eslint-config',
      plugins: {
        perfectionist,
      },
      rules: {
        'perfectionist/sort-objects': 'error',
      },
    },
    {
      files: ['**/*.md'],
      language: 'markdown/commonmark',
      name: 'local/docs-markdown',
      plugins: {
        markdown,
      },
      processor: 'markdown/markdown',
    },
    {
      // targets code-blocks in markdown files
      files: ['**/*.md/**/*'],
      rules: {
        '@stylistic/keyword-spacing': 'off',
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'import/first': 'off',
        'no-console': 'off',
        'no-unused-vars': 'off',
        'vue/no-unused-vars': 'off',
        'vue/require-v-for-key': 'off',
      },
    },
  )

  // Generate type definitions for the eslint config
  .onResolved(configs => typegen(configs))

// import { createConfigForNuxt } from "@nuxt/eslint-config/flat";

// export default createConfigForNuxt({
//   features: {
//     tooling: true,
//     stylistic: true,
//   },
// }).overrideRules({
//   "import/first": "off",
//   "import/order": "off",
//   "vue/multi-word-component-names": "off",
//   "vue/max-attributes-per-line": ["error", { singleline: 5 }],
//   "@typescript-eslint/ban-types": "off",
//   "@typescript-eslint/no-empty-object-type": "off",
//   "@typescript-eslint/no-explicit-any": "off",
//   "eol-last": "off",
//   "vue/html-self-closing": "off",
//   "vue/no-multiple-template-root": "off",
// });
