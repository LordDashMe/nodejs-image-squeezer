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
/**
 * File Format Exception Class.
 *
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
class FileFormatException extends Error {
    constructor(message) {
        super(message);
        this.name = 'FileFormatException';
    }
    static extensionIsNotSupported() {
        return new FileFormatException('The current file extension is not supported. Use only png, jpg, or jpeg.');
    }
    static extensionAndMimeTypeIsNotEqual() {
        return new FileFormatException('The file name extension is not equal to the actual file content mime type.');
    }
}
exports.FileFormatException = FileFormatException;
