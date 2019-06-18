import { ImageSqueezerCommon } from './ImageSqueezerCommon';
/**
 * FFMPEG Compression Class.
 *
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
export declare class FFMPEGCompression extends ImageSqueezerCommon {
    static readonly COMPRESSION_LEVEL_LOW: number;
    static readonly COMPRESSION_LEVEL_NORMAL: number;
    static readonly COMPRESSION_LEVEL_HIGH: number;
    private currentFileMimeType;
    private compressionLevel;
    constructor();
    setCompressionLevel(compressionLevel: number): void;
    protected validate(): void;
    protected command(): string;
    private compressionType;
    private compressionCommandForJPEGFormat;
    private compressionCommandForPNGFormat;
}
