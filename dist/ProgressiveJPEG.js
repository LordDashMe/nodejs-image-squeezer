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
const ImageSqueezerCommon_1 = __importDefault(require("./ImageSqueezerCommon"));
const FileFormatResolver_1 = __importDefault(require("./Utility/FileFormatResolver"));
/**
 * Progressive JPEG Class.
 *
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
class ProgressiveJPEG extends ImageSqueezerCommon_1.default {
    constructor() {
        super();
        this.setSubClassType('progessive-jpeg');
        this.setBin('convert');
    }
    validate() {
        const allowedExtensionMimeType = {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png'
        };
        const fileFormatResolver = new FileFormatResolver_1.default(allowedExtensionMimeType);
        fileFormatResolver.setSourceFilePath(this.sourceFilePath);
        fileFormatResolver.validate();
    }
    command() {
        return this.bin + ' ' +
            this.escapeShellArg(this.sourceFilePath) + ' -interlace plane ' +
            this.handleOutputFilePath();
    }
}
exports.default = ProgressiveJPEG;
