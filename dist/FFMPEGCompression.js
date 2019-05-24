"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const child_process_1 = __importDefault(require("child_process"));
const image_size_1 = __importDefault(require("image-size"));
const ImageSqueezerCommon_1 = require("./ImageSqueezerCommon");
const OperatingSystemException_1 = require("./Exception/OperatingSystemException");
class FFMPEGCompression extends ImageSqueezerCommon_1.ImageSqueezerCommon {
    constructor() {
        super(...arguments);
        this.operatingSystem = '';
        this.isAllowedEmptyOutputFilePath = false;
    }
    setOperatingSystem(operatingSystem) {
        this.operatingSystem = operatingSystem;
    }
    load() {
        this.verifySupportedOperatingSystem();
    }
    verifySupportedOperatingSystem() {
        let selectedOperatingSystem = this.getOperatingSystem();
        switch (selectedOperatingSystem) {
            case FFMPEGCompression.WINDOWS_OS:
            case FFMPEGCompression.LINUX_OS:
                break;
            case FFMPEGCompression.UNIX_OS:
            case FFMPEGCompression.MACOSX_OS:
            default:
                throw OperatingSystemException_1.OperatingSystemException.isNotSupported();
        }
    }
    getOperatingSystem() {
        if (this.operatingSystem) {
            return this.operatingSystem;
        }
        return process.platform;
    }
    allowEmptyOutputFilePath() {
        this.isAllowedEmptyOutputFilePath = true;
    }
    compress() {
        this.transferSouceFilePathToOutputFilePath();
        this.validateRequiredProperties();
        let imageDimensions = image_size_1.default(this.sourceFilePath);
        let cmd = this.bin + ' -y -i ' +
            this.escapeShellArg(this.sourceFilePath) +
            ' -vf scale=w=' + imageDimensions.width +
            ':h=' + imageDimensions.height +
            ':force_original_aspect_ratio=decrease:interl=1 ';
        cmd += this.handleOutputFilePath();
        return (new Promise((resolve, reject) => {
            child_process_1.default.exec(cmd, (error) => {
                (error ? reject(error) : resolve(true));
            });
        }));
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
        let newFilename = splittedFilename[0] + '-compressed.' + splittedFilename[1];
        let newBasename = this.escapeShellArg(this.outputFilePath.replace(filename, newFilename));
        return newBasename + ' && mv ' +
            newBasename + ' ' + this.escapeShellArg(this.outputFilePath);
    }
    escapeShellArg(arg) {
        return `'${arg.replace(/'/g, `'\\''`)}'`;
    }
}
FFMPEGCompression.WINDOWS_OS = 'win32';
FFMPEGCompression.LINUX_OS = 'linux';
FFMPEGCompression.UNIX_OS = 'freebsd';
FFMPEGCompression.MACOSX_OS = 'darwin';
exports.default = FFMPEGCompression;
