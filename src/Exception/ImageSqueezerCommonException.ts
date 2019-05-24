export class ImageSqueezerCommonException extends Error {

    constructor(message: string) {

        super(message);

        this.name = 'ImageSqueezerCommonException';
    }

    public static emptySourceFilePath(): ImageSqueezerCommonException  {
        
        return new ImageSqueezerCommonException('The source file path is empty.');   
    }

    public static emptyOutputFilePath(): ImageSqueezerCommonException  {
        
        return new ImageSqueezerCommonException('The output file path is empty.');   
    }
}
