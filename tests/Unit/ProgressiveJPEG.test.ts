import fs from 'fs';
import ProgressiveJPEG from '../../src/ProgressiveJPEG';

import { ProgressiveJPEGException } from '../../src/Exception/ProgressiveJPEGException';
import { ImageSqueezerCommonException } from '../../src/Exception/ImageSqueezerCommonException';

it('should load the image squeezer class', (): void => {
    
    expect(new ProgressiveJPEG()).toBeInstanceOf(ProgressiveJPEG);
});

it('should throw exception if image magick package not installed in the system', (): void => {
    
    let progressiveJPEG = new ProgressiveJPEG();
        progressiveJPEG.setBin('imagemagick-mock');

    expect(() => {
        progressiveJPEG.load()
    }).toThrowError(ProgressiveJPEGException.requiredDependenciesNotInstalled());
});

it('should throw exception image squeezer source file path empty', (): void => {
    
    let progressiveJPEG = new ProgressiveJPEG();
        progressiveJPEG.load();
        
    expect(() => {
        progressiveJPEG.compress();
    }).toThrowError(ImageSqueezerCommonException.emptySourceFilePath());
});

it('should throw exception image squeezer output file path empty', (): void => {
    
    let progressiveJPEG = new ProgressiveJPEG();
        progressiveJPEG.load();
        progressiveJPEG.setSourceFilePath('/tmp/examplefile.jpg');

    expect(() => {
        progressiveJPEG.compress();
    }).toThrowError(ImageSqueezerCommonException.emptyOutputFilePath());
});

it('should reject when the source file path is invalid or not found', async (): Promise<void> => {
    
    let mockDirectory = __dirname + '/../Mocks/images/';

    let progressiveJPEG = new ProgressiveJPEG();
        progressiveJPEG.load();
        progressiveJPEG.setSourceFilePath(mockDirectory + 'unknown-imgck.jpg');
        progressiveJPEG.setOutputFilePath(mockDirectory + 'compressed-imgck-prog.jpg');
        
        await progressiveJPEG.compress().catch((error): void => {
            expect((error !== null)).toBe(true);
        });
});

it('should compress image', async (): Promise<void> => {
    
    let mockDirectory = __dirname + '/../Mocks/images/';

    let progressiveJPEG = new ProgressiveJPEG();
        progressiveJPEG.load();
        progressiveJPEG.setSourceFilePath(mockDirectory + 'compressed-imgck.jpg');
        progressiveJPEG.setOutputFilePath(mockDirectory + 'compressed-imgck-prog.jpg');
        
        await progressiveJPEG.compress().then((resolve): void => {
            expect(fs.existsSync(mockDirectory + 'compressed-imgck-prog.jpg')).toBe(true);
        }); 
});
