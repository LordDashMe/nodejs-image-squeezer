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
const path_1 = __importDefault(require("path"));
const file_type_1 = __importDefault(require("file-type"));
const read_chunk_1 = __importDefault(require("read-chunk"));
const FileFormatException_1 = __importDefault(require("../Exception/FileFormatException"));
/**
 * File Format Resolver Class.
 *
 * The primary role of this class is to transform the details
 * of a given file path. It can be renaming of file name or changing the file extension, etc.
 *
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
class FileFormatResolver {
    constructor(allowedExtensionMimeType) {
        this.allowedExtensionMimeType = {};
        this.sourceFilePath = '';
        this.fileNameExtension = '';
        this.fileTypeDetails = { ext: '', mime: '' };
        this.allowedExtensionMimeType = allowedExtensionMimeType;
    }
    setSourceFilePath(sourceFilePath) {
        this.sourceFilePath = sourceFilePath;
    }
    validate() {
        this.setFileNameExtension();
        this.setFileTypeDetails();
        if (typeof this.allowedExtensionMimeType[this.fileTypeDetails['ext']] === 'undefined') {
            throw FileFormatException_1.default.extensionIsNotSupported();
        }
        if (this.allowedExtensionMimeType[this.fileNameExtension] !== this.fileTypeDetails['mime']) {
            throw FileFormatException_1.default.extensionAndMimeTypeIsNotEqual();
        }
    }
    setFileNameExtension() {
        const FILE_NAME_EXT = 1;
        const filename = path_1.default.basename(this.sourceFilePath);
        const splittedFilename = filename.split('.');
        this.fileNameExtension = splittedFilename[FILE_NAME_EXT];
    }
    setFileTypeDetails() {
        const buffer = read_chunk_1.default.sync(this.sourceFilePath, 0, file_type_1.default.minimumBytes);
        const fileTypeDetails = file_type_1.default(buffer);
        if (typeof fileTypeDetails !== 'undefined' || fileTypeDetails) {
            this.fileTypeDetails['ext'] = fileTypeDetails.ext;
            this.fileTypeDetails['mime'] = fileTypeDetails.mime;
        }
    }
    getMimeType() {
        return this.fileTypeDetails['mime'];
    }
}
exports.default = FileFormatResolver;
