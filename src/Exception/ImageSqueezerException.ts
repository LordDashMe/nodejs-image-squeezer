export class ImageSqueezerException extends Error {

    constructor(message: string) {

        super(message);

        this.name = 'ImageSqueezerException';
    }

    public static emptySourceFilePath(): ImageSqueezerException  {
        
        return new ImageSqueezerException('The source file path is empty.');   
    }

    public static emptyOutputFilePath(): ImageSqueezerException  {
        
        return new ImageSqueezerException('The output file path is empty.');   
    }
}
