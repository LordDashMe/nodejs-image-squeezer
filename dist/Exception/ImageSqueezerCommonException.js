"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImageSqueezerCommonException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ImageSqueezerCommonException';
    }
    static emptySourceFilePath() {
        return new ImageSqueezerCommonException('The source file path is empty.');
    }
    static emptyOutputFilePath() {
        return new ImageSqueezerCommonException('The output file path is empty.');
    }
}
exports.ImageSqueezerCommonException = ImageSqueezerCommonException;
