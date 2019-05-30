import { FileFormatResolver } from '../../../src/Utility/FileFormatResolver';
import { FileFormatException } from '../../../src/Exception/FileFormatException';

function getMockDiretory(path: string): string {
    
    return __dirname + '/../../Mocks/' + path;
}

it('should load the main class', (): void => {

    expect(new FileFormatResolver({})).toBeInstanceOf(FileFormatResolver);
});

it('should validate the allowed file format', (): void => {

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

it('should validate the allowed file format', (): void => {

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
