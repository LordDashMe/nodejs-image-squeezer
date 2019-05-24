import cli from 'child_process';

import { ImageSqueezerCommon } from './ImageSqueezerCommon';
import { ProgressiveJPEGException } from './Exception/ProgressiveJPEGException';

export default class ProgressiveJPEG extends ImageSqueezerCommon {

    public constructor() {
        
        super();
        this.setBin('convert');
    }

    public load(): void {
        
        this.verifyRequiredDependencies();
    }

    private verifyRequiredDependencies(): void {

        try {
            cli.execSync(this.bin + ' -version', {stdio: [0]}).toString();
        } catch (error) {
            throw ProgressiveJPEGException.requiredDependenciesNotInstalled();
        }
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
