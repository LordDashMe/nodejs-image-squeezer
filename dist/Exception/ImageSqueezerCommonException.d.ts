export declare class ImageSqueezerCommonException extends Error {
    constructor(message: string);
    static emptySourceFilePath(): ImageSqueezerCommonException;
    static emptyOutputFilePath(): ImageSqueezerCommonException;
}
