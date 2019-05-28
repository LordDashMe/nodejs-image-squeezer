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
 * Operating System Exception Class.
 *
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
class OperatingSystemException extends Error {
    constructor(message) {
        super(message);
        this.name = 'OperatingSystemException';
    }
    static isNotSupported() {
        return new OperatingSystemException('The current operating system is not supported. ' +
            'Please use only WIN, Mac OS X, UNIX or Linux to use this package.');
    }
}
exports.OperatingSystemException = OperatingSystemException;
