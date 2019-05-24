export class ProgressiveJPEGException extends Error {

    constructor(message: string) {

        super(message);

        this.name = 'ProgressiveJPEGException';
    }

    public static requiredDependenciesNotInstalled(): ProgressiveJPEGException  {
        
        return new ProgressiveJPEGException('The required dependencies not installed in the current system. (ie. Image Magick)');   
    }
}
