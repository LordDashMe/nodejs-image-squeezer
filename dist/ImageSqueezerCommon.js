"use strict";
/*
 * This file is part of the Image Squeezer.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const child_process_1 = __importDefault(require("child_process"));
const OperatingSystemException_1 = __importDefault(require("./Exception/OperatingSystemException"));
const ImageSqueezerCommonException_1 = __importDefault(require("./Exception/ImageSqueezerCommonException"));
/**
 * Image Squeezer Common Class.
 *
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
class ImageSqueezerCommon {
    constructor() {
        this.operatingSystem = '';
        this.subClassType = '';
        this.bin = '';
        this.sourceFilePath = '';
        this.outputFilePath = '';
        this.commandStatement = '';
        this.isAllowedEmptyOutputFilePath = false;
        this.isExecuteChildProcess = true;
    }
    load() {
        this.verifySupportedOperatingSystem();
    }
    verifySupportedOperatingSystem() {
        switch (this.getOperatingSystem()) {
            case ImageSqueezerCommon.WINDOWS_OS:
            case ImageSqueezerCommon.LINUX_OS:
            case ImageSqueezerCommon.UNIX_OS:
                break;
            case ImageSqueezerCommon.MACOSX_OS:
            default:
                throw OperatingSystemException_1.default.isNotSupported();
        }
    }
    setOperatingSystem(operatingSystem) {
        this.operatingSystem = operatingSystem;
    }
    getOperatingSystem() {
        if (this.operatingSystem) {
            return this.operatingSystem;
        }
        return process.platform;
    }
    setSubClassType(subClassType) {
        this.subClassType = subClassType;
    }
    setBin(bin) {
        this.bin = bin;
    }
    setSourceFilePath(sourceFilePath) {
        this.sourceFilePath = sourceFilePath;
    }
    setOutputFilePath(outputFilePath) {
        this.outputFilePath = outputFilePath;
    }
    allowEmptyOutputFilePath() {
        this.isAllowedEmptyOutputFilePath = true;
    }
    setCommandStatement(commandStatement) {
        this.commandStatement = commandStatement;
    }
    getCommandStatement() {
        return this.commandStatement;
    }
    disableChildProcessExecution() {
        this.isExecuteChildProcess = false;
    }
    build() {
        this.validate();
        this.transferSouceFilePathToOutputFilePath();
        this.validateRequiredProperties();
        this.setCommandStatement(this.command());
    }
    /**
     * [HOOK METHOD]
     *
     * This is an abstract or no-op (no operation) class method.
     * The subclass of this class is expected to override this method.
     */
    validate() { }
    transferSouceFilePathToOutputFilePath() {
        if (this.isAllowedEmptyOutputFilePath) {
            this.outputFilePath = this.sourceFilePath;
        }
    }
    validateRequiredProperties() {
        if (!this.sourceFilePath) {
            throw ImageSqueezerCommonException_1.default.emptySourceFilePath();
        }
        if (!this.outputFilePath) {
            throw ImageSqueezerCommonException_1.default.emptyOutputFilePath();
        }
    }
    handleOutputFilePath() {
        if (this.isAllowedEmptyOutputFilePath) {
            return this.generateTemporaryOutputFilePath();
        }
        else {
            return this.escapeShellArg(this.outputFilePath);
        }
    }
    generateTemporaryOutputFilePath() {
        const filename = path_1.default.basename(this.outputFilePath);
        const splittedFilename = filename.split('.');
        const FILE_NAME = 0;
        const FILE_NAME_EXT = 1;
        const newFilename = (splittedFilename[FILE_NAME] +
            '-tmp-' + this.subClassType + '.' +
            splittedFilename[FILE_NAME_EXT]);
        const newBasename = this.escapeShellArg(this.outputFilePath.replace(filename, newFilename));
        return newBasename + this.renameCommandWithCompatibilityChecking(newBasename);
    }
    renameCommandWithCompatibilityChecking(newBasename) {
        let cmd = '';
        switch (this.getOperatingSystem()) {
            case ImageSqueezerCommon.WINDOWS_OS:
                cmd = ' && move -y ' + newBasename + ' ' + this.escapeShellArg(this.outputFilePath);
                break;
            case ImageSqueezerCommon.LINUX_OS:
            case ImageSqueezerCommon.UNIX_OS:
                cmd = ' && mv ' + newBasename + ' ' + this.escapeShellArg(this.outputFilePath);
                break;
        }
        return cmd;
    }
    escapeShellArg(arg) {
        return `'${arg.replace(/'/g, `'\\''`)}'`;
    }
    /**
     * [HOOK METHOD]
     *
     * This is an abstract or no-op (no operation) class method.
     * The subclass of this class is expected to override this method.
     */
    command() {
        return '';
    }
    compress() {
        return this.executeChildProcess();
    }
    executeChildProcess() {
        if (!this.isExecuteChildProcess) {
            return Promise.reject(ImageSqueezerCommon.DISABLED_CHILD_PROC_MSG);
        }
        // Since we use the standard "child_process" package implementation
        // we implemented also a standard promise in order to catch the response of the process. 
        return new Promise((resolve, reject) => {
            child_process_1.default.exec(this.commandStatement, (error) => {
                (error ? reject(error) : resolve(true));
            });
        });
    }
}
exports.default = ImageSqueezerCommon;
ImageSqueezerCommon.WINDOWS_OS = 'win32';
ImageSqueezerCommon.LINUX_OS = 'linux';
ImageSqueezerCommon.UNIX_OS = 'freebsd';
ImageSqueezerCommon.MACOSX_OS = 'darwin';
ImageSqueezerCommon.DISABLED_CHILD_PROC_MSG = 'The Child Process Execution was disabled.';
