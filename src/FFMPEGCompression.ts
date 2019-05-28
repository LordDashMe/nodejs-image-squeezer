/*
 * This file is part of the Image Squeezer.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import imageSize from 'image-size';

import { ImageSqueezerCommon } from './ImageSqueezerCommon';

/**
 * FFMPEG Compression Class.
 * 
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
export class FFMPEGCompression extends ImageSqueezerCommon {

    public constructor() {

        super();
        this.setSubClassType('ffmpeg-compression');
        this.setBin('ffmpeg');
    }
    
    protected command(): string {

        let imageDimensions = imageSize(this.sourceFilePath);

        let cmd = this.bin + ' -y -i ' + 
                  this.escapeShellArg(this.sourceFilePath) + 
                  ' -vf scale=w=' + imageDimensions.width + 
                  ':h=' + imageDimensions.height + 
                  ':force_original_aspect_ratio=decrease:interl=1 ' +
                  this.handleOutputFilePath();

        return cmd;
    }
}
