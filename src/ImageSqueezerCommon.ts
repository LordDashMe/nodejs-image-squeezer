import path from 'path';
import { ImageSqueezerCommonException } from './Exception/ImageSqueezerCommonException';

export class ImageSqueezerCommon {

    protected subClassType: string = '';

    protected bin: string = '';
    protected sourceFilePath: string = '';
    protected outputFilePath: string = ''; 
    protected isAllowedEmptyOutputFilePath: boolean = false;
    
    protected setSubClassType(subClassType: string): void {

        this.subClassType = subClassType;
    }

    public setBin(bin: string): void {

        this.bin = bin;
    }

    public setSourceFilePath(sourceFilePath: string): void {
        
        this.sourceFilePath = sourceFilePath;
    }

    public setOutputFilePath(outputFilePath: string): void {
        
        this.outputFilePath = outputFilePath;
    }

    public allowEmptyOutputFilePath(): void {
        
        this.isAllowedEmptyOutputFilePath = true;
    }

    protected validateRequiredProperties(): void {
        
        if (! this.sourceFilePath) {
            throw ImageSqueezerCommonException.emptySourceFilePath();
        }

        if (! this.outputFilePath) {
            throw ImageSqueezerCommonException.emptyOutputFilePath();
        }
    }

    protected transferSouceFilePathToOutputFilePath(): void {
        
        if (this.isAllowedEmptyOutputFilePath) {
            this.outputFilePath = this.sourceFilePath;
        }
    }

    protected handleOutputFilePath(): string {

        if (this.isAllowedEmptyOutputFilePath) {
            return this.generateTemporaryOutputFilePath();
        } else {
            return this.escapeShellArg(this.outputFilePath);
        }
    }

    protected generateTemporaryOutputFilePath(): string {

        let filename = path.basename(this.outputFilePath);
        let splittedFilename = filename.split('.');
        
        let newFilename = splittedFilename[0] + '-compressed-' + this.subClassType + '.' + splittedFilename[1];
        let newBasename = this.escapeShellArg(
            this.outputFilePath.replace(filename, newFilename)
        );

        return newBasename + ' && mv ' + 
               newBasename + ' ' + this.escapeShellArg(this.outputFilePath);
    }

    protected escapeShellArg(arg: string): string {
        
        return `'${arg.replace(/'/g, `'\\''`)}'`;
    }
}
