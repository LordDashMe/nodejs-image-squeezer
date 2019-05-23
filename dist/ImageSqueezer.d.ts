export default class ImageSqueezer {
    readonly WINDOWS_OS: string;
    readonly LINUX_OS: string;
    readonly UNIX_OS: string;
    readonly MACOSX_OS: string;
    private operatingSystem;
    private ffmpegBin;
    private sourceFilePath;
    private outputFilePath;
    setOperatingSystem(operatingSystem: string): void;
    load(): void;
    verifySupportedOperatingSystem(): void;
    private getOperatingSystem;
    private getCurrentDir;
    setFFMpegBin(ffmpegBin: string): void;
    getFFMpegBin(): string;
    setSourceFilePath(sourceFilePath: string): void;
    setOutputFilePath(outputFilePath: string): void;
    compress(): Promise<{}>;
    private validateRequiredProperties;
}
