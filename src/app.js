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
        <div data-set="${data.index}"  class="card back ${data.name}">
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
            return { number, symbol, name: symbolName, index };
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
    initialize() {
        utility.getRandomNumberArray(52).map((index) => __awaiter(this, void 0, void 0, function* () {
            const data = yield modal.getCardElements(index);
            view.displayCards(data);
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                card.addEventListener('click', this.flipCard);
            });
        }));
    }
    flipCard(e) {
        const self = e.target;
        if (self.classList.contains('back')) {
            self.classList.remove('back');
            self.classList.add('front');
        }
    }
}
const utility = {
    //洗還邏輯
    getRandomNumberArray(count) {
        const number = Array.from(Array(count).keys());
        for (let index = number.length - 1; index > 0; index--) {
            let randomIndex = Math.floor(Math.random() * (index + 1));
            [number[index], number[randomIndex]] = [number[randomIndex], number[index]];
        }
        return number;
    },
};
const view = new View();
const modal = new Modal();
const controller = new Controller(view, modal);
controller.initialize();
const cards = document.querySelectorAll('.card');
//# sourceMappingURL=app.js.map