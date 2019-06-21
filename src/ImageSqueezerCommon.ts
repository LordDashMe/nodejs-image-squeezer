/*
 * This file is part of the Image Squeezer.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import path from 'path';
import cli from 'child_process';

import { OperatingSystemException } from './Exception/OperatingSystemException';
import { ImageSqueezerCommonException } from './Exception/ImageSqueezerCommonException';

/**
 * Image Squeezer Common Class.
 * 
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
export class ImageSqueezerCommon {

    public static readonly WINDOWS_OS: string = 'win32';
    public static readonly LINUX_OS: string = 'linux';
    public static readonly UNIX_OS: string = 'freebsd';
    public static readonly MACOSX_OS: string = 'darwin';

    public static readonly DISABLED_CHILD_PROC_MSG: string = 'The Child Process Execution was disabled.';

    protected operatingSystem: string = '';
    protected subClassType: string = '';
    protected bin: string = '';
    protected sourceFilePath: string = '';
    protected outputFilePath: string = '';
    protected commandStatement: string = '';
    
    protected isAllowedEmptyOutputFilePath: boolean = false;
    protected isExecuteChildProcess: boolean = true;

    public load(): void {
        
        this.verifySupportedOperatingSystem();
    }

    private verifySupportedOperatingSystem(): void {

        switch (this.getOperatingSystem()) {
            case ImageSqueezerCommon.WINDOWS_OS:
            case ImageSqueezerCommon.LINUX_OS:
            case ImageSqueezerCommon.UNIX_OS:
                break;
            case ImageSqueezerCommon.MACOSX_OS:
            default:
                throw OperatingSystemException.isNotSupported();
        }
    }
    
    public setOperatingSystem(operatingSystem: string): void {

        this.operatingSystem = operatingSystem;
    }

    protected getOperatingSystem(): string {

        if (this.operatingSystem) {
            return this.operatingSystem;
        }

        return process.platform;
    }

    protected setSubClassType(subClassType: string): void {

        this.subClassType = subClassType;
    }

    public setBin(bin: string): void {

        this.bin = bin;
    }

    public setSourceFilePath(sourceFilePath: string): void {
        
        this.sourceFilePath = sourceFilePath;
    }

    public setOutputFilePath(outputFilePath: string): void {
        
        this.outputFilePath = outputFilePath;
    }

    public allowEmptyOutputFilePath(): void {
        
        this.isAllowedEmptyOutputFilePath = true;
    }

    protected setCommandStatement(commandStatement: string): void {

        this.commandStatement = commandStatement;
    }

    public getCommandStatement(): string {
        
        return this.commandStatement;
    }

    public disableChildProcessExecution(): void {

        this.isExecuteChildProcess = false;
    }

    public build(): void {
        
        this.validate();
        this.transferSouceFilePathToOutputFilePath();
        this.validateRequiredProperties();
        this.setCommandStatement(this.command());
    }

    /**
     * This is an abstract, hook, or no-op class method. 
     * The subclass is expected to override this method.
     */
    protected validate(): void {}

    protected transferSouceFilePathToOutputFilePath(): void {
        
        if (this.isAllowedEmptyOutputFilePath) {
            this.outputFilePath = this.sourceFilePath;
        }
    }

    protected validateRequiredProperties(): void {
        
        if (! this.sourceFilePath) {
            throw ImageSqueezerCommonException.emptySourceFilePath();
        }

        if (! this.outputFilePath) {
            throw ImageSqueezerCommonException.emptyOutputFilePath();
        }
    }

    protected handleOutputFilePath(): string {

        if (this.isAllowedEmptyOutputFilePath) {
            return this.generateTemporaryOutputFilePath();
        } else {
            return this.escapeShellArg(this.outputFilePath);
        }
    }

    protected generateTemporaryOutputFilePath(): string {

        const FILE_NAME = 0;
        const FILE_NAME_EXT = 1;

        let filename = path.basename(this.outputFilePath);
        let splittedFilename = filename.split('.');
        
        let newFilename = splittedFilename[FILE_NAME] + 
                          '-tmp-' + 
                          this.subClassType + 
                          '.' + 
                          splittedFilename[FILE_NAME_EXT];

        let newBasename = this.escapeShellArg(
            this.outputFilePath.replace(filename, newFilename)
        );

        return newBasename + this.renameCommandWithCompatibilityChecking(newBasename);       
    }

    private renameCommandWithCompatibilityChecking(newBasename: string): string {
        
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

    protected escapeShellArg(arg: string): string {
        
        return `'${arg.replace(/'/g, `'\\''`)}'`;
    }

    /**
     * This is an abstract, hook, or no-op class method. 
     * The subclass is expected to override this method.
     */
    protected command(): string { return ''; }

    public compress(): Promise<boolean> {

        return this.executeChildProcess();
    }

    protected executeChildProcess(): Promise<boolean> {
        
        if (! this.isExecuteChildProcess) {
            return Promise.reject(ImageSqueezerCommon.DISABLED_CHILD_PROC_MSG);
        }

        return new Promise((resolve, reject): void => {
            cli.exec(this.commandStatement, (error): void => {
                (error ? reject(error) : resolve(true));
            });
        });
    }
}
