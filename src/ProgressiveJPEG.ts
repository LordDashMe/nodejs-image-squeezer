import cli from 'child_process';

import { ImageSqueezerCommon } from './ImageSqueezerCommon';

export default class ProgressiveJPEG extends ImageSqueezerCommon {

    public constructor() {
        
        super();
        this.setSubClassType('progessive-jpeg');
        this.setBin('convert');
    }

    public compress(): Promise<boolean> {

        this.transferSouceFilePathToOutputFilePath();
        this.validateRequiredProperties();

        let cmd = this.bin + ' ' + 
                  this.sourceFilePath + ' -interlace plane ';
            
        cmd += this.handleOutputFilePath();

        return new Promise((resolve, reject): void => {
            cli.exec(cmd, (error): void => {
                (error ? reject(error) : resolve(true));
            });
        });
    }
}
