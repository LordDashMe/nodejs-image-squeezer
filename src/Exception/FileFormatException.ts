/*
 * This file is part of the Image Squeezer.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * File Format Exception Class.
 * 
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
export class FileFormatException extends Error {

    constructor(message: string) {

        super(message);
        this.name = 'FileFormatException';
    }

    public static extensionIsNotSupported(): FileFormatException {

        return new FileFormatException(
            'The current file extension is not supported. Use only png, jpg, or jpeg.'
        );
    }

    public static extensionAndMimeTypeIsNotEqual(): FileFormatException {

        return new FileFormatException(
            'The file name extension is not equal to the actual file content mime type.'
        );
    }
}
