import { defineConfig } from 'cypress'

export default defineConfig({

  e2e: {
    'baseUrl': 'http://localhost:4200',
    supportFile: './cypress/support/e2e.ts',
    env: {
      apiUrl: 'https://localhost:4300/api',
    },
  },
})
