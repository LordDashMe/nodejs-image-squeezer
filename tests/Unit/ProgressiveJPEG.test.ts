import fs from 'fs';
import ProgressiveJPEG from '../../src/ProgressiveJPEG';

import { ImageSqueezerCommonException } from '../../src/Exception/ImageSqueezerCommonException';

it('should load the image squeezer class', (): void => {
    
    expect(new ProgressiveJPEG()).toBeInstanceOf(ProgressiveJPEG);
});

it('should throw exception image squeezer source file path empty', (): void => {
    
    let progressiveJPEG = new ProgressiveJPEG();
        
    expect(() => {
        progressiveJPEG.compress();
    }).toThrowError(ImageSqueezerCommonException.emptySourceFilePath());
});

it('should throw exception image squeezer output file path empty', (): void => {
    
    let progressiveJPEG = new ProgressiveJPEG();
        progressiveJPEG.setSourceFilePath('/tmp/examplefile.jpg');

    expect(() => {
        progressiveJPEG.compress();
    }).toThrowError(ImageSqueezerCommonException.emptyOutputFilePath());
});

it('should reject when the source file path is invalid or not found', async (): Promise<void> => {
    
    let mockDirectory = __dirname + '/../Mocks/images/';

    let progressiveJPEG = new ProgressiveJPEG();
        progressiveJPEG.setSourceFilePath(mockDirectory + 'unknown-imgck.jpg');
        progressiveJPEG.setOutputFilePath(mockDirectory + 'compressed-imgck-prog.jpg');
        
        await progressiveJPEG.compress().catch((error): void => {
            expect((error !== null)).toBe(true);
        });
});

it('should compress image', async (): Promise<void> => {
    
    let mockDirectory = __dirname + '/../Mocks/images/';

    let progressiveJPEG = new ProgressiveJPEG();
        progressiveJPEG.setSourceFilePath(mockDirectory + 'compressed-imgck.jpg');
        progressiveJPEG.setOutputFilePath(mockDirectory + 'compressed-imgck-prog.jpg');
        
        await progressiveJPEG.compress().then((resolve): void => {
            expect(fs.existsSync(mockDirectory + 'compressed-imgck-prog.jpg')).toBe(true);
        }); 
});
