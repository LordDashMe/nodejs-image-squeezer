/*
 * This file is part of the Image Squeezer.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ImageSqueezerCommon } from './ImageSqueezerCommon';

/**
 * Progressive JPEG Class.
 * 
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
export class ProgressiveJPEG extends ImageSqueezerCommon {

    public constructor() {
        
        super();
        this.setSubClassType('progessive-jpeg');
        this.setBin('convert');
    }

    protected command(): string {
        
        let cmd = this.bin + ' ' + 
                  this.sourceFilePath + ' -interlace plane ' +
                  this.handleOutputFilePath();

        return cmd;
    }
}
