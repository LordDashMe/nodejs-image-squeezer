"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const ImageSqueezerCommonException_1 = require("./Exception/ImageSqueezerCommonException");
class ImageSqueezerCommon {
    constructor() {
        this.subClassType = '';
        this.bin = '';
        this.sourceFilePath = '';
        this.outputFilePath = '';
        this.isAllowedEmptyOutputFilePath = false;
    }
    setSubClassType(subClassType) {
        this.subClassType = subClassType;
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
    allowEmptyOutputFilePath() {
        this.isAllowedEmptyOutputFilePath = true;
    }
    validateRequiredProperties() {
        if (!this.sourceFilePath) {
            throw ImageSqueezerCommonException_1.ImageSqueezerCommonException.emptySourceFilePath();
        }
        if (!this.outputFilePath) {
            throw ImageSqueezerCommonException_1.ImageSqueezerCommonException.emptyOutputFilePath();
        }
    }
    transferSouceFilePathToOutputFilePath() {
        if (this.isAllowedEmptyOutputFilePath) {
            this.outputFilePath = this.sourceFilePath;
        }
    }
    handleOutputFilePath() {
        if (this.isAllowedEmptyOutputFilePath) {
            return this.generateTemporaryOutputFilePath();
        }
        else {
            return this.escapeShellArg(this.outputFilePath);
        }
    }
    generateTemporaryOutputFilePath() {
        let filename = path_1.default.basename(this.outputFilePath);
        let splittedFilename = filename.split('.');
        let newFilename = splittedFilename[0] + '-compressed-' + this.subClassType + '.' + splittedFilename[1];
        let newBasename = this.escapeShellArg(this.outputFilePath.replace(filename, newFilename));
        return newBasename + ' && mv ' +
            newBasename + ' ' + this.escapeShellArg(this.outputFilePath);
    }
    escapeShellArg(arg) {
        return `'${arg.replace(/'/g, `'\\''`)}'`;
    }
}
exports.ImageSqueezerCommon = ImageSqueezerCommon;
