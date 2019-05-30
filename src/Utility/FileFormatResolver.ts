/*
 * This file is part of the Image Squeezer.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import path from 'path';
import fileType from 'file-type';
import readChunk from 'read-chunk';

import { FileTypeDetailsInterface } from './FileTypeDetailsInterface';
import { FileFormatException } from '../Exception/FileFormatException';
import { ExtensionMimeTypeInterface } from './ExtensionMimeTypeInterface';

/**
 * File Format Resolver Class.
 * 
 * The primary role of this class is to transform the details
 * of a given file path. It can be renaming of file name or changing the file extension, etc.
 * 
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
export class FileFormatResolver {

    private allowedExtensionMimeType: ExtensionMimeTypeInterface = {};
    private sourceFilePath: string = '';
    private fileNameExtension: string = '';
    private fileTypeDetails: FileTypeDetailsInterface = { ext: '', mime: '' };

    public constructor(allowedExtensionMimeType: ExtensionMimeTypeInterface) {
        
        this.allowedExtensionMimeType = allowedExtensionMimeType;
    }

    public setSourceFilePath(sourceFilePath: string): void {

        this.sourceFilePath = sourceFilePath;
    }

    public validate(): void {
        
        this.setFileNameExtension();
        this.setFileTypeDetails();
        
        if (typeof this.allowedExtensionMimeType[this.fileTypeDetails['ext']] === 'undefined') {
            throw FileFormatException.extensionIsNotSupported();
        }

        if (this.allowedExtensionMimeType[this.fileNameExtension] !== this.fileTypeDetails['mime']) {
            throw FileFormatException.extensionAndMimeTypeIsNotEqual();
        }
    }

    private setFileNameExtension(): void {
        
        const FILE_NAME_EXT = 1;
        
        let filename = path.basename(this.sourceFilePath);
        let splittedFilename = filename.split('.');

        this.fileNameExtension = splittedFilename[FILE_NAME_EXT];
    }

    private setFileTypeDetails(): void {
        
        const buffer = readChunk.sync(
            this.sourceFilePath, 0, fileType.minimumBytes
        );

        let fileTypeDetails = fileType(buffer);

        if (typeof fileTypeDetails !== 'undefined' || fileTypeDetails) {
            this.fileTypeDetails['ext'] = fileTypeDetails.ext;
            this.fileTypeDetails['mime'] = fileTypeDetails.mime;
        }
    }
}
