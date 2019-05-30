"use strict";
/*
 * This file is part of the Image Squeezer.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const ImageSqueezerCommon_1 = require("./ImageSqueezerCommon");
const FileFormatResolver_1 = require("./Utility/FileFormatResolver");
/**
 * Progressive JPEG Class.
 *
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
class ProgressiveJPEG extends ImageSqueezerCommon_1.ImageSqueezerCommon {
    constructor() {
        super();
        this.setSubClassType('progessive-jpeg');
        this.setBin('convert');
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
        return this.bin + ' ' +
            this.escapeShellArg(this.sourceFilePath) + ' -interlace plane ' +
            this.handleOutputFilePath();
    }
}
exports.ProgressiveJPEG = ProgressiveJPEG;
