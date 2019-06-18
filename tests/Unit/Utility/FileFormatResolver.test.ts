import { FileFormatResolver } from '../../../src/Utility/FileFormatResolver';
import { FileFormatException } from '../../../src/Exception/FileFormatException';

function getMockDiretory(path: string): string {
    
    return __dirname + '/../../Mocks/' + path;
}

it('should load the main class', (): void => {

    expect(new FileFormatResolver({})).toBeInstanceOf(FileFormatResolver);
});

it('should throw exception when the file content mime type is not allowed or supported', (): void => {

    let imageMockDirectory = getMockDiretory('images/');

    let allowedExtensionMimeType = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg', 
        'png': 'image/png'
    };

    let fileFormatResolver = new FileFormatResolver(allowedExtensionMimeType);
        fileFormatResolver.setSourceFilePath(imageMockDirectory + 'mock-file.txt');
        
    expect(() => { fileFormatResolver.validate(); }).toThrowError(FileFormatException.extensionIsNotSupported());
});

it('should throw exception when the file name extension is not equal to the actual file content mime type', (): void => {

    let imageMockDirectory = getMockDiretory('images/');

    let allowedExtensionMimeType = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg', 
        'png': 'image/png'
    };

    let fileFormatResolver = new FileFormatResolver(allowedExtensionMimeType);
        fileFormatResolver.setSourceFilePath(imageMockDirectory + 'mock-jpeg.png');
        
    expect(() => { fileFormatResolver.validate(); }).toThrowError(FileFormatException.extensionAndMimeTypeIsNotEqual());
});

it('should pass the validation', (): void => {

    let imageMockDirectory = getMockDiretory('images/');

    let allowedExtensionMimeType = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg', 
        'png': 'image/png'
    };

    let fileFormatResolver = new FileFormatResolver(allowedExtensionMimeType);
        fileFormatResolver.setSourceFilePath(imageMockDirectory + 'uncompressed.jpg');
        fileFormatResolver.validate();

    expect(true).toBe(true);
});

it('should return the current file mime type', (): void => {

    let imageMockDirectory = getMockDiretory('images/');

    let allowedExtensionMimeType = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg', 
        'png': 'image/png'
    };

    let fileFormatResolver = new FileFormatResolver(allowedExtensionMimeType);
        fileFormatResolver.setSourceFilePath(imageMockDirectory + 'uncompressed.jpg');
        fileFormatResolver.validate();

    expect(fileFormatResolver.getMimeType()).toBe('image/jpeg');
});
