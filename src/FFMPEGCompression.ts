import path from 'path';
import cli from 'child_process';
import imageSize from 'image-size';

import { ImageSqueezerCommon } from './ImageSqueezerCommon';
import { OperatingSystemException } from './Exception/OperatingSystemException';

export default class FFMPEGCompression extends ImageSqueezerCommon {

    public static readonly WINDOWS_OS: string = 'win32';
    public static readonly LINUX_OS: string = 'linux';
    public static readonly UNIX_OS: string = 'freebsd';
    public static readonly MACOSX_OS: string = 'darwin'
    
    private operatingSystem: string = '';
    private isAllowedEmptyOutputFilePath: boolean = false;
    
    public setOperatingSystem(operatingSystem: string): void {

        this.operatingSystem = operatingSystem;
    }

    public load(): void {
        
        this.verifySupportedOperatingSystem();    
    }

    public verifySupportedOperatingSystem(): void {
        
        let selectedOperatingSystem = this.getOperatingSystem();

        switch (selectedOperatingSystem) {
            case FFMPEGCompression.WINDOWS_OS:
            case FFMPEGCompression.LINUX_OS:
                break;
            case FFMPEGCompression.UNIX_OS:
            case FFMPEGCompression.MACOSX_OS:
            default:
                throw OperatingSystemException.isNotSupported();
        }
    }

    private getOperatingSystem(): string {
        
        if (this.operatingSystem) {
            return this.operatingSystem;
        }

        return process.platform;
    }

    public allowEmptyOutputFilePath(): void {
        
        this.isAllowedEmptyOutputFilePath = true;
    }

    public compress(): Promise<boolean> {
        
        this.transferSouceFilePathToOutputFilePath();
        this.validateRequiredProperties();

        let imageDimensions = imageSize(this.sourceFilePath);

        let cmd = this.bin + ' -y -i ' + 
                  this.escapeShellArg(this.sourceFilePath) + 
                  ' -vf scale=w=' + imageDimensions.width + 
                  ':h=' + imageDimensions.height + 
                  ':force_original_aspect_ratio=decrease:interl=1 ';

        cmd += this.handleOutputFilePath();

        return (new Promise((resolve, reject): void => {
            cli.exec(cmd, (error): void => {
                (error ? reject(error) : resolve(true));
            });
        }));
    }

    private transferSouceFilePathToOutputFilePath(): void {
        
        if (this.isAllowedEmptyOutputFilePath) {
            this.outputFilePath = this.sourceFilePath;
        }
    }

    private handleOutputFilePath(): string {

        if (this.isAllowedEmptyOutputFilePath) {
            return this.generateTemporaryOutputFilePath();
        } else {
            return this.escapeShellArg(this.outputFilePath);
        }
    }

    private generateTemporaryOutputFilePath(): string {

        let filename = path.basename(this.outputFilePath);
        let splittedFilename = filename.split('.');
        
        let newFilename = splittedFilename[0] + '-compressed.' + splittedFilename[1];
        let newBasename = this.escapeShellArg(
            this.outputFilePath.replace(filename, newFilename)
        );

        return newBasename + ' && mv ' + 
               newBasename + ' ' + this.escapeShellArg(this.outputFilePath);
    }

    private escapeShellArg(arg: string): string {
        
        return `'${arg.replace(/'/g, `'\\''`)}'`;
    }
}
