import { ImageSqueezerCommon } from './ImageSqueezerCommon';
export default class FFMPEGCompression extends ImageSqueezerCommon {
    static readonly WINDOWS_OS: string;
    static readonly LINUX_OS: string;
    static readonly UNIX_OS: string;
    static readonly MACOSX_OS: string;
    private operatingSystem;
    constructor();
    setOperatingSystem(operatingSystem: string): void;
    load(): void;
    verifySupportedOperatingSystem(): void;
    private getOperatingSystem;
    compress(): Promise<boolean>;
}
