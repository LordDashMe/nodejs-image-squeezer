"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const image_size_1 = __importDefault(require("image-size"));
const ImageSqueezerException_1 = require("./Exception/ImageSqueezerException");
const OperatingSystemException_1 = require("./Exception/OperatingSystemException");
class ImageSqueezer {
    constructor() {
        this.operatingSystem = '';
        this.ffmpegBin = '';
        this.sourceFilePath = '';
        this.outputFilePath = '';
    }
    setOperatingSystem(operatingSystem) {
        this.operatingSystem = operatingSystem;
    }
    load() {
        this.verifySupportedOperatingSystem();
    }
    verifySupportedOperatingSystem() {
        var selectedOperatingSystem = this.getOperatingSystem();
        switch (selectedOperatingSystem) {
            case ImageSqueezer.WINDOWS_OS:
            case ImageSqueezer.LINUX_OS:
                break;
            case ImageSqueezer.UNIX_OS:
            case ImageSqueezer.MACOSX_OS:
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
    setFFMpegBin(ffmpegBin) {
        this.ffmpegBin = ffmpegBin;
    }
    setSourceFilePath(sourceFilePath) {
        this.sourceFilePath = sourceFilePath;
    }
    setOutputFilePath(outputFilePath) {
        this.outputFilePath = outputFilePath;
    }
    compress() {
        this.validateRequiredProperties();
        var imageDimensions = image_size_1.default(this.sourceFilePath);
        var cmd = this.ffmpegBin + ' -y -i ' +
            this.sourceFilePath +
            ' -vf scale=w=' + imageDimensions.width +
            ':h=' + imageDimensions.height +
            ':force_original_aspect_ratio=decrease ' +
            this.outputFilePath;
        return (new Promise((resolve, reject) => {
            child_process_1.default.exec(cmd, (error) => {
                (error ? reject(error) : resolve(true));
            });
        }));
    }
    validateRequiredProperties() {
        if (!this.sourceFilePath) {
            throw ImageSqueezerException_1.ImageSqueezerException.emptySourceFilePath();
        }
        if (!this.outputFilePath) {
            throw ImageSqueezerException_1.ImageSqueezerException.emptyOutputFilePath();
        }
    }
}
ImageSqueezer.WINDOWS_OS = 'win32';
ImageSqueezer.LINUX_OS = 'linux';
ImageSqueezer.UNIX_OS = 'freebsd';
ImageSqueezer.MACOSX_OS = 'darwin';
exports.default = ImageSqueezer;
