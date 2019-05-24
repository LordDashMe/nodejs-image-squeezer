export declare class ImageSqueezerCommon {
    protected bin: string;
    protected sourceFilePath: string;
    protected outputFilePath: string;
    setBin(bin: string): void;
    setSourceFilePath(sourceFilePath: string): void;
    setOutputFilePath(outputFilePath: string): void;
    protected validateRequiredProperties(): void;
}
