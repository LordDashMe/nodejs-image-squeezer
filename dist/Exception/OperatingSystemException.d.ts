/**
 * Operating System Exception Class.
 *
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
export default class OperatingSystemException extends Error {
    constructor(message: string);
    static isNotSupported(): OperatingSystemException;
}
