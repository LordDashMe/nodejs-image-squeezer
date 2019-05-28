/**
 * Image Squeezer Common Exception Class.
 *
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
export declare class ImageSqueezerCommonException extends Error {
    constructor(message: string);
    static emptySourceFilePath(): ImageSqueezerCommonException;
    static emptyOutputFilePath(): ImageSqueezerCommonException;
}
