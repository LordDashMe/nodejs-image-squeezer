export class ImageSqueezerException extends Error {

    constructor(message: string) {

        super(message);

        this.name = 'ImageSqueezerException';
    }

    public static emptySourceFilePath() {
        
        return new ImageSqueezerException('The source file path is empty.');   
    }

    public static emptyOutputFilePath() {
        
        return new ImageSqueezerException('The output file path is empty.');   
    }
}
