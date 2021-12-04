(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var module_1 = require("./module");
var AwaitFirstCard = /** @class */ (function () {
    function AwaitFirstCard() {
    }
    AwaitFirstCard.prototype.flipFirstCard = function () {
        console.log('aaa');
    };
    AwaitFirstCard.prototype.flipSecondCard = function () {
        console.log('');
    };
    return AwaitFirstCard;
}());
console.log(AwaitFirstCard);
var View = /** @class */ (function () {
    function View() {
    }
    View.prototype.displayCards = function (data) {
        document.querySelector('#cards').innerHTML += "\n        <div data-set=\"".concat(data.index, "\"  class=\"card back ").concat(data.name, "\">\n            <p>").concat(data.number, "</p>\n            ").concat(data.symbol, "\n            <p>").concat(data.number, "</p>\n        ");
    };
    return View;
}());
var Modal = /** @class */ (function () {
    function Modal() {
        this.GAME_STATE = {
            FirstCardAwaits: 'FirstCardAwaits',
            SecondCardAwaits: 'SecendCardAwait',
            CardMatchFailed: 'CardMatchFailed',
            CardMatched: 'CardMatched',
            GameFinished: 'GameFinished'
        };
        this.current_state = this.GAME_STATE.FirstCardAwaits;
        this.revealedCards = [];
        this.score = 0;
    }
    Modal.prototype.getCardElements = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var number, symbolData, symbolName, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        number = this.translateNumber((index % 13) + 1);
                        return [4 /*yield*/, this.getSymbols()];
                    case 1:
                        symbolData = _a.sent();
                        symbolName = this.translateSymbol(Math.floor(index / 13));
                        symbol = symbolData[symbolName].join('');
                        return [2 /*return*/, { number: number, symbol: symbol, name: symbolName, index: index }];
                }
            });
        });
    };
    Modal.prototype.translateNumber = function (number) {
        switch (number) {
            case 1:
                return "A";
            case 11:
                return "J";
            case 12:
                return "Q";
            case 13:
                return "K";
            default:
                return number;
        }
    };
    Modal.prototype.translateSymbol = function (number) {
        switch (number) {
            case 0:
                return 'heart';
            case 1:
                return 'spade';
            case 2:
                return 'diamond';
            case 3:
                return 'club';
        }
    };
    Modal.prototype.getSymbols = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, responseData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('http://192.168.31.155:3000/card')];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        responseData = _a.sent();
                        return [2 /*return*/, responseData];
                }
            });
        });
    };
    return Modal;
}());
var Controller = /** @class */ (function () {
    function Controller(view, modal) {
        this.view = view;
        this.modal = modal;
    }
    Controller.prototype.initialize = function () {
        var _this = this;
        module_1.utility.getRandomNumberArray(52).map(function (index) { return __awaiter(_this, void 0, void 0, function () {
            var data, cards;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, modal.getCardElements(index)];
                    case 1:
                        data = _a.sent();
                        view.displayCards(data);
                        cards = document.querySelectorAll('.card');
                        cards.forEach(function (card) {
                            card.addEventListener('click', _this.flipCard);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    Controller.prototype.flipCard = function (e) {
        var self = e.target;
        if (self.classList.contains('back')) {
            self.classList.remove('back');
            self.classList.add('front');
        }
    };
    return Controller;
}());
var view = new View();
var modal = new Modal();
var controller = new Controller(view, modal);
controller.initialize();

},{"./module":2}],2:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLnRzIiwic3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsbUNBQXNDO0FBRXRDO0lBQUE7SUFRQSxDQUFDO0lBUEcsc0NBQWEsR0FBYjtRQUNHLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDckIsQ0FBQztJQUNELHVDQUFjLEdBQWQ7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ2pCLENBQUM7SUFFTCxxQkFBQztBQUFELENBUkEsQUFRQyxJQUFBO0FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM1QjtJQUFBO0lBYUEsQ0FBQztJQVhHLDJCQUFZLEdBQVosVUFBYSxJQUFJO1FBRWIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLElBQUksb0NBQzdCLElBQUksQ0FBQyxLQUFLLG1DQUF1QixJQUFJLENBQUMsSUFBSSxpQ0FDbEQsSUFBSSxDQUFDLE1BQU0sK0JBQ2QsSUFBSSxDQUFDLE1BQU0sOEJBQ1IsSUFBSSxDQUFDLE1BQU0sbUJBQ25CLENBQUE7SUFFTCxDQUFDO0lBRUwsV0FBQztBQUFELENBYkEsQUFhQyxJQUFBO0FBQ0Q7SUFBQTtRQUVJLGVBQVUsR0FBRztZQUNULGVBQWUsRUFBRSxpQkFBaUI7WUFDbEMsZ0JBQWdCLEVBQUUsaUJBQWlCO1lBQ25DLGVBQWUsRUFBRSxpQkFBaUI7WUFDbEMsV0FBVyxFQUFFLGFBQWE7WUFDMUIsWUFBWSxFQUFFLGNBQWM7U0FDL0IsQ0FBQTtRQUNPLGtCQUFhLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUM7UUFDdEQsa0JBQWEsR0FBQyxFQUFFLENBQUM7UUFDakIsVUFBSyxHQUFDLENBQUMsQ0FBQztJQTZDWixDQUFDO0lBM0NTLCtCQUFlLEdBQXJCLFVBQXNCLEtBQUs7Ozs7Ozt3QkFDbkIsTUFBTSxHQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLEdBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzdCLHFCQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBQTs7d0JBQWxDLFVBQVUsR0FBQyxTQUF1Qjt3QkFDbEMsVUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQTt3QkFDekQsTUFBTSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBRS9DLHNCQUFPLEVBQUUsTUFBTSxRQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQyxLQUFLLE9BQUEsRUFBQyxFQUFBOzs7O0tBQ25EO0lBQ0QsK0JBQWUsR0FBZixVQUFnQixNQUFNO1FBQ2xCLFFBQU8sTUFBTSxFQUFDO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLE9BQU8sR0FBRyxDQUFDO1lBQ2YsS0FBSyxFQUFFO2dCQUNILE9BQU8sR0FBRyxDQUFDO1lBQ2YsS0FBSyxFQUFFO2dCQUNILE9BQU8sR0FBRyxDQUFDO1lBQ2YsS0FBSyxFQUFFO2dCQUNILE9BQU8sR0FBRyxDQUFDO1lBQ2Y7Z0JBQ0ksT0FBTyxNQUFNLENBQUM7U0FDckI7SUFDTCxDQUFDO0lBQ0QsK0JBQWUsR0FBZixVQUFnQixNQUFhO1FBQ3pCLFFBQU8sTUFBTSxFQUFDO1lBQ1YsS0FBSyxDQUFDO2dCQUNGLE9BQU8sT0FBTyxDQUFDO1lBQ25CLEtBQUssQ0FBQztnQkFDRixPQUFPLE9BQU8sQ0FBQztZQUNuQixLQUFLLENBQUM7Z0JBQ0YsT0FBTyxTQUFTLENBQUM7WUFDckIsS0FBSyxDQUFDO2dCQUNGLE9BQU8sTUFBTSxDQUFBO1NBRXBCO0lBQ0wsQ0FBQztJQUVLLDBCQUFVLEdBQWhCOzs7Ozs0QkFDbUIscUJBQU0sS0FBSyxDQUFDLGlDQUFpQyxDQUFDLEVBQUE7O3dCQUF2RCxRQUFRLEdBQUMsU0FBOEM7d0JBQ3pDLHFCQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQTs7d0JBQW5DLFlBQVksR0FBRSxTQUFxQjt3QkFDekMsc0JBQU8sWUFBWSxFQUFBOzs7O0tBR3RCO0lBQ0wsWUFBQztBQUFELENBeERBLEFBd0RDLElBQUE7QUFFRDtJQUdJLG9CQUFZLElBQVMsRUFBRSxLQUFXO1FBQzlCLElBQUksQ0FBQyxJQUFJLEdBQUUsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUMsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFDRCwrQkFBVSxHQUFWO1FBQUEsaUJBU0M7UUFSRyxnQkFBTyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFPLEtBQUs7Ozs7OzRCQUNoQyxxQkFBTSxLQUFLLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFBOzt3QkFBekMsSUFBSSxHQUFHLFNBQWtDO3dCQUMvQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNsQixLQUFLLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUNqRCxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTs0QkFDZCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTt3QkFDaEQsQ0FBQyxDQUFDLENBQUE7Ozs7YUFDTCxDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0QsNkJBQVEsR0FBUixVQUFTLENBQUM7UUFDTixJQUFNLElBQUksR0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3BCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUM7WUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUI7SUFDTCxDQUFDO0lBRUwsaUJBQUM7QUFBRCxDQXpCQSxBQXlCQyxJQUFBO0FBSUQsSUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUN4QixJQUFNLEtBQUssR0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDO0FBQ3hCLElBQU0sVUFBVSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksRUFBQyxLQUFLLENBQUMsQ0FBQztBQUU5QyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7Ozs7OztBQy9HWCxRQUFBLE9BQU8sR0FBRztJQUVuQixvQkFBb0IsWUFBQyxLQUFLOztRQUN0QixJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBQzlDLEtBQUssSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNwRCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUNwRDtZQUFBLEtBQXVDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUExRSxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQUEsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQUEsQ0FBd0M7U0FDbkY7UUFDRCxPQUFPLE1BQU0sQ0FBQTtJQUNqQixDQUFDO0NBRUosQ0FBQTtBQUNELHdDQUF3QztBQUN4Qyw0QkFBNEI7QUFDNUIsNkJBQTZCO0FBRTdCLElBQUk7QUFDSiwwQ0FBMEM7QUFDMUMsNEJBQTRCO0FBQzVCLDZCQUE2QjtBQUM3QixJQUFJO0FBQ0osaURBQWlEO0FBQ2pELDRCQUE0QjtBQUM1Qiw2QkFBNkI7QUFFN0IsSUFBSTtBQUNKLDZDQUE2QztBQUM3Qyw0QkFBNEI7QUFDNUIsNkJBQTZCO0FBRTdCLElBQUk7QUFDSiw4Q0FBOEM7QUFDOUMsNEJBQTRCO0FBQzVCLDZCQUE2QjtBQUU3QixJQUFJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHtTdGF0ZSx1dGlsaXR5fSBmcm9tJy4vbW9kdWxlJztcblxuY2xhc3MgQXdhaXRGaXJzdENhcmQgaW1wbGVtZW50cyBTdGF0ZXtcbiAgICBmbGlwRmlyc3RDYXJkKCk6IHZvaWQge1xuICAgICAgIGNvbnNvbGUubG9nKCdhYWEnKVxuICAgIH1cbiAgICBmbGlwU2Vjb25kQ2FyZCgpOiB2b2lkIHtcbiAgICAgIGNvbnNvbGUubG9nKCcnKVxuICAgIH1cblxufVxuY29uc29sZS5sb2coQXdhaXRGaXJzdENhcmQpO1xuY2xhc3MgVmlldyB7XG4gICAgXG4gICAgZGlzcGxheUNhcmRzKGRhdGEpOnZvaWQge1xuICAgICAgICBcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NhcmRzJykuaW5uZXJIVE1MICs9IGBcbiAgICAgICAgPGRpdiBkYXRhLXNldD1cIiR7ZGF0YS5pbmRleH1cIiAgY2xhc3M9XCJjYXJkIGJhY2sgJHtkYXRhLm5hbWV9XCI+XG4gICAgICAgICAgICA8cD4ke2RhdGEubnVtYmVyfTwvcD5cbiAgICAgICAgICAgICR7ZGF0YS5zeW1ib2x9XG4gICAgICAgICAgICA8cD4ke2RhdGEubnVtYmVyfTwvcD5cbiAgICAgICAgYFxuXG4gICAgfVxuICAgIFxufVxuY2xhc3MgTW9kYWx7XG5cbiAgICBHQU1FX1NUQVRFID0ge1xuICAgICAgICBGaXJzdENhcmRBd2FpdHM6ICdGaXJzdENhcmRBd2FpdHMnLFxuICAgICAgICBTZWNvbmRDYXJkQXdhaXRzOiAnU2VjZW5kQ2FyZEF3YWl0JyxcbiAgICAgICAgQ2FyZE1hdGNoRmFpbGVkOiAnQ2FyZE1hdGNoRmFpbGVkJyxcbiAgICAgICAgQ2FyZE1hdGNoZWQ6ICdDYXJkTWF0Y2hlZCcsXG4gICAgICAgIEdhbWVGaW5pc2hlZDogJ0dhbWVGaW5pc2hlZCdcbiAgICB9XG4gICAgcHJpdmF0ZSBjdXJyZW50X3N0YXRlPXRoaXMuR0FNRV9TVEFURS5GaXJzdENhcmRBd2FpdHM7XG4gICAgcmV2ZWFsZWRDYXJkcz1bXTtcbiAgICBzY29yZT0wO1xuXG4gICAgYXN5bmMgZ2V0Q2FyZEVsZW1lbnRzKGluZGV4KTpQcm9taXNlPE9iamVjdD57XG4gICAgICAgIGxldCBudW1iZXI9dGhpcy50cmFuc2xhdGVOdW1iZXIoKGluZGV4JTEzKSsxKTtcbiAgICAgICAgY29uc3Qgc3ltYm9sRGF0YT1hd2FpdCB0aGlzLmdldFN5bWJvbHMoKTtcbiAgICAgICAgY29uc3Qgc3ltYm9sTmFtZSA9IHRoaXMudHJhbnNsYXRlU3ltYm9sKE1hdGguZmxvb3IoaW5kZXggLyAxMykpXG4gICAgICAgIGNvbnN0IHN5bWJvbCA9IHN5bWJvbERhdGFbc3ltYm9sTmFtZV0uam9pbignJyk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4geyBudW1iZXIsIHN5bWJvbCwgbmFtZTogc3ltYm9sTmFtZSxpbmRleH1cbiAgICB9XG4gICAgdHJhbnNsYXRlTnVtYmVyKG51bWJlcik6c3RyaW5nfG51bWJlcntcbiAgICAgICAgc3dpdGNoKG51bWJlcil7XG4gICAgICAgICAgICBjYXNlIDE6IFxuICAgICAgICAgICAgICAgIHJldHVybiBcIkFcIjtcbiAgICAgICAgICAgIGNhc2UgMTEgOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIkpcIjtcbiAgICAgICAgICAgIGNhc2UgMTIgOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIlFcIjtcbiAgICAgICAgICAgIGNhc2UgMTMgOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIktcIjtcbiAgICAgICAgICAgIGRlZmF1bHQgOlxuICAgICAgICAgICAgICAgIHJldHVybiBudW1iZXI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdHJhbnNsYXRlU3ltYm9sKG51bWJlcjpudW1iZXIpOnN0cmluZ3tcbiAgICAgICAgc3dpdGNoKG51bWJlcil7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdoZWFydCc7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdzcGFkZSc7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuICdkaWFtb25kJztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2NsdWInXG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGdldFN5bWJvbHMoKSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlPWF3YWl0IGZldGNoKCdodHRwOi8vMTkyLjE2OC4zMS4xNTU6MzAwMC9jYXJkJyk7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YT0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2VEYXRhXG4gICAgICAgIFxuICAgICAgICBcbiAgICB9XG59XG5cbmNsYXNzIENvbnRyb2xsZXJ7XG4gICAgdmlldzpWaWV3O1xuICAgIG1vZGFsOk1vZGFsO1xuICAgIGNvbnN0cnVjdG9yKHZpZXc6VmlldyAsbW9kYWw6TW9kYWwpe1xuICAgICAgICB0aGlzLnZpZXcgPXZpZXc7XG4gICAgICAgIHRoaXMubW9kYWw9bW9kYWw7XG4gICAgfVxuICAgIGluaXRpYWxpemUoKXtcbiAgICAgICAgdXRpbGl0eS5nZXRSYW5kb21OdW1iZXJBcnJheSg1MikubWFwKGFzeW5jIChpbmRleCk9PntcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBtb2RhbC5nZXRDYXJkRWxlbWVudHMoaW5kZXgpO1xuICAgICAgICAgICAgdmlldy5kaXNwbGF5Q2FyZHMoZGF0YSk7XG4gICAgICAgICAgICBjb25zdCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJkJyk7XG4gICAgICAgICAgICBjYXJkcy5mb3JFYWNoKGNhcmQ9PntcbiAgICAgICAgICAgICAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyx0aGlzLmZsaXBDYXJkKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSkgIFxuICAgIH1cbiAgICBmbGlwQ2FyZChlKXtcbiAgICAgICAgY29uc3Qgc2VsZj1lLnRhcmdldDtcbiAgICAgICAgaWYgKHNlbGYuY2xhc3NMaXN0LmNvbnRhaW5zKCdiYWNrJykpe1xuICAgICAgICAgICBzZWxmLmNsYXNzTGlzdC5yZW1vdmUoJ2JhY2snKTtcbiAgICAgICAgICAgc2VsZi5jbGFzc0xpc3QuYWRkKCdmcm9udCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxufVxuXG5cblxuY29uc3QgdmlldyA9IG5ldyBWaWV3KCk7XG5jb25zdCBtb2RhbD1uZXcgTW9kYWwoKTtcbmNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcih2aWV3LG1vZGFsKTtcblxuY29udHJvbGxlci5pbml0aWFsaXplKCk7XG5cblxuIiwiZXhwb3J0IGludGVyZmFjZSBTdGF0ZXtcbiAgICBmbGlwRmlyc3RDYXJkKCk6dm9pZFxuICAgIGZsaXBTZWNvbmRDYXJkKCk6dm9pZFxuICAgIFxufVxuXG5leHBvcnQgY29uc3QgdXRpbGl0eSA9IHtcblxuICAgIGdldFJhbmRvbU51bWJlckFycmF5KGNvdW50KSB7XG4gICAgICAgIGNvbnN0IG51bWJlciA9IEFycmF5LmZyb20oQXJyYXkoY291bnQpLmtleXMoKSlcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSBudW1iZXIubGVuZ3RoIC0gMTsgaW5kZXggPiAwOyBpbmRleC0tKSB7XG4gICAgICAgICAgICBsZXQgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaW5kZXggKyAxKSlcbiAgICAgICAgICAgICAgICA7W251bWJlcltpbmRleF0sIG51bWJlcltyYW5kb21JbmRleF1dID0gW251bWJlcltyYW5kb21JbmRleF0sIG51bWJlcltpbmRleF1dXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bWJlclxuICAgIH0sXG5cbn1cbi8vIGNsYXNzIEF3YWl0RmlzdENhcmQgaW1wbGVtZW50cyBTdGF0ZXtcbi8vICAgICBmbGlwRmlyc3RDYXJkKCk6IHZvaWRcbi8vICAgICBmbGlwU2Vjb25kQ2FyZCgpOiB2b2lkXG5cbi8vIH1cbi8vIGNsYXNzIEF3YWl0U2Vjb25kQ2FyZCBpbXBsZW1lbnRzIFN0YXRle1xuLy8gICAgIGZsaXBGaXJzdENhcmQoKTogdm9pZFxuLy8gICAgIGZsaXBTZWNvbmRDYXJkKCk6IHZvaWRcbi8vIH1cbi8vIGV4cG9ydCBjbGFzcyBDYXJkTWF0Y2hGYWlsZWQgaW1wbGVtZW50cyBTdGF0ZXtcbi8vICAgICBmbGlwRmlyc3RDYXJkKCk6IHZvaWRcbi8vICAgICBmbGlwU2Vjb25kQ2FyZCgpOiB2b2lkXG5cbi8vIH1cbi8vIGV4cG9ydCBjbGFzcyBDYXJkTWF0Y2hlZCBpbXBsZW1lbnRzIFN0YXRle1xuLy8gICAgIGZsaXBGaXJzdENhcmQoKTogdm9pZFxuLy8gICAgIGZsaXBTZWNvbmRDYXJkKCk6IHZvaWRcblxuLy8gfVxuLy8gZXhwb3J0IGNsYXNzIEdhbWVGaW5pc2hlZCBpbXBsZW1lbnRzIFN0YXRle1xuLy8gICAgIGZsaXBGaXJzdENhcmQoKTogdm9pZFxuLy8gICAgIGZsaXBTZWNvbmRDYXJkKCk6IHZvaWRcbiAgICBcbi8vIH0iXX0=
