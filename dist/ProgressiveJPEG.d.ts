import { ImageSqueezerCommon } from './ImageSqueezerCommon';
/**
 * Progressive JPEG Class.
 *
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
export declare class ProgressiveJPEG extends ImageSqueezerCommon {
    constructor();
    protected validate(): void;
    protected command(): string;
}
