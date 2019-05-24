"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProgressiveJPEGException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ProgressiveJPEGException';
    }
    static requiredDependenciesNotInstalled() {
        return new ProgressiveJPEGException('The required dependencies not installed in the current system. (ie. Image Magick)');
    }
}
exports.ProgressiveJPEGException = ProgressiveJPEGException;
