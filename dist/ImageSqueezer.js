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
const ProgressiveJPEG_1 = require("./ProgressiveJPEG");
const FFMPEGCompression_1 = require("./FFMPEGCompression");
exports.default = {
    FFMPegCompression: FFMPEGCompression_1.FFMPEGCompression,
    ProgressiveJPEG: ProgressiveJPEG_1.ProgressiveJPEG
};
