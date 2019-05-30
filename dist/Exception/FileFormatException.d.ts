/**
 * File Format Exception Class.
 *
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
export declare class FileFormatException extends Error {
    constructor(message: string);
    static extensionIsNotSupported(): FileFormatException;
    static extensionAndMimeTypeIsNotEqual(): FileFormatException;
}
