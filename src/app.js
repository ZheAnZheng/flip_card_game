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
//state pattern
var FirstCardAwaits = /** @class */ (function () {
    function FirstCardAwaits(controller) {
        this.controller = controller;
    }
    FirstCardAwaits.prototype.handler = function (e) {
        var num = e.target.dataset.index;
        revealedCards.push(num);
        currentState = secondCardAwaits;
    };
    FirstCardAwaits.prototype.flipCard = function (e) {
        var view = this.controller.getView();
        var self = e.target;
        if (revealedCards.length < 1 && self.classList.contains('back') && score < 260) {
            view.displayFront(self);
            view.displayActive(self);
            this.handler(e);
        }
        else {
            return;
        }
    };
    return FirstCardAwaits;
}());
var SecondCardAwaits = /** @class */ (function () {
    function SecondCardAwaits(controller) {
        this.controller = controller;
    }
    SecondCardAwaits.prototype.handler = function (e) {
        var num = e.target.dataset.index;
        revealedCards.push(num);
        var isMatched = this.controller.match(revealedCards);
        if (isMatched && score < 260) {
            currentState = matchCard;
            currentState.handler(e);
        }
        else {
            currentState = matchCardFailed;
            currentState.handler(e);
        }
    };
    SecondCardAwaits.prototype.flipCard = function (e) {
        var view = controller.getView();
        var self = e.target;
        if (revealedCards.length < 2 && self.classList.contains('back')) {
            view.displayFront(self);
            view.displayActive(self);
            this.handler(e);
        }
        else {
            return;
        }
    };
    return SecondCardAwaits;
}());
var MatchCardFailed = /** @class */ (function () {
    function MatchCardFailed(controller) {
        this.controller = controller;
    }
    //失敗時，停止兩秒蓋上牌
    MatchCardFailed.prototype.handler = function () {
        var view = this.controller.getView();
        var first = document.querySelector(".card[data-index=\"".concat(revealedCards[0], "\"]"));
        var second = document.querySelector(".card[data-index=\"".concat(revealedCards[1], "\"]"));
        setTimeout(function () {
            view.displayActive(first);
            view.displayActive(second);
            view.displayBack(first);
            view.displayBack(second);
            revealedCards.splice(0, 2);
            32;
            currentState = firstCardAwaits;
        }, 1000);
    };
    MatchCardFailed.prototype.flipCard = function () {
        return;
    };
    return MatchCardFailed;
}());
var MatchCard = /** @class */ (function () {
    function MatchCard(controller) {
        this.controller = controller;
    }
    //加分 繼續開著
    MatchCard.prototype.handler = function () {
        var view = this.controller.getView();
        var first = document.querySelector(".card[data-index=\"".concat(revealedCards[0], "\"]"));
        var second = document.querySelector(".card[data-index=\"".concat(revealedCards[1], "\"]"));
        score += 10;
        revealedCards.splice(0, 2);
        view.displayScore();
        view.displayActive(first);
        view.displayActive(second);
        view.displayDone(first);
        view.displayDone(second);
        if (score < 260) {
            currentState = firstCardAwaits;
        }
        else {
            currentState = gameFinished;
        }
    };
    MatchCard.prototype.flipCard = function () {
        return;
    };
    return MatchCard;
}());
var GameFinished = /** @class */ (function () {
    function GameFinished(controller) {
        this.controller = controller;
    }
    GameFinished.prototype.handler = function () {
        alert('you win');
    };
    GameFinished.prototype.flipCard = function (e) {
        return;
    };
    return GameFinished;
}());
var View = /** @class */ (function () {
    function View() {
    }
    View.prototype.displayCards = function (data) {
        document.querySelector('#cards').innerHTML += "\n        <div data-index=\"".concat(data.index, "\"  class=\"card back ").concat(data.name, "\">\n            <p>").concat(data.number, "</p>\n            ").concat(data.symbol, "\n            <p>").concat(data.number, "</p>\n        ");
    };
    View.prototype.displayFront = function (card) {
        card.classList.remove('back');
        card.classList.add('front');
    };
    View.prototype.displayBack = function (card) {
        card.classList.remove('front');
        card.classList.add('back');
    };
    View.prototype.displayScore = function () {
        document.querySelector('.score').innerHTML = "".concat(score);
    };
    View.prototype.displayActive = function (card) {
        if (card.classList.contains('active')) {
            card.classList.remove('active');
        }
        else {
            card.classList.add('active');
        }
    };
    View.prototype.displayDone = function (card) {
        card.classList.add('done');
    };
    return View;
}());
var Modal = /** @class */ (function () {
    function Modal() {
    }
    Modal.prototype.checkPairs = function (cards) {
        var first = this.translateNumber(cards[0]);
        var second = this.translateNumber(cards[1]);
        return first === second ? true : false;
    };
    Modal.prototype.getCardElements = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            var number, symbolData, symbolName, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        number = this.translateString((index % 13) + 1);
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
        return Number(number) % 13 + 1;
    };
    Modal.prototype.translateString = function (number) {
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
    function Controller(view, modal, index) {
        this.view = view;
        this.modal = modal;
        this.initialize(index);
    }
    Controller.prototype.initialize = function (index) {
        var _this = this;
        module_1.utility.getRandomNumberArray(index).map(function (index) { return __awaiter(_this, void 0, void 0, function () {
            var data, cards;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, modal.getCardElements(index)];
                    case 1:
                        data = _a.sent();
                        view.displayCards(data);
                        view.displayScore();
                        cards = document.querySelectorAll('.card');
                        cards.forEach(function (card) {
                            card.addEventListener('click', _this.flipCard);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    Controller.prototype.match = function (cards) {
        return this.modal.checkPairs(cards);
    };
    Controller.prototype.flipCard = function (e) {
        currentState.flipCard(e);
    };
    Controller.prototype.getView = function () {
        return this.view;
    };
    return Controller;
}());
var view = new View();
var modal = new Modal();
var controller = new Controller(view, modal, 52);
var firstCardAwaits = new FirstCardAwaits(controller);
var secondCardAwaits = new SecondCardAwaits(controller);
var matchCardFailed = new MatchCardFailed(controller);
var matchCard = new MatchCard(controller);
var gameFinished = new GameFinished(controller);
var revealedCards = [];
var score = 0;
var currentState = firstCardAwaits;

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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLnRzIiwic3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsbUNBQTBDO0FBQzFDLGVBQWU7QUFDZjtJQUVJLHlCQUFZLFVBQVU7UUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFFakMsQ0FBQztJQUNELGlDQUFPLEdBQVAsVUFBUSxDQUFDO1FBQ0wsSUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ25DLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIsWUFBWSxHQUFHLGdCQUFnQixDQUFDO0lBQ3BDLENBQUM7SUFDRCxrQ0FBUSxHQUFSLFVBQVMsQ0FBQztRQUNOLElBQU0sSUFBSSxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDckMsSUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUV0QixJQUFJLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssR0FBQyxHQUFHLEVBQUM7WUFFekUsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDbEI7YUFBSTtZQUNELE9BQU87U0FDVjtJQUVMLENBQUM7SUFFTCxzQkFBQztBQUFELENBMUJBLEFBMEJDLElBQUE7QUFDRDtJQUVJLDBCQUFZLFVBQVU7UUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQUNELGtDQUFPLEdBQVAsVUFBUSxDQUFDO1FBQ0wsSUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ25DLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEIsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFdkQsSUFBSSxTQUFTLElBQUksS0FBSyxHQUFHLEdBQUcsRUFBRTtZQUMxQixZQUFZLEdBQUcsU0FBUyxDQUFDO1lBQ3pCLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0I7YUFBTTtZQUNILFlBQVksR0FBRyxlQUFlLENBQUM7WUFDL0IsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFDRCxtQ0FBUSxHQUFSLFVBQVMsQ0FBQztRQUNOLElBQU0sSUFBSSxHQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoQyxJQUFNLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3RCLElBQUksYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDN0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXpCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FFbkI7YUFBTTtZQUNILE9BQU87U0FDVjtJQUNMLENBQUM7SUFFTCx1QkFBQztBQUFELENBaENBLEFBZ0NDLElBQUE7QUFDRDtJQUdJLHlCQUFZLFVBQVU7UUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDakMsQ0FBQztJQUNELGFBQWE7SUFDYixpQ0FBTyxHQUFQO1FBQ0ksSUFBTSxJQUFJLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyQyxJQUFNLEtBQUssR0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLDZCQUFxQixhQUFhLENBQUMsQ0FBQyxDQUFDLFFBQUksQ0FBQyxDQUFDO1FBQzlFLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsNkJBQXFCLGFBQWEsQ0FBQyxDQUFDLENBQUMsUUFBSSxDQUFDLENBQUM7UUFDakYsVUFBVSxDQUFDO1lBQ1AsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6QixhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUFBLEVBQUUsQ0FBQTtZQUM1QixZQUFZLEdBQUMsZUFBZSxDQUFDO1FBQ2pDLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQTtJQUVYLENBQUM7SUFDRCxrQ0FBUSxHQUFSO1FBQ0ksT0FBTztJQUNYLENBQUM7SUFFTCxzQkFBQztBQUFELENBekJBLEFBeUJDLElBQUE7QUFDRDtJQUVJLG1CQUFZLFVBQVU7UUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUE7SUFDaEMsQ0FBQztJQUNELFNBQVM7SUFDVCwyQkFBTyxHQUFQO1FBQ0ksSUFBTSxJQUFJLEdBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0QyxJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLDZCQUFxQixhQUFhLENBQUMsQ0FBQyxDQUFDLFFBQUksQ0FBQyxDQUFBO1FBQy9FLElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsNkJBQXFCLGFBQWEsQ0FBQyxDQUFDLENBQUMsUUFBSSxDQUFDLENBQUE7UUFDaEYsS0FBSyxJQUFFLEVBQUUsQ0FBQztRQUNWLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLElBQUcsS0FBSyxHQUFDLEdBQUcsRUFBQztZQUNULFlBQVksR0FBQyxlQUFlLENBQUM7U0FDaEM7YUFBSTtZQUNELFlBQVksR0FBQyxZQUFZLENBQUM7U0FDN0I7SUFDTCxDQUFDO0lBQ0QsNEJBQVEsR0FBUjtRQUNJLE9BQU07SUFDVixDQUFDO0lBRUwsZ0JBQUM7QUFBRCxDQTNCQSxBQTJCQyxJQUFBO0FBQ0Q7SUFFSSxzQkFBWSxVQUFVO1FBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFBO0lBQ2hDLENBQUM7SUFDRCw4QkFBTyxHQUFQO1FBQ0ksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFDRCwrQkFBUSxHQUFSLFVBQVMsQ0FBQztRQUNOLE9BQU07SUFDVixDQUFDO0lBRUwsbUJBQUM7QUFBRCxDQVpBLEFBWUMsSUFBQTtBQUVEO0lBQUE7SUFrQ0EsQ0FBQztJQWhDRywyQkFBWSxHQUFaLFVBQWEsSUFBSTtRQUViLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxJQUFJLHNDQUMzQixJQUFJLENBQUMsS0FBSyxtQ0FBdUIsSUFBSSxDQUFDLElBQUksaUNBQ3BELElBQUksQ0FBQyxNQUFNLCtCQUNkLElBQUksQ0FBQyxNQUFNLDhCQUNSLElBQUksQ0FBQyxNQUFNLG1CQUNuQixDQUFBO0lBQ0wsQ0FBQztJQUNELDJCQUFZLEdBQVosVUFBYSxJQUFJO1FBQ2IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNELDBCQUFXLEdBQVgsVUFBWSxJQUFJO1FBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNELDJCQUFZLEdBQVo7UUFDSSxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsR0FBQyxVQUFHLEtBQUssQ0FBRSxDQUFDO0lBQzFELENBQUM7SUFDRCw0QkFBYSxHQUFiLFVBQWMsSUFBSTtRQUNkLElBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUM7WUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDbkM7YUFBSTtZQUVELElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUNELDBCQUFXLEdBQVgsVUFBWSxJQUFJO1FBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVMLFdBQUM7QUFBRCxDQWxDQSxBQWtDQyxJQUFBO0FBRUQ7SUFBQTtJQTBEQSxDQUFDO0lBdkRHLDBCQUFVLEdBQVYsVUFBVyxLQUFLO1FBRVosSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRzdDLE9BQU8sS0FBSyxLQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUEsSUFBSSxDQUFDLENBQUMsQ0FBQSxLQUFLLENBQUM7SUFDeEMsQ0FBQztJQUVLLCtCQUFlLEdBQXJCLFVBQXNCLEtBQUs7Ozs7Ozt3QkFDbkIsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ2pDLHFCQUFNLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBQTs7d0JBQXBDLFVBQVUsR0FBRyxTQUF1Qjt3QkFDcEMsVUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQTt3QkFDekQsTUFBTSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBRS9DLHNCQUFPLEVBQUUsTUFBTSxRQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLE9BQUEsRUFBRSxFQUFBOzs7O0tBQ3JEO0lBQ0QsK0JBQWUsR0FBZixVQUFnQixNQUFhO1FBQ3pCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFDLEVBQUUsR0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNELCtCQUFlLEdBQWYsVUFBZ0IsTUFBTTtRQUNsQixRQUFRLE1BQU0sRUFBRTtZQUNaLEtBQUssQ0FBQztnQkFDRixPQUFPLEdBQUcsQ0FBQztZQUNmLEtBQUssRUFBRTtnQkFDSCxPQUFPLEdBQUcsQ0FBQztZQUNmLEtBQUssRUFBRTtnQkFDSCxPQUFPLEdBQUcsQ0FBQztZQUNmLEtBQUssRUFBRTtnQkFDSCxPQUFPLEdBQUcsQ0FBQztZQUNmO2dCQUNJLE9BQU8sTUFBTSxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQztJQUNELCtCQUFlLEdBQWYsVUFBZ0IsTUFBYztRQUMxQixRQUFRLE1BQU0sRUFBRTtZQUNaLEtBQUssQ0FBQztnQkFDRixPQUFPLE9BQU8sQ0FBQztZQUNuQixLQUFLLENBQUM7Z0JBQ0YsT0FBTyxPQUFPLENBQUM7WUFDbkIsS0FBSyxDQUFDO2dCQUNGLE9BQU8sU0FBUyxDQUFDO1lBQ3JCLEtBQUssQ0FBQztnQkFDRixPQUFPLE1BQU0sQ0FBQTtTQUVwQjtJQUNMLENBQUM7SUFFSywwQkFBVSxHQUFoQjs7Ozs7NEJBQ3FCLHFCQUFNLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxFQUFBOzt3QkFBekQsUUFBUSxHQUFHLFNBQThDO3dCQUMxQyxxQkFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUE7O3dCQUFwQyxZQUFZLEdBQUcsU0FBcUI7d0JBQzFDLHNCQUFPLFlBQVksRUFBQTs7OztLQUd0QjtJQUNMLFlBQUM7QUFBRCxDQTFEQSxBQTBEQyxJQUFBO0FBQ0Q7SUFJSSxvQkFBWSxJQUFVLEVBQUUsS0FBWSxFQUFFLEtBQUs7UUFDdkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUUzQixDQUFDO0lBRUQsK0JBQVUsR0FBVixVQUFXLEtBQUs7UUFBaEIsaUJBYUM7UUFYRyxnQkFBTyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFPLEtBQUs7Ozs7OzRCQUNuQyxxQkFBTSxLQUFLLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFBOzt3QkFBekMsSUFBSSxHQUFHLFNBQWtDO3dCQUUvQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN4QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7d0JBQ2QsS0FBSyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDakQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7NEJBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ2xELENBQUMsQ0FBQyxDQUFBOzs7O2FBRUwsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUdELDBCQUFLLEdBQUwsVUFBTSxLQUFvQjtRQUV0QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXhDLENBQUM7SUFFRCw2QkFBUSxHQUFSLFVBQVMsQ0FBQztRQUVOLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFHN0IsQ0FBQztJQUNELDRCQUFPLEdBQVA7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVMLGlCQUFDO0FBQUQsQ0EzQ0EsQUEyQ0MsSUFBQTtBQUVELElBQU0sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDeEIsSUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztBQUMxQixJQUFNLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRW5ELElBQU0sZUFBZSxHQUFVLElBQUksZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQy9ELElBQU0sZ0JBQWdCLEdBQVUsSUFBSSxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNqRSxJQUFNLGVBQWUsR0FBVSxJQUFJLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMvRCxJQUFNLFNBQVMsR0FBVSxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUNsRCxJQUFNLFlBQVksR0FBVSxJQUFJLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN6RCxJQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFDekIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQ2QsSUFBSSxZQUFZLEdBQVUsZUFBZSxDQUFDOzs7Ozs7QUNsUjdCLFFBQUEsT0FBTyxHQUFHO0lBRW5CLG9CQUFvQixZQUFDLEtBQUs7O1FBQ3RCLElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7UUFDOUMsS0FBSyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQ3BELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQ3BEO1lBQUEsS0FBdUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQTFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBQSxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBQSxDQUF3QztTQUNuRjtRQUNELE9BQU8sTUFBTSxDQUFBO0lBQ2pCLENBQUM7Q0FFSixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IHsgU3RhdGUsIHV0aWxpdHkgfSBmcm9tICcuL21vZHVsZSc7XG4vL3N0YXRlIHBhdHRlcm5cbmNsYXNzIEZpcnN0Q2FyZEF3YWl0cyBpbXBsZW1lbnRzIFN0YXRlIHtcbiAgICBjb250cm9sbGVyO1xuICAgIGNvbnN0cnVjdG9yKGNvbnRyb2xsZXIpIHtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gY29udHJvbGxlcjtcbiAgICAgICAgXG4gICAgfVxuICAgIGhhbmRsZXIoZSkge1xuICAgICAgICBjb25zdCBudW0gPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4O1xuICAgICAgICByZXZlYWxlZENhcmRzLnB1c2gobnVtKTtcbiAgICAgICAgY3VycmVudFN0YXRlID0gc2Vjb25kQ2FyZEF3YWl0cztcbiAgICB9XG4gICAgZmxpcENhcmQoZSk6IHZvaWQge1xuICAgICAgICBjb25zdCB2aWV3PXRoaXMuY29udHJvbGxlci5nZXRWaWV3KCk7XG4gICAgICAgIGNvbnN0IHNlbGYgPSBlLnRhcmdldDtcbiAgICAgICAgXG4gICAgICAgIGlmIChyZXZlYWxlZENhcmRzLmxlbmd0aCA8IDEgJiYgc2VsZi5jbGFzc0xpc3QuY29udGFpbnMoJ2JhY2snKSAmJiBzY29yZTwyNjApe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2aWV3LmRpc3BsYXlGcm9udChzZWxmKTtcbiAgICAgICAgICAgIHZpZXcuZGlzcGxheUFjdGl2ZShzZWxmKVxuICAgICAgICAgICAgdGhpcy5oYW5kbGVyKGUpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxufVxuY2xhc3MgU2Vjb25kQ2FyZEF3YWl0cyBpbXBsZW1lbnRzIFN0YXRlIHtcbiAgICBjb250cm9sbGVyO1xuICAgIGNvbnN0cnVjdG9yKGNvbnRyb2xsZXIpIHtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gY29udHJvbGxlcjtcbiAgICB9XG4gICAgaGFuZGxlcihlKSB7XG4gICAgICAgIGNvbnN0IG51bSA9IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXg7XG4gICAgICAgIHJldmVhbGVkQ2FyZHMucHVzaChudW0pO1xuICAgICAgICBjb25zdCBpc01hdGNoZWQgPSB0aGlzLmNvbnRyb2xsZXIubWF0Y2gocmV2ZWFsZWRDYXJkcyk7XG5cbiAgICAgICAgaWYgKGlzTWF0Y2hlZCAmJiBzY29yZSA8IDI2MCkge1xuICAgICAgICAgICAgY3VycmVudFN0YXRlID0gbWF0Y2hDYXJkO1xuICAgICAgICAgICAgY3VycmVudFN0YXRlLmhhbmRsZXIoZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50U3RhdGUgPSBtYXRjaENhcmRGYWlsZWQ7XG4gICAgICAgICAgICBjdXJyZW50U3RhdGUuaGFuZGxlcihlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmbGlwQ2FyZChlKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHZpZXc9Y29udHJvbGxlci5nZXRWaWV3KCk7XG4gICAgICAgIGNvbnN0IHNlbGYgPSBlLnRhcmdldDtcbiAgICAgICAgaWYgKHJldmVhbGVkQ2FyZHMubGVuZ3RoIDwgMiAmJiBzZWxmLmNsYXNzTGlzdC5jb250YWlucygnYmFjaycpKSB7XG4gICAgICAgICAgICB2aWV3LmRpc3BsYXlGcm9udChzZWxmKTtcbiAgICAgICAgICAgIHZpZXcuZGlzcGxheUFjdGl2ZShzZWxmKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5oYW5kbGVyKGUpO1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbmNsYXNzIE1hdGNoQ2FyZEZhaWxlZCBpbXBsZW1lbnRzIFN0YXRlIHtcblxuICAgIGNvbnRyb2xsZXI7XG4gICAgY29uc3RydWN0b3IoY29udHJvbGxlcikge1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBjb250cm9sbGVyO1xuICAgIH1cbiAgICAvL+WkseaVl+aZgu+8jOWBnOatouWFqeenkuiTi+S4iueJjFxuICAgIGhhbmRsZXIoKSB7XG4gICAgICAgIGNvbnN0IHZpZXc9dGhpcy5jb250cm9sbGVyLmdldFZpZXcoKTtcbiAgICAgICAgY29uc3QgZmlyc3Q9ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNhcmRbZGF0YS1pbmRleD1cIiR7cmV2ZWFsZWRDYXJkc1swXX1cIl1gKTtcbiAgICAgICAgY29uc3Qgc2Vjb25kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNhcmRbZGF0YS1pbmRleD1cIiR7cmV2ZWFsZWRDYXJkc1sxXX1cIl1gKTtcbiAgICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgdmlldy5kaXNwbGF5QWN0aXZlKGZpcnN0KTtcbiAgICAgICAgICAgIHZpZXcuZGlzcGxheUFjdGl2ZShzZWNvbmQpO1xuICAgICAgICAgICAgdmlldy5kaXNwbGF5QmFjayhmaXJzdCk7XG4gICAgICAgICAgICB2aWV3LmRpc3BsYXlCYWNrKHNlY29uZCk7XG4gICAgICAgICAgICByZXZlYWxlZENhcmRzLnNwbGljZSgwLDIpOzMyXG4gICAgICAgICAgICBjdXJyZW50U3RhdGU9Zmlyc3RDYXJkQXdhaXRzO1xuICAgICAgICB9LDEwMDApXG4gICAgICAgIFxuICAgIH1cbiAgICBmbGlwQ2FyZCgpOiB2b2lkIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxufVxuY2xhc3MgTWF0Y2hDYXJkIGltcGxlbWVudHMgU3RhdGUge1xuICAgIGNvbnRyb2xsZXI7XG4gICAgY29uc3RydWN0b3IoY29udHJvbGxlcikge1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBjb250cm9sbGVyXG4gICAgfVxuICAgIC8v5Yqg5YiGIOe5vOe6jOmWi+iRl1xuICAgIGhhbmRsZXIoKSB7XG4gICAgICAgIGNvbnN0IHZpZXcgPXRoaXMuY29udHJvbGxlci5nZXRWaWV3KCk7XG4gICAgICAgIGNvbnN0IGZpcnN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNhcmRbZGF0YS1pbmRleD1cIiR7cmV2ZWFsZWRDYXJkc1swXX1cIl1gKVxuICAgICAgICBjb25zdCBzZWNvbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY2FyZFtkYXRhLWluZGV4PVwiJHtyZXZlYWxlZENhcmRzWzFdfVwiXWApXG4gICAgICAgIHNjb3JlKz0xMDtcbiAgICAgICAgcmV2ZWFsZWRDYXJkcy5zcGxpY2UoMCwyKTtcbiAgICAgICAgdmlldy5kaXNwbGF5U2NvcmUoKTtcbiAgICAgICAgdmlldy5kaXNwbGF5QWN0aXZlKGZpcnN0KTtcbiAgICAgICAgdmlldy5kaXNwbGF5QWN0aXZlKHNlY29uZCk7XG4gICAgICAgIHZpZXcuZGlzcGxheURvbmUoZmlyc3QpO1xuICAgICAgICB2aWV3LmRpc3BsYXlEb25lKHNlY29uZCk7XG4gICAgICAgIGlmKHNjb3JlPDI2MCl7XG4gICAgICAgICAgICBjdXJyZW50U3RhdGU9Zmlyc3RDYXJkQXdhaXRzO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZT1nYW1lRmluaXNoZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmxpcENhcmQoKTogdm9pZCB7XG4gICAgICAgIHJldHVyblxuICAgIH1cblxufVxuY2xhc3MgR2FtZUZpbmlzaGVkIGltcGxlbWVudHMgU3RhdGUge1xuICAgIGNvbnRyb2xsZXI7XG4gICAgY29uc3RydWN0b3IoY29udHJvbGxlcikge1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBjb250cm9sbGVyXG4gICAgfVxuICAgIGhhbmRsZXIoKSB7XG4gICAgICAgIGFsZXJ0KCd5b3Ugd2luJyk7XG4gICAgfVxuICAgIGZsaXBDYXJkKGUpOiB2b2lkIHtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG59XG5cbmNsYXNzIFZpZXcge1xuXG4gICAgZGlzcGxheUNhcmRzKGRhdGEpOiB2b2lkIHtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FyZHMnKS5pbm5lckhUTUwgKz0gYFxuICAgICAgICA8ZGl2IGRhdGEtaW5kZXg9XCIke2RhdGEuaW5kZXh9XCIgIGNsYXNzPVwiY2FyZCBiYWNrICR7ZGF0YS5uYW1lfVwiPlxuICAgICAgICAgICAgPHA+JHtkYXRhLm51bWJlcn08L3A+XG4gICAgICAgICAgICAke2RhdGEuc3ltYm9sfVxuICAgICAgICAgICAgPHA+JHtkYXRhLm51bWJlcn08L3A+XG4gICAgICAgIGBcbiAgICB9XG4gICAgZGlzcGxheUZyb250KGNhcmQpe1xuICAgICAgICBjYXJkLmNsYXNzTGlzdC5yZW1vdmUoJ2JhY2snKTtcbiAgICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdmcm9udCcpO1xuICAgIH1cbiAgICBkaXNwbGF5QmFjayhjYXJkKXtcbiAgICAgICAgY2FyZC5jbGFzc0xpc3QucmVtb3ZlKCdmcm9udCcpO1xuICAgICAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2JhY2snKTtcbiAgICB9XG4gICAgZGlzcGxheVNjb3JlKCl7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY29yZScpLmlubmVySFRNTD1gJHtzY29yZX1gO1xuICAgIH1cbiAgICBkaXNwbGF5QWN0aXZlKGNhcmQpe1xuICAgICAgICBpZihjYXJkLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpe1xuICAgICAgICAgICAgY2FyZC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIH0gICBcbiAgICB9XG4gICAgZGlzcGxheURvbmUoY2FyZCl7XG4gICAgICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnZG9uZScpO1xuICAgIH1cblxufVxuXG5jbGFzcyBNb2RhbCB7XG5cbiAgICBcbiAgICBjaGVja1BhaXJzKGNhcmRzKTpCb29sZWFuIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGZpcnN0ID0gdGhpcy50cmFuc2xhdGVOdW1iZXIoY2FyZHNbMF0pO1xuICAgICAgICBjb25zdCBzZWNvbmQgPSB0aGlzLnRyYW5zbGF0ZU51bWJlcihjYXJkc1sxXSlcblxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGZpcnN0ID09PXNlY29uZCA/dHJ1ZSA6ZmFsc2U7XG4gICAgfVxuICAgIFxuICAgIGFzeW5jIGdldENhcmRFbGVtZW50cyhpbmRleCk6IFByb21pc2U8T2JqZWN0PiB7XG4gICAgICAgIGxldCBudW1iZXIgPSB0aGlzLnRyYW5zbGF0ZVN0cmluZygoaW5kZXggJSAxMykgKyAxKTtcbiAgICAgICAgY29uc3Qgc3ltYm9sRGF0YSA9IGF3YWl0IHRoaXMuZ2V0U3ltYm9scygpO1xuICAgICAgICBjb25zdCBzeW1ib2xOYW1lID0gdGhpcy50cmFuc2xhdGVTeW1ib2woTWF0aC5mbG9vcihpbmRleCAvIDEzKSlcbiAgICAgICAgY29uc3Qgc3ltYm9sID0gc3ltYm9sRGF0YVtzeW1ib2xOYW1lXS5qb2luKCcnKTtcblxuICAgICAgICByZXR1cm4geyBudW1iZXIsIHN5bWJvbCwgbmFtZTogc3ltYm9sTmFtZSwgaW5kZXggfVxuICAgIH1cbiAgICB0cmFuc2xhdGVOdW1iZXIobnVtYmVyOnN0cmluZyl7XG4gICAgICAgIHJldHVybiBOdW1iZXIobnVtYmVyKSUxMysxO1xuICAgIH1cbiAgICB0cmFuc2xhdGVTdHJpbmcobnVtYmVyKTogc3RyaW5nIHwgbnVtYmVyIHtcbiAgICAgICAgc3dpdGNoIChudW1iZXIpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJBXCI7XG4gICAgICAgICAgICBjYXNlIDExOlxuICAgICAgICAgICAgICAgIHJldHVybiBcIkpcIjtcbiAgICAgICAgICAgIGNhc2UgMTI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiUVwiO1xuICAgICAgICAgICAgY2FzZSAxMzpcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJLXCI7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBudW1iZXI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdHJhbnNsYXRlU3ltYm9sKG51bWJlcjogbnVtYmVyKTogc3RyaW5nIHtcbiAgICAgICAgc3dpdGNoIChudW1iZXIpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2hlYXJ0JztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3NwYWRlJztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2RpYW1vbmQnO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiAnY2x1YidcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0U3ltYm9scygpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cDovLzE5Mi4xNjguMzEuMTU1OjMwMDAvY2FyZCcpO1xuICAgICAgICBjb25zdCByZXNwb25zZURhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHJldHVybiByZXNwb25zZURhdGFcblxuXG4gICAgfVxufVxuY2xhc3MgQ29udHJvbGxlciB7XG4gICAgdmlldzogVmlldztcbiAgICBtb2RhbDogTW9kYWw7XG5cbiAgICBjb25zdHJ1Y3Rvcih2aWV3OiBWaWV3LCBtb2RhbDogTW9kYWwsIGluZGV4KSB7XG4gICAgICAgIHRoaXMudmlldyA9IHZpZXc7XG4gICAgICAgIHRoaXMubW9kYWwgPSBtb2RhbDtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKGluZGV4KTtcblxuICAgIH1cblxuICAgIGluaXRpYWxpemUoaW5kZXgpIHtcblxuICAgICAgICB1dGlsaXR5LmdldFJhbmRvbU51bWJlckFycmF5KGluZGV4KS5tYXAoYXN5bmMgKGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgbW9kYWwuZ2V0Q2FyZEVsZW1lbnRzKGluZGV4KTtcblxuICAgICAgICAgICAgdmlldy5kaXNwbGF5Q2FyZHMoZGF0YSk7XG4gICAgICAgICAgICB2aWV3LmRpc3BsYXlTY29yZSgpO1xuICAgICAgICAgICAgY29uc3QgY2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FyZCcpO1xuICAgICAgICAgICAgY2FyZHMuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgICAgICAgICBjYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5mbGlwQ2FyZCk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgXG4gICAgbWF0Y2goY2FyZHMgOkFycmF5PG51bWJlcj4pOkJvb2xlYW57XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy5tb2RhbC5jaGVja1BhaXJzKGNhcmRzKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZmxpcENhcmQoZSl7XG4gICAgICAgIFxuICAgICAgICBjdXJyZW50U3RhdGUuZmxpcENhcmQoZSk7XG4gICAgICAgIFxuICAgICAgIFxuICAgIH1cbiAgICBnZXRWaWV3KCl7XG4gICAgICAgIHJldHVybiB0aGlzLnZpZXc7XG4gICAgfVxuXG59XG5cbmNvbnN0IHZpZXcgPSBuZXcgVmlldygpO1xuY29uc3QgbW9kYWwgPSBuZXcgTW9kYWwoKTtcbmNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcih2aWV3LCBtb2RhbCwgNTIpO1xuXG5jb25zdCBmaXJzdENhcmRBd2FpdHM6IFN0YXRlID0gbmV3IEZpcnN0Q2FyZEF3YWl0cyhjb250cm9sbGVyKTtcbmNvbnN0IHNlY29uZENhcmRBd2FpdHM6IFN0YXRlID0gbmV3IFNlY29uZENhcmRBd2FpdHMoY29udHJvbGxlcik7XG5jb25zdCBtYXRjaENhcmRGYWlsZWQ6IFN0YXRlID0gbmV3IE1hdGNoQ2FyZEZhaWxlZChjb250cm9sbGVyKTtcbmNvbnN0IG1hdGNoQ2FyZDogU3RhdGUgPSBuZXcgTWF0Y2hDYXJkKGNvbnRyb2xsZXIpXG5jb25zdCBnYW1lRmluaXNoZWQ6IFN0YXRlID0gbmV3IEdhbWVGaW5pc2hlZChjb250cm9sbGVyKTtcbmNvbnN0IHJldmVhbGVkQ2FyZHMgPSBbXTtcbmxldCBzY29yZSA9IDA7XG5sZXQgY3VycmVudFN0YXRlOiBTdGF0ZSA9IGZpcnN0Q2FyZEF3YWl0cztcbiIsImV4cG9ydCBpbnRlcmZhY2UgU3RhdGV7XG4gICAgaGFuZGxlcihlKTtcbiAgICBcbiAgICBmbGlwQ2FyZChlOkV2ZW50KTp2b2lkXG4gXG59XG5cbmV4cG9ydCBjb25zdCB1dGlsaXR5ID0ge1xuXG4gICAgZ2V0UmFuZG9tTnVtYmVyQXJyYXkoY291bnQpIHtcbiAgICAgICAgY29uc3QgbnVtYmVyID0gQXJyYXkuZnJvbShBcnJheShjb3VudCkua2V5cygpKVxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IG51bWJlci5sZW5ndGggLSAxOyBpbmRleCA+IDA7IGluZGV4LS0pIHtcbiAgICAgICAgICAgIGxldCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpbmRleCArIDEpKVxuICAgICAgICAgICAgICAgIDtbbnVtYmVyW2luZGV4XSwgbnVtYmVyW3JhbmRvbUluZGV4XV0gPSBbbnVtYmVyW3JhbmRvbUluZGV4XSwgbnVtYmVyW2luZGV4XV1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVtYmVyXG4gICAgfSxcblxufVxuIl19
