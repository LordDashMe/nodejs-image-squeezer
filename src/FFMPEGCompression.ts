import imageSize from 'image-size';

import { ImageSqueezerCommon } from './ImageSqueezerCommon';

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
