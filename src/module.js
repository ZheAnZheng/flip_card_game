"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utility = void 0;
exports.utility = {
    getRandomNumberArray: function (count) {
        var _a;
        var number = Array.from(Array(count).keys());
        for (var index = number.length - 1; index > 0; index--) {
            var randomIndex = Math.floor(Math.random() * (index + 1));
            _a = [number[randomIndex], number[index]], number[index] = _a[0], number[randomIndex] = _a[1];
        }
        return number;
    },
};
//# sourceMappingURL=module.js.map