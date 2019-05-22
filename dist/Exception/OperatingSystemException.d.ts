export declare class OperatingSystemException extends Error {
    constructor(message: string);
    static isNotSupported(): OperatingSystemException;
}
