import fs from 'fs';
import FFMPEGCompression from '../../src/FFMPEGCompression';

import { OperatingSystemException } from '../../src/Exception/OperatingSystemException';
import { ImageSqueezerCommonException } from '../../src/Exception/ImageSqueezerCommonException';

/**
 * Change this if the environment setup changed.
 */
function getTempBinaryFile(): string {
    
    return __dirname + '/../../tmp/ffmpeg-4.1.1-amd64-static/ffmpeg';
}

it('should load the image squeezer class', (): void => {
    
    expect(new FFMPEGCompression()).toBeInstanceOf(FFMPEGCompression);
});

it('should throw exception operating system not supported', (): void => {
    
    let ffmpegCompression = new FFMPEGCompression();
        ffmpegCompression.setOperatingSystem('freebsd');
    
    expect(() => {
        ffmpegCompression.load();
    }).toThrowError(OperatingSystemException.isNotSupported());
});

it('should throw exception operating system not supported', (): void => {
    
    let ffmpegCompression = new FFMPEGCompression();
        ffmpegCompression.setOperatingSystem('unknown');
    
    expect(() => {
        ffmpegCompression.load();
    }).toThrowError(OperatingSystemException.isNotSupported());
});

it('should throw exception image squeezer source file path empty', (): void => {
    
    let ffmpegCompression = new FFMPEGCompression();
        ffmpegCompression.setOperatingSystem('win32');
        ffmpegCompression.load();
        
    expect(() => {
        ffmpegCompression.compress();
    }).toThrowError(ImageSqueezerCommonException.emptySourceFilePath());
});

it('should throw exception image squeezer output file path empty', (): void => {
    
    let ffmpegCompression = new FFMPEGCompression();
        ffmpegCompression.load();
        ffmpegCompression.setSourceFilePath('/tmp/examplefile.jpg');

    expect(() => {
        ffmpegCompression.compress();
    }).toThrowError(ImageSqueezerCommonException.emptyOutputFilePath());
});

it('should reject when ffmpeg bin path is incorrect or unknown bin', async (): Promise<void> => {
    
    let mockDirectory = __dirname + '/../Mocks/images/';

    let ffmpegCompression = new FFMPEGCompression();
        ffmpegCompression.load();
        ffmpegCompression.setBin('/home/00000');
        ffmpegCompression.setSourceFilePath(mockDirectory + 'uncompressed.jpg');
        ffmpegCompression.setOutputFilePath(mockDirectory + 'compressed.jpg');

        await ffmpegCompression.compress().catch((error): void => {
            expect((error !== null)).toBe(true);
        });
});

it('should allow empty output file path and used the current source path', async (): Promise<void> => {
    
    let mockDirectory = __dirname + '/../Mocks/images/';

    let ffmpegCompression = new FFMPEGCompression();
        ffmpegCompression.load();
        ffmpegCompression.setBin(getTempBinaryFile());
        ffmpegCompression.setSourceFilePath(mockDirectory + 'uncompressed-replace.jpg');
        ffmpegCompression.allowEmptyOutputFilePath();

        await ffmpegCompression.compress().then((resolve): void => {
            expect(fs.existsSync(mockDirectory + 'uncompressed-replace.jpg')).toBe(true);
        }); 
});

it('should compress image', async (): Promise<void> => {
    
    let mockDirectory = __dirname + '/../Mocks/images/';

    let ffmpegCompression = new FFMPEGCompression();
        ffmpegCompression.load();
        ffmpegCompression.setBin(getTempBinaryFile());
        ffmpegCompression.setSourceFilePath(mockDirectory + 'uncompressed.jpg');
        ffmpegCompression.setOutputFilePath(mockDirectory + 'compressed.jpg');
        
        await ffmpegCompression.compress().then((resolve): void => {
            expect(fs.existsSync(mockDirectory + 'compressed.jpg')).toBe(true);
        }); 
});
