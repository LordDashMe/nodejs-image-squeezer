/*
 * This file is part of the Image Squeezer.
 *
 * (c) Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Image Squeezer Common Exception Class.
 * 
 * @author Joshua Clifford Reyes <reyesjoshuaclifford@gmail.com>
 */
export default class ImageSqueezerCommonException extends Error {

    constructor(message: string) {

        super(message);
        this.name = 'ImageSqueezerCommonException';
    }

    public static emptySourceFilePath(): ImageSqueezerCommonException  {
        
        return new ImageSqueezerCommonException('The source file path is empty.');   
    }

    public static emptyOutputFilePath(): ImageSqueezerCommonException  {
        
        return new ImageSqueezerCommonException('The output file path is empty.');   
    }
}
