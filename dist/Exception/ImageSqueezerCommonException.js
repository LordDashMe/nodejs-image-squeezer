"use strict";
/*
 * This file is part of the Image Squeezer.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Image Squeezer Common Exception Class.
 *
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
class ImageSqueezerCommonException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ImageSqueezerCommonException';
    }
    static emptySourceFilePath() {
        return new ImageSqueezerCommonException('The source file path is empty.');
    }
    static emptyOutputFilePath() {
        return new ImageSqueezerCommonException('The output file path is empty.');
    }
}
exports.ImageSqueezerCommonException = ImageSqueezerCommonException;
