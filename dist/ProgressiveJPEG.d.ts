import { ImageSqueezerCommon } from './ImageSqueezerCommon';
export default class ProgressiveJPEG extends ImageSqueezerCommon {
    constructor();
    compress(): Promise<boolean>;
}
