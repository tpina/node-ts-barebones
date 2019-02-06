# Node-ts-barebones

An Boilerplate skeleton kit to start builing your Node.js and Typescript app.

What's in the box??? 📦

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

I have also added: 
* a custom logger
* pre-commit hook to run lint, prettier and tests

## Usage
1. Clone
2. Run npm install && npm run start:dev

## Scripts

- `build` - Builds the app and outputs it to the dist folder.
- `format` - Runs Prettier code formatter.
- `start` - Starts the application.
- `start:dev` - Starts the application in dev mode with hot-reloading.
- `start:debug` - Starts the application in dev mode with debug capabilities.
- `prestart:prod` - Cleans the dist folder and compiles the TS code.
- `start:prod` -  Runs the prod build from the dist folder.
- `lint` - Runs the linter.
- `tests` - Runs unit tests.
- `tests:watch` - Runs unit tests in watch mode.
- `tests:cov` - Runs unit tests and generates coverage report.
- `tests:debug` - Useful to debug tests.

### Maintainer
Tiago Pina _Original Author_ - Follow on: Twitter [@taspina](https://twitter.com/taspina) & GitHub [@tpina](https://github.com/tpina/)
