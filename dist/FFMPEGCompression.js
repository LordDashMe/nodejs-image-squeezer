"use strict";
/*
 * This file is part of the Image Squeezer.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_size_1 = __importDefault(require("image-size"));
const ImageSqueezerCommon_1 = require("./ImageSqueezerCommon");
const FileFormatResolver_1 = require("./Utility/FileFormatResolver");
/**
 * FFMPEG Compression Class.
 *
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
class FFMPEGCompression extends ImageSqueezerCommon_1.ImageSqueezerCommon {
    constructor() {
        super();
        this.setSubClassType('ffmpeg-compression');
        this.setBin('ffmpeg');
    }
    validate() {
        let allowedExtensionMimeType = {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png'
        };
        let fileFormatResolver = new FileFormatResolver_1.FileFormatResolver(allowedExtensionMimeType);
        fileFormatResolver.setSourceFilePath(this.sourceFilePath);
        fileFormatResolver.validate();
    }
    command() {
        let imageDimensions = image_size_1.default(this.sourceFilePath);
        return this.bin + ' -y -i ' +
            this.escapeShellArg(this.sourceFilePath) +
            ' -vf scale=w=' + imageDimensions.width +
            ':h=' + imageDimensions.height +
            ':force_original_aspect_ratio=decrease:interl=1 ' +
            this.handleOutputFilePath();
    }
}
exports.FFMPEGCompression = FFMPEGCompression;
