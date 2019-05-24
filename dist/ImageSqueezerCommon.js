"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImageSqueezerCommonException_1 = require("./Exception/ImageSqueezerCommonException");
class ImageSqueezerCommon {
    constructor() {
        this.bin = '';
        this.sourceFilePath = '';
        this.outputFilePath = '';
    }
    setBin(bin) {
        this.bin = bin;
    }
    setSourceFilePath(sourceFilePath) {
        this.sourceFilePath = sourceFilePath;
    }
    setOutputFilePath(outputFilePath) {
        this.outputFilePath = outputFilePath;
    }
    validateRequiredProperties() {
        if (!this.sourceFilePath) {
            throw ImageSqueezerCommonException_1.ImageSqueezerCommonException.emptySourceFilePath();
        }
        if (!this.outputFilePath) {
            throw ImageSqueezerCommonException_1.ImageSqueezerCommonException.emptyOutputFilePath();
        }
    }
}
exports.ImageSqueezerCommon = ImageSqueezerCommon;
