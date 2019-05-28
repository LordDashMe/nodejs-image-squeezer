import { ImageSqueezerCommon } from '../../src/ImageSqueezerCommon';
import { OperatingSystemException } from '../../src/Exception/OperatingSystemException';
import { ImageSqueezerCommonException } from '../../src/Exception/ImageSqueezerCommonException';

it('should load the main class', (): void => {

    expect(new ImageSqueezerCommon()).toBeInstanceOf(ImageSqueezerCommon);
});

it('should throw exception operating system not supported', (): void => {
    
    let compression = new ImageSqueezerCommon();
    
    compression.setOperatingSystem('unknown');

    expect(() => { compression.load(); }).toThrowError(OperatingSystemException.isNotSupported());

    compression.setOperatingSystem(ImageSqueezerCommon.MACOSX_OS);

    expect(() => { compression.load(); }).toThrowError(OperatingSystemException.isNotSupported());
});

it('should throw exception empty source file path', (): void => {
    
    let compression = new ImageSqueezerCommon();
        compression.setOperatingSystem(ImageSqueezerCommon.WINDOWS_OS);
        compression.load();

    expect(() => { compression.build(); }).toThrowError(
        ImageSqueezerCommonException.emptySourceFilePath()
    );
});

it('should throw exception empty output file path', (): void => {
    
    let compression = new ImageSqueezerCommon();
        compression.load();
        compression.setSourceFilePath('/tmp/example-file.jpg');
        
    expect(() => { compression.build(); }).toThrowError(
        ImageSqueezerCommonException.emptyOutputFilePath()
    );
});

it('should allow empty output file path and used the current source path', (): void => {
    
    let compression = new ImageSqueezerCommon();
        compression.load();
        compression.setBin('test-command');
        compression.setSourceFilePath('/tmp/example-file.jpg');
        compression.allowEmptyOutputFilePath();
        compression.build();

    expect((compression.getCommandStatement() === '')).toBe(true);
});

it('should allow disabling the child process', async (): Promise<void> => {
    
    let compression = new ImageSqueezerCommon();
        compression.load();
        compression.setBin('test-command');
        compression.setSourceFilePath('/tmp/example-file.jpg');
        compression.setOutputFilePath('/tmp/example-file-c.jpg');
        compression.disableChildProcessExecution();
        compression.build();

    await compression.compress().catch((reject): void => {
        expect(reject !== null).toBe(true);
    });

});

it('should execute a false command in a windows os environment', async (): Promise<void> => {
    
    let compression = new MockImageCompressionClass();
        compression.setOperatingSystem(ImageSqueezerCommon.WINDOWS_OS);
        compression.load();
        compression.setSourceFilePath('/tmp/example-file.jpg');
        compression.allowEmptyOutputFilePath();
        compression.build();
    
    await compression.compress().catch((reject): void => {
        expect(reject !== null).toBe(true);
    }); 
});

it('should execute a false command in a linux os environment', async (): Promise<void> => {
    
    let compression = new MockImageCompressionClass();
        compression.setOperatingSystem(ImageSqueezerCommon.LINUX_OS);
        compression.load();
        compression.setSourceFilePath('/tmp/example-file.jpg');
        compression.allowEmptyOutputFilePath();
        compression.build();
    
    await compression.compress().catch((reject): void => {
        expect(reject !== null).toBe(true);
    }); 
});

it('should execute a false command', async (): Promise<void> => {

    let compression = new MockImageCompressionClass();
        compression.load();
        compression.setSourceFilePath('/tmp/example-file.jpg');
        compression.setOutputFilePath('/tmp/example-file-c.jpg');
        compression.build();
    
    await compression.compress().catch((reject): void => {
        expect(reject !== null).toBe(true);
    }); 
});

it('should execute a true command but not a real compression', async (): Promise<void> => {

    let compression = new MockTrueCommandClass();
        compression.load();
        compression.setSourceFilePath('/tmp/example-file.jpg');
        compression.setOutputFilePath('/tmp/example-file-c.jpg');
        compression.build();
    
    await compression.compress().then((resolve): void => {
        expect(resolve).toBe(true);
    }); 
});

class MockImageCompressionClass extends ImageSqueezerCommon {

    public constructor() {
        super();
        this.setSubClassType('mock-false-command-class');
        this.setBin('00000');
    }

    protected command(): string {

        return this.bin + ' ' + 
               this.sourceFilePath + ' ' +
               this.handleOutputFilePath();
    }
}

class MockTrueCommandClass extends ImageSqueezerCommon {

    public constructor() {
        super();
        this.setSubClassType('mock-true-command-class');
        this.setBin('echo');
    }

    protected command(): string {

        return this.bin + ' "Hello World!"';
    }
}
