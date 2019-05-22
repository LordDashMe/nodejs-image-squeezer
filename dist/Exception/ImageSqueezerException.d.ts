export declare class ImageSqueezerException extends Error {
    constructor(message: string);
    static emptySourceFilePath(): ImageSqueezerException;
    static emptyOutputFilePath(): ImageSqueezerException;
}
