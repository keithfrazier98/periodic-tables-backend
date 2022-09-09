"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Express API "Not found" handler.
 */
function notFound(req, res, next) {
    next({ status: 404, message: "Path not found: ".concat(req.originalUrl) });
}
exports.default = notFound;
//# sourceMappingURL=notFound.js.map