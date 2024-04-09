"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inject = void 0;
const inject = (buildFunction, buildDependencies) => (dependencies = buildDependencies()) => ({
    execute: buildFunction(dependencies),
    dependencies,
});
exports.inject = inject;
//# sourceMappingURL=test_util.js.map