"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = __importDefault(require("child_process"));
var image_size_1 = __importDefault(require("image-size"));
var OperatingSystemException_1 = require("./Exception/OperatingSystemException");
var ImageSqueezerException_1 = require("./Exception/ImageSqueezerException");
var ImageSqueezer = /** @class */ (function () {
    function ImageSqueezer() {
        this.WINDOWS_OS = 'win32';
        this.LINUX_OS = 'linux';
        this.UNIX_OS = 'freebsd';
        this.MACOSX_OS = 'darwin';
        this.operatingSystem = '';
        this.ffmpegBin = '';
        this.sourceFilePath = '';
        this.outputFilePath = '';
    }
    ImageSqueezer.prototype.setOperatingSystem = function (operatingSystem) {
        this.operatingSystem = operatingSystem;
    };
    ImageSqueezer.prototype.load = function () {
        this.verifySupportedOperatingSystem();
    };
    ImageSqueezer.prototype.verifySupportedOperatingSystem = function () {
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
    };
    ImageSqueezer.prototype.getOperatingSystem = function () {
        if (this.operatingSystem) {
            return this.operatingSystem;
        }
        return process.platform;
    };
    ImageSqueezer.prototype.getCurrentDir = function () {
        return __dirname;
    };
    ImageSqueezer.prototype.getFFMpegBin = function () {
        return this.ffmpegBin;
    };
    ImageSqueezer.prototype.setSourceFilePath = function (sourceFilePath) {
        this.sourceFilePath = sourceFilePath;
    };
    ImageSqueezer.prototype.setOutputFilePath = function (outputFilePath) {
        this.outputFilePath = outputFilePath;
    };
    ImageSqueezer.prototype.compress = function () {
        this.validateRequiredProperties();
        var imageDimensions = image_size_1.default(this.sourceFilePath);
        var cmd = this.ffmpegBin + ' -y -i ' +
            this.sourceFilePath +
            ' -vf scale=w=' + imageDimensions.width +
            ':h=' + imageDimensions.height +
            ':force_original_aspect_ratio=decrease ' +
            this.outputFilePath;
        child_process_1.default.execSync(cmd);
    };
    ImageSqueezer.prototype.validateRequiredProperties = function () {
        if (!this.sourceFilePath) {
            throw ImageSqueezerException_1.ImageSqueezerException.emptySourceFilePath();
        }
        if (!this.outputFilePath) {
            throw ImageSqueezerException_1.ImageSqueezerException.emptyOutputFilePath();
        }
    };
    return ImageSqueezer;
}());
exports.default = ImageSqueezer;
