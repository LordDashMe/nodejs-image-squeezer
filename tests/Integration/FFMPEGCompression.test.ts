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
