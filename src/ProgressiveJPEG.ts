import cli from 'child_process';

import { ImageSqueezerCommon } from './ImageSqueezerCommon';

export default class ProgressiveJPEG extends ImageSqueezerCommon {

    public constructor() {
        
        super();
        this.setBin('convert');
    }

    public compress(): Promise<boolean> {

        this.validateRequiredProperties();

        let cmd = this.bin + ' ' + 
                  this.sourceFilePath + ' -interlace plane ' + 
                  this.outputFilePath;

        return new Promise((resolve, reject): void => {
            cli.exec(cmd, (error): void => {
                (error ? reject(error) : resolve(true));
            });
        });
    }
}
