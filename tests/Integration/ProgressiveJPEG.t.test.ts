import fs from 'fs';

import { ProgressiveJPEG } from '../../src/ProgressiveJPEG';

function getMockDiretory(path: string): string {
    
    return __dirname + '/../Mocks/' + path;
}

it('should load the main class', (): void => {
    
    expect(new ProgressiveJPEG()).toBeInstanceOf(ProgressiveJPEG);
});

it('should compress image', async (): Promise<void> => {
    
    let mockDirectory = getMockDiretory('images/');

    let compression = new ProgressiveJPEG();
        
        compression.load();
        compression.setSourceFilePath(mockDirectory + 'uncompressed-imgck.jpg');
        compression.setOutputFilePath(mockDirectory + 'compressed-imgck.jpg');
        compression.build();
        
    await compression.compress().then((resolve): void => {
        expect(fs.existsSync(mockDirectory + 'compressed-imgck.jpg')).toBe(true);
    }); 
});
