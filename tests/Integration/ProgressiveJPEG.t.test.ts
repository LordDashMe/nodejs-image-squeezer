import fs from 'fs';

import ProgressiveJPEG from '../../src/ProgressiveJPEG';

function getMockDiretory(path: string): string {
    
    return __dirname + '/../Mocks/' + path;
}

it('should compress image', async (): Promise<void> => {
    
    const mockDirectory = getMockDiretory('images/');

    const compression = new ProgressiveJPEG();
        
    compression.load();
    compression.setSourceFilePath(mockDirectory + 'uncompressed-imgck.jpg');
    compression.setOutputFilePath(mockDirectory + 'compressed-imgck.jpg');
    compression.build();
        
    await compression.compress();

    expect(fs.existsSync(mockDirectory + 'compressed-imgck.jpg')).toBe(true);
});
