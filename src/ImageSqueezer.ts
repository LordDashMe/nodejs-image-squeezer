import cli from 'child_process';
import imageSize from 'image-size';

import { ImageSqueezerException } from './Exception/ImageSqueezerException';
import { OperatingSystemException } from './Exception/OperatingSystemException';

export default class ImageSqueezer {

    readonly WINDOWS_OS: string = 'win32';
    readonly LINUX_OS: string = 'linux';
    readonly UNIX_OS: string = 'freebsd';
    readonly MACOSX_OS: string = 'darwin'
    
    private operatingSystem: string = '';
    private ffmpegBin: string = '';
    private sourceFilePath: string = '';
    private outputFilePath: string = '';
    
    public setOperatingSystem(operatingSystem: string) {
        
        this.operatingSystem = operatingSystem;
    }

    public load() {
        
        this.verifySupportedOperatingSystem();    
    }

    public verifySupportedOperatingSystem() {
        
        var selectedOperatingSystem = this.getOperatingSystem();

        if (selectedOperatingSystem === this.WINDOWS_OS) {
            this.ffmpegBin = this.getCurrentDir() + '/../lib/ffmpeg-20190214-f1f66df-win64-static/bin/ffmpeg.exe';
        } else if (selectedOperatingSystem === this.LINUX_OS) {
            this.ffmpegBin = this.getCurrentDir() + '/../lib/ffmpeg-4.1.1-amd64-static/ffmpeg';
        } else if (selectedOperatingSystem === this.UNIX_OS || selectedOperatingSystem === this.MACOSX_OS) {
            throw OperatingSystemException.isNotSupported(); // TODO: support in the next version.
        } else {
            throw OperatingSystemException.isNotSupported();
        }
    }

    private getOperatingSystem() {
        
        if (this.operatingSystem) {
            return this.operatingSystem;
        }

        return process.platform;
    }

    private getCurrentDir() {
        
        return __dirname;
    }

    public setFFMpegBin(ffmpegBin: string) {

        this.ffmpegBin = ffmpegBin;
    }

    public getFFMpegBin() {
        
        return this.ffmpegBin;
    }

    public setSourceFilePath(sourceFilePath: string) {
        
        this.sourceFilePath = sourceFilePath;
    }

    public setOutputFilePath(outputFilePath: string) {
        
        this.outputFilePath = outputFilePath;
    }

    public compress() {
        
        this.validateRequiredProperties();

        var imageDimensions = imageSize(this.sourceFilePath);

        var cmd = this.ffmpegBin + ' -y -i ' + 
                  this.sourceFilePath + 
                  ' -vf scale=w=' + imageDimensions.width + 
                  ':h=' + imageDimensions.height + 
                  ':force_original_aspect_ratio=decrease ' + 
                  this.outputFilePath;

        return (new Promise((resolve, reject) => {
            cli.exec(cmd, (error) => {
                (error ? reject(true) : resolve(true));
            });
        }));
    }

    private validateRequiredProperties() {
        
        if (! this.sourceFilePath) {
            throw ImageSqueezerException.emptySourceFilePath();
        }

        if (! this.outputFilePath) {
            throw ImageSqueezerException.emptyOutputFilePath();
        }
    }
}
