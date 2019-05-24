import { ImageSqueezerCommonException } from './Exception/ImageSqueezerCommonException';

export class ImageSqueezerCommon {

    protected bin: string = '';
    protected sourceFilePath: string = '';
    protected outputFilePath: string = ''; 
    
    public setBin(bin: string): void {

        this.bin = bin;
    }

    public setSourceFilePath(sourceFilePath: string): void {
        
        this.sourceFilePath = sourceFilePath;
    }

    public setOutputFilePath(outputFilePath: string): void {
        
        this.outputFilePath = outputFilePath;
    }

    protected validateRequiredProperties(): void {
        
        if (! this.sourceFilePath) {
            throw ImageSqueezerCommonException.emptySourceFilePath();
        }

        if (! this.outputFilePath) {
            throw ImageSqueezerCommonException.emptyOutputFilePath();
        }
    }
}
