import { ImageSqueezerCommon } from './ImageSqueezerCommon';

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
