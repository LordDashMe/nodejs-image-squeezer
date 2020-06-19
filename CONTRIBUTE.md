# Contribute

The documentation needed to read in order to contribute in the project.

## Tech Stacks | Packages

- [babel](https://babeljs.io/): is a free and open-source JavaScript transcompiler that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript that can be run by older JavaScript engines.

- [commitlint](https://www.conventionalcommits.org/): A specification for adding human and machine readable meaning to commit messages.

- [eslint](https://www.npmjs.com/package/eslint): ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

- [husky](https://www.npmjs.com/package/husky): Git hooks made easy. Husky can prevent bad git commit, git push and more 🐶 woof!

- [image-size](https://www.npmjs.com/package/image-size): A Node module to get dimensions of any image file.

- [jest](https://www.npmjs.com/package/jest): Delightful JavaScript Testing.

- [lint-staged](https://www.npmjs.com/package/lint-staged): Run linters against staged git files and don't let 💩 slip into your code base!

- [standard-version](https://www.npmjs.com/package/standard-version): A utility for versioning using semver and CHANGELOG generation powered by Conventional Commits.

- [ts-jest](https://www.npmjs.com/package/ts-jest): is a TypeScript preprocessor with source map support for Jest that lets you use Jest to test projects written in TypeScript.

- [typescript](https://www.npmjs.com/package/typescript): is a language for application-scale JavaScript. TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript compiles to readable, standards-based JavaScript.

- [file-type](https://www.npmjs.com/package/file-type): Detect the file type of a Buffer/Uint8Array/ArrayBuffer. The file type is detected by checking the magic number of the buffer.

- [read-chunk](https://www.npmjs.com/package/read-chunk): Read a chunk from a file. Because the built-in way requires way too much boilerplate.

## Development

### Docker Setup

- Make sure the docker compose is installed.

- The source code also support docker setup and there is a ```docker-compose.yml``` prepared to kick in.

- Rename the ```env-sample``` to ```.env``` and fillup the content of the said file.

- Once the required files are now ready, execute the ```docker-compose up -d``` command.

### Preparing Production Build

- Transpile the typescript code: ```npm run build:tsc```

- Generate latest release tag: ```npm run build:production```

## Publishing

- Before publishing make sure to create a latest git tag with name using sematic versioning.

- To submit on Github Packages:

  ```text

  $ npm login --registry=https://npm.pkg.github.com/
  > Username: USERNAME
  > Password: TOKEN
  > Email: PUBLIC-EMAIL-ADDRESS

  $ npm publish
  > SUCESS!

  ```

- To submit on npm regular registry just run: ```npm publish```
