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
// class AwaitFistCard implements State{
//     flipFirstCard(): void
//     flipSecondCard(): void
// }
// class AwaitSecondCard implements State{
//     flipFirstCard(): void
//     flipSecondCard(): void
// }
// export class CardMatchFailed implements State{
//     flipFirstCard(): void
//     flipSecondCard(): void
// }
// export class CardMatched implements State{
//     flipFirstCard(): void
//     flipSecondCard(): void
// }
// export class GameFinished implements State{
//     flipFirstCard(): void
//     flipSecondCard(): void
// }
//# sourceMappingURL=module.js.map