import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // enable jest-like global test APIs, required to allow setting up jest-dom below
      globals: true,
      environment: 'happy-dom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      setupFiles: ['./src/tests.setup.ts'],
      deps: {
        inline: ['vuetify']
      }
    },
  }),
)
