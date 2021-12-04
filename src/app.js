var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class View {
    displayCards(data) {
        document.querySelector('#cards').innerHTML += `
        <div class="card ${data.name}">
            <p>${data.number}</p>
            ${data.symbol}
            <p>${data.number}</p>
        `;
    }
}
class Modal {
    getCardElements(index) {
        return __awaiter(this, void 0, void 0, function* () {
            let number = this.translateNumber((index % 13) + 1);
            const symbolData = yield this.getSymbols();
            const symbolName = this.translateSymbol(Math.floor(index / 13));
            const symbol = symbolData[symbolName].join('');
            return { number, symbol, name: symbolName
            };
        });
    }
    translateNumber(number) {
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
    }
    translateSymbol(number) {
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
    }
    getSymbols() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('http://192.168.31.155:3000/card');
            const responseData = yield response.json();
            return responseData;
        });
    }
}
class Controller {
    constructor(view, modal) {
        this.view = view;
        this.modal = modal;
    }
    display() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < 52; i++) {
                const data = yield modal.getCardElements(i);
                view.displayCards(data);
            }
        });
    }
}
const view = new View();
const modal = new Modal();
const controller = new Controller(view, modal);
controller.display();
//# sourceMappingURL=app.js.map