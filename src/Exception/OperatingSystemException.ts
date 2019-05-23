export class OperatingSystemException extends Error {

    constructor(message: string) {

        super(message);
        
        this.name = 'OperatingSystemException';
    }

    public static isNotSupported(): OperatingSystemException {
        
        return new OperatingSystemException(
            'The current operating system is not supported. ' + 
            'Please use only WIN, Mac OS X or Linux to use this package.'
        );   
    }
}
