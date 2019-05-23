export default class ImageSqueezer {
    static readonly WINDOWS_OS: string;
    static readonly LINUX_OS: string;
    static readonly UNIX_OS: string;
    static readonly MACOSX_OS: string;
    private operatingSystem;
    private ffmpegBin;
    private sourceFilePath;
    private outputFilePath;
    setOperatingSystem(operatingSystem: string): void;
    load(): void;
    verifySupportedOperatingSystem(): void;
    private getOperatingSystem;
    setFFMpegBin(ffmpegBin: string): void;
    setSourceFilePath(sourceFilePath: string): void;
    setOutputFilePath(outputFilePath: string): void;
    compress(): Promise<boolean>;
    private validateRequiredProperties;
}
