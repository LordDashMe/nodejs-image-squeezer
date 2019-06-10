# NodeJS Image Squeezer

A simple npm package for image compression powered by FFMPEG.

[![Build Status](https://img.shields.io/travis/LordDashMe/nodejs-image-squeezer/master.svg?style=flat-square)](https://travis-ci.org/LordDashMe/nodejs-image-squeezer) [![Coverage Status](https://img.shields.io/coveralls/LordDashMe/nodejs-image-squeezer/master.svg?style=flat-square)](https://coveralls.io/github/LordDashMe/nodejs-image-squeezer?branch=master) [![NPM version](https://img.shields.io/npm/v/nodejs-image-squeezer.svg?style=flat-square)](https://www.npmjs.com/package/nodejs-image-squeezer)

## Requirement(s)

- Node.js 8.0.* up to latest.

- Operating System: Windows, Linux.

- FFMPEG Binaries or Executable File:

  - To get the latest static build for **Linux**: [Linux FFMPEG Static Build](https://johnvansickle.com/ffmpeg/)

  - For **Windows** you can download it via this link: [Windows FFMPEG Build](https://ffmpeg.zeranoe.com/builds/)

  - As of the moment **Mac OS** is not supported by this package.

  - To check the FFMPEG latest build or release please refer to this link: [FFMPEG Main Download Link](https://ffmpeg.org/download.html)

- Other Feature(s):

  - ImageMagick:

    - To use the "ProressiveJPEG" class this require the ImageMagick package. To get the latest version [ImageMagick Download Link](https://imagemagick.org/script/download.php)

## Install

### via NPM

- Use the command below to install the package via npm:

```txt
npm install nodejs-image-squeezer --save
```

## Usage

### FFMPEG

- Below are the simple implementation using **TypeScript**:

```ts

// Import the main class of the NodeJS Image Squeezer.
import ImageSqueezer from 'nodejs-image-squeezer';

// Initialize the main class.
let imgSqueezer = new ImageSqueezer.FFMPEGComppresion();

// Load the necessary requirements and validate
// if the package fit for the current environment.
imgSqueezer.load();

// Set the default binaries file.
imgSqueezer.setBin('/path/to/ffmpeg');

// Provide the source file path of the desire image
// that will be compress later on.
imgSqueezer.setSourceFilePath('/path/source-filename');

// Provide the output file path of the compressed image.
imgSqueezer.setOutputFilePath('/path/output-filename');

// (Optional) This will allow output file path as empty
// and will use the source file path as the output file path.
imgSqueezer.allowEmptyOutputFilePath();

// Prepare all necessary commands before executing
// the compression process.
imgSqueezer.build();

// Execute the image compression.
// Please take note this is an async method.
// return a Promise<boolean>.
imgSqueezer.compress();
```

- Basic implementation without using superset libraries for JavaScript (using a pure node.js syntax):

```js

// Require the main class of the NodeJS Image Squeezer.
let ImageSqueezer = require('nodejs-image-squeezer');

// Initialize the main class.
let imgSqueezer = new ImageSqueezer.FFMPEGComppresion();

// Load the necessary requirements and validate
// if the package fit for the current environment.
imgSqueezer.load();

// Set the default binaries file.
imgSqueezer.setBin('/path/to/ffmpeg');

// Provide the source file path of the desire image
// that will be compress later on.
imgSqueezer.setSourceFilePath('/path/source-filename');

// Provide the output file path of the compressed image.
imgSqueezer.setOutputFilePath('/path/output-filename');

// (Optional) This will allow output file path as empty
// and will use the source file path as the output file path.
imgSqueezer.allowEmptyOutputFilePath();

// Prepare all necessary commands before executing
// the compression process.
imgSqueezer.build();

// Execute the image compression.
// Please take note this is an async method.
// return a Promise<boolean>.
imgSqueezer.compress();
```

### JPEG Progressive

- ***Note:*** This function will only work for JPEG format.

- Below are the simple implementation using **TypeScript**:

```ts

import ImageSqueezer from 'nodejs-image-squeezer';

let imgSqueezer = new ImageSqueezer.ProgressiveJPEG();

imgSqueezer.load();
imgSqueezer.setBin('/path/to/convert');
imgSqueezer.setSourceFilePath('/path/source-filename');
imgSqueezer.setOutputFilePath('/path/output-filename');

// (Optional) This will allow output file path as empty
// and will use the source file path as the output file path.
imgSqueezer.allowEmptyOutputFilePath();

imgSqueezer.build();

// Execute the jpeg progressive optimization.
// Please take note this is an async method.
// return a Promise<boolean>.
imgSqueezer.compress();
```

- Basic implementation without using superset libraries for JavaScript (using a pure node.js syntax):

```js

let ImageSqueezer = require('nodejs-image-squeezer');

let imgSqueezer = new ImageSqueezer.ProgressiveJPEG();

imgSqueezer.load();
imgSqueezer.setBin('/path/to/convert');
imgSqueezer.setSourceFilePath('/path/source-filename');
imgSqueezer.setOutputFilePath('/path/output-filename');

// (Optional) This will allow output file path as empty
// and will use the source file path as the output file path.
imgSqueezer.allowEmptyOutputFilePath();

imgSqueezer.build();

// Execute the jpeg progressive optimization.
// Please take note this is an async method.
// return a Promise<boolean>.
imgSqueezer.compress();
```

## License

This package is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
