import fs from 'fs';

import { FFMPEGCompression } from '../../src/FFMPEGCompression';

/**
 * Change this if the environment setup changed.
 */
function getTempBinaryFile(): string {
    
    return __dirname + '/../../tmp/ffmpeg-4.1.1-amd64-static/ffmpeg';
}

function getMockDiretory(path: string): string {
    
    return __dirname + '/../Mocks/' + path;
}

it('should load the main class', (): void => {
    
    expect(new FFMPEGCompression()).toBeInstanceOf(FFMPEGCompression);
});

it('should compress image', async (): Promise<void> => {
    
    let mockDirectory = getMockDiretory('images/');

    let compression = new FFMPEGCompression();
        
        compression.load();
        compression.setBin(getTempBinaryFile());
        compression.setSourceFilePath(mockDirectory + 'uncompressed.jpg');
        compression.setOutputFilePath(mockDirectory + 'compressed.jpg');
        compression.build();
        
    await compression.compress().then((resolve): void => {
        expect(fs.existsSync(mockDirectory + 'compressed.jpg')).toBe(true);
    }); 
});

it('should compress jpeg image format with compression level', async (): Promise<void> => {
    
    let mockDirectory = getMockDiretory('images/');

    let compression = new FFMPEGCompression();
        
        compression.load();
        compression.setBin(getTempBinaryFile());
        compression.setSourceFilePath(mockDirectory + 'uncompressed-compression-controlled.jpg');
        compression.setOutputFilePath(mockDirectory + 'compressed-compression-controlled.jpg');
        compression.setCompressionLevel(FFMPEGCompression.COMPRESSION_LEVEL_LOW);
        compression.build();
        
    await compression.compress().then((resolve): void => {
        expect(fs.existsSync(mockDirectory + 'compressed-compression-controlled.jpg')).toBe(true);
    }); 
});

it('should compress png image format with compression level', async (): Promise<void> => {
    
    let mockDirectory = getMockDiretory('images/');

    let compression = new FFMPEGCompression();
        
        compression.load();
        compression.setBin(getTempBinaryFile());
        compression.setSourceFilePath(mockDirectory + 'uncompressed-compression-controlled.png');
        compression.setOutputFilePath(mockDirectory + 'compressed-compression-controlled.png');
        compression.setCompressionLevel(FFMPEGCompression.COMPRESSION_LEVEL_LOW);
        compression.build();
        
    await compression.compress().then((resolve): void => {
        expect(fs.existsSync(mockDirectory + 'compressed-compression-controlled.png')).toBe(true);
    }); 
});

it('should compress image with low compression level', async (): Promise<void> => {
    
    let mockDirectory = getMockDiretory('images/');

    let compression = new FFMPEGCompression();
        
        compression.load();
        compression.setBin(getTempBinaryFile());
        compression.setSourceFilePath(mockDirectory + 'uncompressed.jpg');
        compression.setOutputFilePath(mockDirectory + 'compressed-cl-low.jpg');
        compression.setCompressionLevel(FFMPEGCompression.COMPRESSION_LEVEL_LOW);
        compression.build();
        
    await compression.compress().then((resolve): void => {
        expect(fs.existsSync(mockDirectory + 'compressed-cl-low.jpg')).toBe(true);
    }); 
});

it('should compress image with normal compression level', async (): Promise<void> => {
    
    let mockDirectory = getMockDiretory('images/');

    let compression = new FFMPEGCompression();
        
        compression.load();
        compression.setBin(getTempBinaryFile());
        compression.setSourceFilePath(mockDirectory + 'uncompressed.jpg');
        compression.setOutputFilePath(mockDirectory + 'compressed-cl-normal.jpg');
        compression.setCompressionLevel(FFMPEGCompression.COMPRESSION_LEVEL_NORMAL);
        compression.build();
        
    await compression.compress().then((resolve): void => {
        expect(fs.existsSync(mockDirectory + 'compressed-cl-normal.jpg')).toBe(true);
    }); 
});

it('should compress image with high compression level', async (): Promise<void> => {
    
    let mockDirectory = getMockDiretory('images/');

    let compression = new FFMPEGCompression();
        
        compression.load();
        compression.setBin(getTempBinaryFile());
        compression.setSourceFilePath(mockDirectory + 'uncompressed.jpg');
        compression.setOutputFilePath(mockDirectory + 'compressed-cl-high.jpg');
        compression.setCompressionLevel(FFMPEGCompression.COMPRESSION_LEVEL_HIGH);
        compression.build();
        
    await compression.compress().then((resolve): void => {
        expect(fs.existsSync(mockDirectory + 'compressed-cl-high.jpg')).toBe(true);
    }); 
});
