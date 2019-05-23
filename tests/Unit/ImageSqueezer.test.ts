import fs from 'fs';
import ImageSqueezer from '../../src/ImageSqueezer';

import { OperatingSystemException } from '../../src/Exception/OperatingSystemException';
import { ImageSqueezerException } from '../../src/Exception/ImageSqueezerException';

/**
 * Change this if the environment setup changed.
 */
function getTempBinaryFile(): string {
    return __dirname + '/../../tmp/ffmpeg-4.1.1-amd64-static/ffmpeg';
}

it('should load the image squeezer class', (): void => {
    expect(new ImageSqueezer()).toBeInstanceOf(ImageSqueezer);
});

it('should throw exception operating system not supported', (): void => {
    var imageSqueezer = new ImageSqueezer();
        imageSqueezer.setOperatingSystem('freebsd');
    
    expect(() => {
        imageSqueezer.load();
    }).toThrowError(OperatingSystemException.isNotSupported());
});

it('should throw exception operating system not supported', (): void => {
    var imageSqueezer = new ImageSqueezer();
        imageSqueezer.setOperatingSystem('unknown');
    
    expect(() => {
        imageSqueezer.load();
    }).toThrowError(OperatingSystemException.isNotSupported());
});

it('should throw exception image squeezer source file path empty', (): void => {
    var imageSqueezer = new ImageSqueezer();
        imageSqueezer.setOperatingSystem('win32');
        imageSqueezer.load();
        
    expect(() => {
        imageSqueezer.compress();
    }).toThrowError(ImageSqueezerException.emptySourceFilePath());
});

it('should throw exception image squeezer output file path empty', (): void => {
    var imageSqueezer = new ImageSqueezer();
        imageSqueezer.load();
        imageSqueezer.setSourceFilePath('/tmp/examplefile.jpg');

    expect(() => {
        imageSqueezer.compress();
    }).toThrowError(ImageSqueezerException.emptyOutputFilePath());
});

it('should reject when ffmpeg bin path is incorrect or unknown bin', async (): Promise<void> => {
    var mockDirectory = __dirname + '/../Mocks/images/';

    var imageSqueezer = new ImageSqueezer();
        imageSqueezer.load();
        imageSqueezer.setFFMpegBin('/home/00000');
        imageSqueezer.setSourceFilePath(mockDirectory + 'uncompressed.jpg');
        imageSqueezer.setOutputFilePath(mockDirectory + 'compressed.jpg');

        await imageSqueezer.compress().catch((error): void => {
            expect((error !== null)).toBe(true);
        });
});

it('should compress image', async (): Promise<void> => {
    var mockDirectory = __dirname + '/../Mocks/images/';

    var imageSqueezer = new ImageSqueezer();
        imageSqueezer.load();
        imageSqueezer.setFFMpegBin(getTempBinaryFile());
        imageSqueezer.setSourceFilePath(mockDirectory + 'uncompressed.jpg');
        imageSqueezer.setOutputFilePath(mockDirectory + 'compressed.jpg');
        
        await imageSqueezer.compress().then((resolve): void => {
            expect(fs.existsSync(mockDirectory + 'compressed.jpg')).toBe(true);
        }); 
});
