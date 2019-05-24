"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = __importDefault(require("child_process"));
const ImageSqueezerCommon_1 = require("./ImageSqueezerCommon");
const ProgressiveJPEGException_1 = require("./Exception/ProgressiveJPEGException");
class ProgressiveJPEG extends ImageSqueezerCommon_1.ImageSqueezerCommon {
    constructor() {
        super();
        this.setBin('convert');
    }
    load() {
        this.verifyRequiredDependencies();
    }
    verifyRequiredDependencies() {
        try {
            child_process_1.default.execSync(this.bin + ' -version', { stdio: [0] }).toString();
        }
        catch (error) {
            throw ProgressiveJPEGException_1.ProgressiveJPEGException.requiredDependenciesNotInstalled();
        }
    }
    compress() {
        this.validateRequiredProperties();
        let cmd = this.bin + ' ' +
            this.sourceFilePath + ' -interlace plane ' +
            this.outputFilePath;
        return new Promise((resolve, reject) => {
            child_process_1.default.exec(cmd, (error) => {
                (error ? reject(error) : resolve(true));
            });
        });
    }
}
exports.default = ProgressiveJPEG;
