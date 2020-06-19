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
const ImageSqueezerCommon_1 = __importDefault(require("./ImageSqueezerCommon"));
const FileFormatResolver_1 = __importDefault(require("./Utility/FileFormatResolver"));
/**
 * FFMPEG Compression Class.
 *
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
class FFMPEGCompression extends ImageSqueezerCommon_1.default {
    constructor() {
        super();
        this.currentFileMimeType = '';
        this.compressionLevel = { jpeg: '100', png: '100' };
        this.setSubClassType('ffmpeg-compression');
        this.setBin('ffmpeg');
    }
    setCompressionLevel(compressionLevel) {
        switch (compressionLevel) {
            case FFMPEGCompression.COMPRESSION_LEVEL_LOW:
                this.compressionLevel['jpeg'] = '2';
                this.compressionLevel['png'] = '1';
                break;
            case FFMPEGCompression.COMPRESSION_LEVEL_NORMAL:
                this.compressionLevel['jpeg'] = '6';
                this.compressionLevel['png'] = '3';
                break;
            case FFMPEGCompression.COMPRESSION_LEVEL_HIGH:
            default:
                this.compressionLevel['jpeg'] = '100';
                this.compressionLevel['png'] = '100';
        }
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
        this.currentFileMimeType = fileFormatResolver.getMimeType();
    }
    command() {
        const imageDimensions = image_size_1.default(this.sourceFilePath);
        return this.bin + ' -y -i ' +
            this.escapeShellArg(this.sourceFilePath) +
            ' -vf scale=w=' + imageDimensions.width +
            ':h=' + imageDimensions.height +
            ':force_original_aspect_ratio=decrease:interl=1 ' +
            this.compressionType() +
            this.handleOutputFilePath();
    }
    compressionType() {
        switch (this.currentFileMimeType) {
            case 'image/png':
                return this.compressionCommandForPNGFormat();
            case 'image/jpeg':
            default:
                return this.compressionCommandForJPEGFormat();
        }
    }
    compressionCommandForJPEGFormat() {
        return '-qscale:v ' + this.compressionLevel['jpeg'] + ' ';
    }
    compressionCommandForPNGFormat() {
        return '-compression_level ' + this.compressionLevel['png'] + ' ';
    }
}
exports.default = FFMPEGCompression;
FFMPEGCompression.COMPRESSION_LEVEL_LOW = 1;
FFMPEGCompression.COMPRESSION_LEVEL_NORMAL = 2;
FFMPEGCompression.COMPRESSION_LEVEL_HIGH = 3;
