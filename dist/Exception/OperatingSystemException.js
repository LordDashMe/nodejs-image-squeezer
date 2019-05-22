"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var OperatingSystemException = /** @class */ (function (_super) {
    __extends(OperatingSystemException, _super);
    function OperatingSystemException(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'OperatingSystemException';
        return _this;
    }
    OperatingSystemException.isNotSupported = function () {
        return new OperatingSystemException('The current operating system is not supported. Please use only WIN, Mac OS X or Linux to use this package.');
    };
    return OperatingSystemException;
}(Error));
exports.OperatingSystemException = OperatingSystemException;
