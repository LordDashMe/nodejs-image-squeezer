import { ImageSqueezerCommon } from './ImageSqueezerCommon';
export default class FFMPEGCompression extends ImageSqueezerCommon {
    static readonly WINDOWS_OS: string;
    static readonly LINUX_OS: string;
    static readonly UNIX_OS: string;
    static readonly MACOSX_OS: string;
    private operatingSystem;
    private isAllowedEmptyOutputFilePath;
    setOperatingSystem(operatingSystem: string): void;
    load(): void;
    verifySupportedOperatingSystem(): void;
    private getOperatingSystem;
    allowEmptyOutputFilePath(): void;
    compress(): Promise<boolean>;
    private transferSouceFilePathToOutputFilePath;
    private handleOutputFilePath;
    private generateTemporaryOutputFilePath;
    private escapeShellArg;
}
