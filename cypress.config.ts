import { defineConfig } from 'cypress';
const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
    
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Шаблон для поиска тестов
    async setupNodeEvents(on, config) {
      const options = {
        webpackOptions: {
          resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
          module: {
            rules: [
              {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
              },
            ],
          },
          plugins: [
            new NodePolyfillPlugin(), // Полифил для других Node.js-модулей
          ],
        },
      };
      on('file:preprocessor', webpackPreprocessor(options));
      return config;
    },
  },
});