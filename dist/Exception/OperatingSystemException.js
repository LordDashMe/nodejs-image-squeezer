"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
