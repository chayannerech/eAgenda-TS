import { defineConfig } from 'cypress'
import { environment } from './src/environments/environment.development'

export default defineConfig({

  e2e: {
    'baseUrl': 'http://localhost:4200',
    supportFile: './cypress/support/e2e.ts',
    env: {
      apiUrl: environment.apiUrl,
    },
  },
})
