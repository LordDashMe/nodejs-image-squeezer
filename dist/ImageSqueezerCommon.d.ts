/**
 * Image Squeezer Common Class.
 *
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
export declare class ImageSqueezerCommon {
    static readonly WINDOWS_OS: string;
    static readonly LINUX_OS: string;
    static readonly UNIX_OS: string;
    static readonly MACOSX_OS: string;
    static readonly DISABLED_CHILD_PROC_MSG: string;
    protected operatingSystem: string;
    protected subClassType: string;
    protected bin: string;
    protected sourceFilePath: string;
    protected outputFilePath: string;
    protected commandStatement: string;
    protected isAllowedEmptyOutputFilePath: boolean;
    protected isExecuteChildProcess: boolean;
    load(): void;
    verifySupportedOperatingSystem(): void;
    setOperatingSystem(operatingSystem: string): void;
    protected getOperatingSystem(): string;
    protected setSubClassType(subClassType: string): void;
    setBin(bin: string): void;
    setSourceFilePath(sourceFilePath: string): void;
    setOutputFilePath(outputFilePath: string): void;
    allowEmptyOutputFilePath(): void;
    protected setCommandStatement(commandStatement: string): void;
    getCommandStatement(): string;
    disableChildProcessExecution(): void;
    build(): void;
    compress(): Promise<boolean>;
    protected transferSouceFilePathToOutputFilePath(): void;
    protected validateRequiredProperties(): void;
    protected handleOutputFilePath(): string;
    protected generateTemporaryOutputFilePath(): string;
    private renameCommandWithCompatibilityChecking;
    protected escapeShellArg(arg: string): string;
    protected executeChildProcess(): Promise<boolean>;
    /**
     * This is an abstract or no-op class method.
     * The subclass is expected to override this method.
     */
    protected command(): string;
}
