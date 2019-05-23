import cli from 'child_process';
import imageSize from 'image-size';

import { ImageSqueezerException } from './Exception/ImageSqueezerException';
import { OperatingSystemException } from './Exception/OperatingSystemException';

export default class ImageSqueezer {

    public static readonly WINDOWS_OS: string = 'win32';
    public static readonly LINUX_OS: string = 'linux';
    public static readonly UNIX_OS: string = 'freebsd';
    public static readonly MACOSX_OS: string = 'darwin'
    
    private operatingSystem: string = '';
    private ffmpegBin: string = '';
    private sourceFilePath: string = '';
    private outputFilePath: string = '';
    
    public setOperatingSystem(operatingSystem: string): void {

        this.operatingSystem = operatingSystem;
    }

    public load(): void {
        
        this.verifySupportedOperatingSystem();    
    }

    public verifySupportedOperatingSystem(): void {
        
        var selectedOperatingSystem = this.getOperatingSystem();

        switch (selectedOperatingSystem) {
            case ImageSqueezer.WINDOWS_OS:
            case ImageSqueezer.LINUX_OS:
                break;
            case ImageSqueezer.UNIX_OS:
            case ImageSqueezer.MACOSX_OS:
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

    public setFFMpegBin(ffmpegBin: string): void {

        this.ffmpegBin = ffmpegBin;
    }

    public setSourceFilePath(sourceFilePath: string): void {
        
        this.sourceFilePath = sourceFilePath;
    }

    public setOutputFilePath(outputFilePath: string): void {
        
        this.outputFilePath = outputFilePath;
    }

    public compress(): Promise<boolean> {
        
        this.validateRequiredProperties();

        var imageDimensions = imageSize(this.sourceFilePath);

        var cmd = this.ffmpegBin + ' -y -i ' + 
                  this.sourceFilePath + 
                  ' -vf scale=w=' + imageDimensions.width + 
                  ':h=' + imageDimensions.height + 
                  ':force_original_aspect_ratio=decrease ' + 
                  this.outputFilePath;

        return (new Promise((resolve, reject): void => {
            cli.exec(cmd, (error): void => {
                (error ? reject(error) : resolve(true));
            });
        }));
    }

    private validateRequiredProperties(): void {
        
        if (! this.sourceFilePath) {
            throw ImageSqueezerException.emptySourceFilePath();
        }

        if (! this.outputFilePath) {
            throw ImageSqueezerException.emptyOutputFilePath();
        }
    }
}
