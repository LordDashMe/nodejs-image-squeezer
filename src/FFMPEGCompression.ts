/*
 * This file is part of the Image Squeezer.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import imageSize from 'image-size';

import ImageSqueezerCommon from './ImageSqueezerCommon';
import FileFormatResolver from './Utility/FileFormatResolver';
import FFMPEGCompressionLevelInterface from './FFMPEGCompressionLevelInterface';

/**
 * FFMPEG Compression Class.
 * 
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
export default class FFMPEGCompression extends ImageSqueezerCommon {

    public static readonly COMPRESSION_LEVEL_LOW: number = 1;
    public static readonly COMPRESSION_LEVEL_NORMAL: number = 2;
    public static readonly COMPRESSION_LEVEL_HIGH: number = 3;

    private currentFileMimeType: string = '';
    private compressionLevel: FFMPEGCompressionLevelInterface = { jpeg: '100', png: '100' };

    public constructor() {

        super();
        this.setSubClassType('ffmpeg-compression');
        this.setBin('ffmpeg');
    }

    public setCompressionLevel(compressionLevel: number): void {
        
        switch (compressionLevel) {
            case FFMPEGCompression.COMPRESSION_LEVEL_LOW:
                this.compressionLevel['jpeg'] = '2';
                this.compressionLevel['png'] = '1';
                break;
            case FFMPEGCompression.COMPRESSION_LEVEL_NORMAL:
                this.compressionLevel['jpeg'] = '6';
                this.compressionLevel['png'] = '3';
                break;
            case FFMPEGCompression.COMPRESSION_LEVEL_HIGH:
            default:
                this.compressionLevel['jpeg'] = '100';
                this.compressionLevel['png'] = '100';
        }
    }

    protected validate(): void {
        
        const allowedExtensionMimeType = {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg', 
            'png': 'image/png'
        };

        const fileFormatResolver = new FileFormatResolver(allowedExtensionMimeType);
        
        fileFormatResolver.setSourceFilePath(this.sourceFilePath);
        fileFormatResolver.validate();

        this.currentFileMimeType = fileFormatResolver.getMimeType();
    }
    
    protected command(): string {

        const imageDimensions = imageSize(this.sourceFilePath);

        return this.bin + ' -y -i ' + 
               this.escapeShellArg(this.sourceFilePath) + 
               ' -vf scale=w=' + imageDimensions.width + 
               ':h=' + imageDimensions.height + 
               ':force_original_aspect_ratio=decrease:interl=1 ' +
               this.compressionType() +
               this.handleOutputFilePath();
    }

    private compressionType(): string {
        
        switch (this.currentFileMimeType) {
            case 'image/png':
                return this.compressionCommandForPNGFormat();
            case 'image/jpeg':
            default:
                return this.compressionCommandForJPEGFormat();
        }
    }

    private compressionCommandForJPEGFormat(): string {

        return '-qscale:v ' + this.compressionLevel['jpeg'] + ' ';
    }

    private compressionCommandForPNGFormat(): string {

        return '-compression_level ' + this.compressionLevel['png'] + ' ';
    }
}
