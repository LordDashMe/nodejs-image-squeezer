"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImageSqueezerException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ImageSqueezerException';
    }
    static emptySourceFilePath() {
        return new ImageSqueezerException('The source file path is empty.');
    }
    static emptyOutputFilePath() {
        return new ImageSqueezerException('The output file path is empty.');
    }
}
exports.ImageSqueezerException = ImageSqueezerException;
