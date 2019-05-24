import { ImageSqueezerCommon } from './ImageSqueezerCommon';
export default class ProgressiveJPEG extends ImageSqueezerCommon {
    constructor();
    load(): void;
    private verifyRequiredDependencies;
    compress(): Promise<boolean>;
}
