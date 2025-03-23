
module.exports = {
  preset: 'ts-jest', // Используем ts-jest для поддержки TypeScript
  testEnvironment: 'node', // Окружение для тестов
  moduleFileExtensions: ['ts', 'tsx', 'js'], // Расширения файлов
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], // Шаблон для поиска тестовых файлов
};
