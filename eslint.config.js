import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import eslintConfigPrettier from 'eslint-config-prettier';
import svelteParser from 'svelte-eslint-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default [
	includeIgnoreFile(gitignorePath),
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	...eslintPluginSvelte.configs['flat/prettier'],
	eslintConfigPrettier,
	{ files: ['**/*.{js,mjs,cjs,ts}'] },
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte', '*.svelte'],

		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			},
			parser: svelteParser,
			parserOptions: {
				parser: {
					ts: '@typescript-eslint/parser'
				},
				extraFileExtensions: ['.svelte']
			}
		}
	}
];
