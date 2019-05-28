export declare class ImageSqueezerCommon {
    protected subClassType: string;
    protected bin: string;
    protected sourceFilePath: string;
    protected outputFilePath: string;
    protected isAllowedEmptyOutputFilePath: boolean;
    protected setSubClassType(subClassType: string): void;
    setBin(bin: string): void;
    setSourceFilePath(sourceFilePath: string): void;
    setOutputFilePath(outputFilePath: string): void;
    allowEmptyOutputFilePath(): void;
    protected validateRequiredProperties(): void;
    protected transferSouceFilePathToOutputFilePath(): void;
    protected handleOutputFilePath(): string;
    protected generateTemporaryOutputFilePath(): string;
    protected escapeShellArg(arg: string): string;
}
