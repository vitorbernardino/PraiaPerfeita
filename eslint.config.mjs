// eslint.config.mjs
import { fileURLToPath, URL } from 'node:url';
import { dirname } from 'node:path';
import parser from '@typescript-eslint/parser';
import eslintPlugin from '@typescript-eslint/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  {
    ignores: ['module-alias.ts', 'src/util/module-alias.ts'],
    files: ['src/**/*.ts', 'test/**/*.ts'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 2020,  // Ajuste para a versão que você deseja usar
        sourceType: 'module',
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true, // Se você estiver usando JSX
        },
      },
      globals: {
        // Defina os globais que você precisa aqui
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': eslintPlugin,
    },
    rules: {
      // Adicione regras personalizadas aqui
      'no-console': 'warn', // Exemplo de regra personalizada
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Exemplo de desativar uma regra
      // Adicione outras regras conforme necessário

      // Regras personalizadas diretamente no formato plano
      'no-console': 'warn', // Aviso para uso de console
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Desativa a regra de tipos de retorno explícitos
      // Adicione outras regras conforme necessário
      'semi': ['error', 'always'], // Exige ponto e vírgula no final das instruções
      'quotes': ['error', 'single'], // Exige aspas simples para strings
      'indent': ['error', 2], // Exige indentação com 2 espaços
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }], // Aviso para variáveis não usadas, exceto se começar com _
    },
    settings: {
      // Adicione configurações de plugins se necessário
    },
  },
];