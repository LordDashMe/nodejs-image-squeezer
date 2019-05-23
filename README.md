# NodeJS Image Squeezer

A simple NodeJS package for image compression powered by FFMPEG.

[![Build Status](https://img.shields.io/travis/LordDashMe/nodejs-image-squeezer/master.svg?style=flat-square)](https://travis-ci.org/LordDashMe/nodejs-image-squeezer) [![Coverage Status](https://img.shields.io/coveralls/LordDashMe/nodejs-image-squeezer/master.svg?style=flat-square)](https://coveralls.io/github/LordDashMe/nodejs-image-squeezer?branch=master) [![NPM version](https://img.shields.io/npm/v/image.io.svg?style=flat-square)](https://www.npmjs.com/package/nodejs-image-squeezer)

## Requirement(s)

- Node.js 8.0.* up to latest.

- Operating System: Windows, Linux or Mac OS X.

## Install

### via NPM

- Use the command below to install the package via npm:

```txt
npm install nodejs-image-squeezer --save
```

## Usage

- Below are the simple implementation of the package using **TypeScript**:

```ts

// Import the main class of the NodeJS Image Squeezer.
import ImageSqueezer from 'nodejs-image-squeezer';

// Initialize the main class.
var imageSqueezer = new ImageSqueezer();

// Load the necessary requirements and validate
// if the package fit for the current environment.
imageSqueezer.load();

// Provide the source file path of the desire image
// that will be compress later on.
imageSqueezer.setSourceFilePath('/path/source-filename');

// Provide the output file path of the compressed image.
imageSqueezer.setOutputFilePath('/path/output-filename');

// Execute the image compression.
imageSqueezer.compress();
```

- Basic implementation of the package without superset libraries of JavaScript (using a pure node.js syntax):

```js

// Require the main class of the NodeJS Image Squeezer.
var ImageSqueezer = require('nodejs-image-squeezer');

// Initialize the main class.
var imageSqueezer = new ImageSqueezer();

// Load the necessary requirements and validate
// if the package fit for the current environment.
imageSqueezer.load();

// Provide the source file path of the desire image
// that will be compress later on.
imageSqueezer.setSourceFilePath('/path/source-filename');

// Provide the output file path of the compressed image.
imageSqueezer.setOutputFilePath('/path/output-filename');

// Execute the image compression.
imageSqueezer.compress();
```

## License

This package is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
