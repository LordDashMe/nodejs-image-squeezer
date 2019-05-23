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
        this.WINDOWS_OS = 'win32';
        this.LINUX_OS = 'linux';
        this.UNIX_OS = 'freebsd';
        this.MACOSX_OS = 'darwin';
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
        if (selectedOperatingSystem === this.WINDOWS_OS) {
            this.ffmpegBin = this.getCurrentDir() + '/../lib/ffmpeg-20190214-f1f66df-win64-static/bin/ffmpeg.exe';
        }
        else if (selectedOperatingSystem === this.LINUX_OS) {
            this.ffmpegBin = this.getCurrentDir() + '/../lib/ffmpeg-4.1.1-amd64-static/ffmpeg';
        }
        else if (selectedOperatingSystem === this.UNIX_OS || selectedOperatingSystem === this.MACOSX_OS) {
            throw OperatingSystemException_1.OperatingSystemException.isNotSupported(); // TODO: support in the next version.
        }
        else {
            throw OperatingSystemException_1.OperatingSystemException.isNotSupported();
        }
    }
    getOperatingSystem() {
        if (this.operatingSystem) {
            return this.operatingSystem;
        }
        return process.platform;
    }
    getCurrentDir() {
        return __dirname;
    }
    setFFMpegBin(ffmpegBin) {
        this.ffmpegBin = ffmpegBin;
    }
    getFFMpegBin() {
        return this.ffmpegBin;
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
                (error ? reject(true) : resolve(true));
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
exports.default = ImageSqueezer;
