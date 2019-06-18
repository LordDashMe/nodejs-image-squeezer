import { ExtensionMimeTypeInterface } from './ExtensionMimeTypeInterface';
/**
 * File Format Resolver Class.
 *
 * The primary role of this class is to transform the details
 * of a given file path. It can be renaming of file name or changing the file extension, etc.
 *
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
export declare class FileFormatResolver {
    private allowedExtensionMimeType;
    private sourceFilePath;
    private fileNameExtension;
    private fileTypeDetails;
    constructor(allowedExtensionMimeType: ExtensionMimeTypeInterface);
    setSourceFilePath(sourceFilePath: string): void;
    validate(): void;
    private setFileNameExtension;
    private setFileTypeDetails;
    getMimeType(): string;
}
