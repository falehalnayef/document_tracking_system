"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StatusError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.default = StatusError;
