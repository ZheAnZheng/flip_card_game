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
var AwaitFirstCard = /** @class */ (function () {
    function AwaitFirstCard() {
    }
    AwaitFirstCard.prototype.flipFirstCard = function () {
        console.log('shot');
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
        utility.getRandomNumberArray(52).map(function (index) { return __awaiter(_this, void 0, void 0, function () {
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
var utility = {
    //洗還邏輯
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
var view = new View();
var modal = new Modal();
var controller = new Controller(view, modal);
controller.initialize();
var cards = document.querySelectorAll('.card');

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNFQTtJQUFBO0lBUUEsQ0FBQztJQVBHLHNDQUFhLEdBQWI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFDRCx1Q0FBYyxHQUFkO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUNqQixDQUFDO0lBRUwscUJBQUM7QUFBRCxDQVJBLEFBUUMsSUFBQTtBQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDNUI7SUFBQTtJQWFBLENBQUM7SUFYRywyQkFBWSxHQUFaLFVBQWEsSUFBSTtRQUViLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxJQUFJLG9DQUM3QixJQUFJLENBQUMsS0FBSyxtQ0FBdUIsSUFBSSxDQUFDLElBQUksaUNBQ2xELElBQUksQ0FBQyxNQUFNLCtCQUNkLElBQUksQ0FBQyxNQUFNLDhCQUNSLElBQUksQ0FBQyxNQUFNLG1CQUNuQixDQUFBO0lBRUwsQ0FBQztJQUVMLFdBQUM7QUFBRCxDQWJBLEFBYUMsSUFBQTtBQUNEO0lBQUE7UUFFSSxlQUFVLEdBQUc7WUFDVCxlQUFlLEVBQUUsaUJBQWlCO1lBQ2xDLGdCQUFnQixFQUFFLGlCQUFpQjtZQUNuQyxlQUFlLEVBQUUsaUJBQWlCO1lBQ2xDLFdBQVcsRUFBRSxhQUFhO1lBQzFCLFlBQVksRUFBRSxjQUFjO1NBQy9CLENBQUE7UUFDTyxrQkFBYSxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDO1FBQ3RELGtCQUFhLEdBQUMsRUFBRSxDQUFDO1FBQ2pCLFVBQUssR0FBQyxDQUFDLENBQUM7SUE2Q1osQ0FBQztJQTNDUywrQkFBZSxHQUFy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QUMsT0FBTyxDQUFDLENBQUM7U0FDOUI7SUFDTCxDQUFDO0lBRUwsaUJBQUM7QUFBRCxDQXpCQSxBQXlCQyxJQUFBO0FBQ0QsSUFBTSxPQUFPLEdBQUc7SUFDWixNQUFNO0lBQ04sb0JBQW9CLFlBQUMsS0FBSzs7UUFDdEIsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUM5QyxLQUFLLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDcEQsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FDcEQ7WUFBQSxLQUF1QyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBMUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFBLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFBLENBQXdDO1NBQ25GO1FBQ0QsT0FBTyxNQUFNLENBQUE7SUFDakIsQ0FBQztDQUVKLENBQUE7QUFHRCxJQUFNLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ3hCLElBQU0sS0FBSyxHQUFDLElBQUksS0FBSyxFQUFFLENBQUM7QUFDeEIsSUFBTSxVQUFVLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFDLEtBQUssQ0FBQyxDQUFDO0FBRTlDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUN4QixJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQge1N0YXRlfSBmcm9tJy4vc3RhdGVQYXR0ZXJuJztcblxuY2xhc3MgQXdhaXRGaXJzdENhcmQgaW1wbGVtZW50cyBTdGF0ZXtcbiAgICBmbGlwRmlyc3RDYXJkKCk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZygnc2hvdCcpXG4gICAgfVxuICAgIGZsaXBTZWNvbmRDYXJkKCk6IHZvaWQge1xuICAgICAgY29uc29sZS5sb2coJycpXG4gICAgfVxuXG59XG5jb25zb2xlLmxvZyhBd2FpdEZpcnN0Q2FyZCk7XG5jbGFzcyBWaWV3IHtcbiAgICBcbiAgICBkaXNwbGF5Q2FyZHMoZGF0YSk6dm9pZCB7XG4gICAgICAgIFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FyZHMnKS5pbm5lckhUTUwgKz0gYFxuICAgICAgICA8ZGl2IGRhdGEtc2V0PVwiJHtkYXRhLmluZGV4fVwiICBjbGFzcz1cImNhcmQgYmFjayAke2RhdGEubmFtZX1cIj5cbiAgICAgICAgICAgIDxwPiR7ZGF0YS5udW1iZXJ9PC9wPlxuICAgICAgICAgICAgJHtkYXRhLnN5bWJvbH1cbiAgICAgICAgICAgIDxwPiR7ZGF0YS5udW1iZXJ9PC9wPlxuICAgICAgICBgXG5cbiAgICB9XG4gICAgXG59XG5jbGFzcyBNb2RhbHtcblxuICAgIEdBTUVfU1RBVEUgPSB7XG4gICAgICAgIEZpcnN0Q2FyZEF3YWl0czogJ0ZpcnN0Q2FyZEF3YWl0cycsXG4gICAgICAgIFNlY29uZENhcmRBd2FpdHM6ICdTZWNlbmRDYXJkQXdhaXQnLFxuICAgICAgICBDYXJkTWF0Y2hGYWlsZWQ6ICdDYXJkTWF0Y2hGYWlsZWQnLFxuICAgICAgICBDYXJkTWF0Y2hlZDogJ0NhcmRNYXRjaGVkJyxcbiAgICAgICAgR2FtZUZpbmlzaGVkOiAnR2FtZUZpbmlzaGVkJ1xuICAgIH1cbiAgICBwcml2YXRlIGN1cnJlbnRfc3RhdGU9dGhpcy5HQU1FX1NUQVRFLkZpcnN0Q2FyZEF3YWl0cztcbiAgICByZXZlYWxlZENhcmRzPVtdO1xuICAgIHNjb3JlPTA7XG5cbiAgICBhc3luYyBnZXRDYXJkRWxlbWVudHMoaW5kZXgpOlByb21pc2U8T2JqZWN0PntcbiAgICAgICAgbGV0IG51bWJlcj10aGlzLnRyYW5zbGF0ZU51bWJlcigoaW5kZXglMTMpKzEpO1xuICAgICAgICBjb25zdCBzeW1ib2xEYXRhPWF3YWl0IHRoaXMuZ2V0U3ltYm9scygpO1xuICAgICAgICBjb25zdCBzeW1ib2xOYW1lID0gdGhpcy50cmFuc2xhdGVTeW1ib2woTWF0aC5mbG9vcihpbmRleCAvIDEzKSlcbiAgICAgICAgY29uc3Qgc3ltYm9sID0gc3ltYm9sRGF0YVtzeW1ib2xOYW1lXS5qb2luKCcnKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB7IG51bWJlciwgc3ltYm9sLCBuYW1lOiBzeW1ib2xOYW1lLGluZGV4fVxuICAgIH1cbiAgICB0cmFuc2xhdGVOdW1iZXIobnVtYmVyKTpzdHJpbmd8bnVtYmVye1xuICAgICAgICBzd2l0Y2gobnVtYmVyKXtcbiAgICAgICAgICAgIGNhc2UgMTogXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiQVwiO1xuICAgICAgICAgICAgY2FzZSAxMSA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiSlwiO1xuICAgICAgICAgICAgY2FzZSAxMiA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiUVwiO1xuICAgICAgICAgICAgY2FzZSAxMyA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiS1wiO1xuICAgICAgICAgICAgZGVmYXVsdCA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bWJlcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0cmFuc2xhdGVTeW1ib2wobnVtYmVyOm51bWJlcik6c3RyaW5ne1xuICAgICAgICBzd2l0Y2gobnVtYmVyKXtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2hlYXJ0JztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3NwYWRlJztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2RpYW1vbmQnO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIHJldHVybiAnY2x1YidcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0U3ltYm9scygpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2U9YXdhaXQgZmV0Y2goJ2h0dHA6Ly8xOTIuMTY4LjMxLjE1NTozMDAwL2NhcmQnKTtcbiAgICAgICAgY29uc3QgcmVzcG9uc2VEYXRhPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIHJldHVybiByZXNwb25zZURhdGFcbiAgICAgICAgXG4gICAgICAgIFxuICAgIH1cbn1cblxuY2xhc3MgQ29udHJvbGxlcntcbiAgICB2aWV3OlZpZXc7XG4gICAgbW9kYWw6TW9kYWw7XG4gICAgY29uc3RydWN0b3IodmlldzpWaWV3ICxtb2RhbDpNb2RhbCl7XG4gICAgICAgIHRoaXMudmlldyA9dmlldztcbiAgICAgICAgdGhpcy5tb2RhbD1tb2RhbDtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZSgpe1xuICAgICAgICB1dGlsaXR5LmdldFJhbmRvbU51bWJlckFycmF5KDUyKS5tYXAoYXN5bmMgKGluZGV4KT0+e1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IG1vZGFsLmdldENhcmRFbGVtZW50cyhpbmRleCk7XG4gICAgICAgICAgICB2aWV3LmRpc3BsYXlDYXJkcyhkYXRhKTtcbiAgICAgICAgICAgIGNvbnN0IGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmQnKTtcbiAgICAgICAgICAgIGNhcmRzLmZvckVhY2goY2FyZD0+e1xuICAgICAgICAgICAgICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLHRoaXMuZmxpcENhcmQpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KSAgXG4gICAgfVxuICAgIGZsaXBDYXJkKGUpe1xuICAgICAgICBjb25zdCBzZWxmPWUudGFyZ2V0O1xuICAgICAgICBpZiAoc2VsZi5jbGFzc0xpc3QuY29udGFpbnMoJ2JhY2snKSl7XG4gICAgICAgICAgIHNlbGYuY2xhc3NMaXN0LnJlbW92ZSgnYmFjaycpO1xuICAgICAgICAgICBzZWxmLmNsYXNzTGlzdC5hZGQoJ2Zyb250Jyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG59XG5jb25zdCB1dGlsaXR5ID0ge1xuICAgIC8v5rSX6YKE6YKP6LyvXG4gICAgZ2V0UmFuZG9tTnVtYmVyQXJyYXkoY291bnQpIHtcbiAgICAgICAgY29uc3QgbnVtYmVyID0gQXJyYXkuZnJvbShBcnJheShjb3VudCkua2V5cygpKVxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IG51bWJlci5sZW5ndGggLSAxOyBpbmRleCA+IDA7IGluZGV4LS0pIHtcbiAgICAgICAgICAgIGxldCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpbmRleCArIDEpKVxuICAgICAgICAgICAgICAgIDtbbnVtYmVyW2luZGV4XSwgbnVtYmVyW3JhbmRvbUluZGV4XV0gPSBbbnVtYmVyW3JhbmRvbUluZGV4XSwgbnVtYmVyW2luZGV4XV1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVtYmVyXG4gICAgfSxcbiAgICBcbn1cblxuXG5jb25zdCB2aWV3ID0gbmV3IFZpZXcoKTtcbmNvbnN0IG1vZGFsPW5ldyBNb2RhbCgpO1xuY29uc3QgY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKHZpZXcsbW9kYWwpO1xuXG5jb250cm9sbGVyLmluaXRpYWxpemUoKTtcbmNvbnN0IGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmQnKTtcblxuIl19
