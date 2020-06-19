/*
 * This file is part of the Image Squeezer.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import ImageSqueezerCommon from './ImageSqueezerCommon';
import FileFormatResolver from './Utility/FileFormatResolver';

/**
 * Progressive JPEG Class.
 * 
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
export default class ProgressiveJPEG extends ImageSqueezerCommon {

    public constructor() {
        
        super();
        this.setSubClassType('progessive-jpeg');
        this.setBin('convert');
    }

    protected validate(): void {
        
        const allowedExtensionMimeType = {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg', 
            'png': 'image/png'
        };

        const fileFormatResolver = new FileFormatResolver(allowedExtensionMimeType);
        
        fileFormatResolver.setSourceFilePath(this.sourceFilePath);
        fileFormatResolver.validate();
    }

    protected command(): string {
        
        return this.bin + ' ' + 
               this.escapeShellArg(this.sourceFilePath) + ' -interlace plane ' +
               this.handleOutputFilePath();
    }
}
