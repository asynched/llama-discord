"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Measure = void 0;
function Measure({ async = false }) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        if (async) {
            descriptor.value = async function (...args) {
                const start = Date.now();
                const result = originalMethod.apply(this, args);
                const end = Date.now();
                console.log(`Method ${propertyKey} took ${end - start}ms`);
                return result;
            };
        }
        else {
            descriptor.value = function (...args) {
                const start = Date.now();
                const result = originalMethod.apply(this, args);
                const end = Date.now();
                console.log(`Method ${propertyKey} took ${end - start}ms`);
                return result;
            };
        }
        return descriptor;
    };
}
exports.Measure = Measure;
