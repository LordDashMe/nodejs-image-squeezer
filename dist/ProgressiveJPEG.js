"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImageSqueezerCommon_1 = require("./ImageSqueezerCommon");
class ProgressiveJPEG extends ImageSqueezerCommon_1.ImageSqueezerCommon {
    constructor() {
        super();
        this.setSubClassType('progessive-jpeg');
        this.setBin('convert');
    }
    command() {
        let cmd = this.bin + ' ' +
            this.sourceFilePath + ' -interlace plane ' +
            this.handleOutputFilePath();
        return cmd;
    }
}
exports.ProgressiveJPEG = ProgressiveJPEG;
