// vue-projects/project-x/.eslintrc.js
// @ts-check

import vueConfig from '../../configs/.eslintrc.vue.js'; // Путь к общей Vue конфигурации
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // Важно: ESLint ищет tsconfig.json относительно текущего .eslintrc.js
    linterOptions: {
      parserOptions: {
        project: ['tsconfig.json'], // Или ['src/tsconfig.json']
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  vueConfig, // Используем общую Vue конфигурацию
  {
    // Здесь можно добавить правила, специфичные ТОЛЬКО для project-x
  },
  {
    // Игнорирования, специфичные ТОЛЬКО для project-x
    ignores: [
      'cypress/',
    ],
  }
);
