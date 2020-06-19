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
const ProgressiveJPEG_1 = __importDefault(require("./ProgressiveJPEG"));
const FFMPEGCompression_1 = __importDefault(require("./FFMPEGCompression"));
exports.default = {
    FFMPegCompression: FFMPEGCompression_1.default,
    ProgressiveJPEG: ProgressiveJPEG_1.default
};
