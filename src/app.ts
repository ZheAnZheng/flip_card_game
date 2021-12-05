import { State, utility } from './module';
//state pattern
class FirstCardAwaits implements State {
    controller;
    constructor(controller) {
        this.controller = controller;
        
    }
    handler(e) {
        const num = e.target.dataset.index;
        revealedCards.push(num);
        currentState = secondCardAwaits;
    }
    flipCard(e): void {
        const view=this.controller.getView();
        const self = e.target;
        
        if (revealedCards.length < 1 && self.classList.contains('back') && score<260){
            
            view.displayFront(self);
            view.displayActive(self)
            this.handler(e)
        }else{
            return;
        }
        
    }

}
class SecondCardAwaits implements State {
    controller;
    constructor(controller) {
        this.controller = controller;
    }
    handler(e) {
        const num = e.target.dataset.index;
        revealedCards.push(num);
        const isMatched = this.controller.match(revealedCards);

        if (isMatched && score < 260) {
            currentState = matchCard;
            currentState.handler(e);
        } else {
            currentState = matchCardFailed;
            currentState.handler(e);
        }
    }
    flipCard(e): void {
        const view=controller.getView();
        const self = e.target;
        if (revealedCards.length < 2 && self.classList.contains('back')) {
            view.displayFront(self);
            view.displayActive(self);
            
            this.handler(e);

        } else {
            return;
        }
    }

}
class MatchCardFailed implements State {

    controller;
    constructor(controller) {
        this.controller = controller;
    }
    //失敗時，停止兩秒蓋上牌
    handler() {
        const view=this.controller.getView();
        const first=document.querySelector(`.card[data-index="${revealedCards[0]}"]`);
        const second = document.querySelector(`.card[data-index="${revealedCards[1]}"]`);
        setTimeout(()=>{
            view.displayActive(first);
            view.displayActive(second);
            view.displayBack(first);
            view.displayBack(second);
            revealedCards.splice(0,2);32
            currentState=firstCardAwaits;
        },1000)
        
    }
    flipCard(): void {
        return;
    }

}
class MatchCard implements State {
    controller;
    constructor(controller) {
        this.controller = controller
    }
    //加分 繼續開著
    handler() {
        const view =this.controller.getView();
        const first = document.querySelector(`.card[data-index="${revealedCards[0]}"]`)
        const second = document.querySelector(`.card[data-index="${revealedCards[1]}"]`)
        score+=10;
        revealedCards.splice(0,2);
        view.displayScore();
        view.displayActive(first);
        view.displayActive(second);
        view.displayDone(first);
        view.displayDone(second);
        if(score<260){
            currentState=firstCardAwaits;
        }else{
            currentState=gameFinished;
        }
    }
    flipCard(): void {
        return
    }

}
class GameFinished implements State {
    controller;
    constructor(controller) {
        this.controller = controller
    }
    handler() {
        alert('you win');
    }
    flipCard(e): void {
        return
    }

}

class View {

    displayCards(data): void {

        document.querySelector('#cards').innerHTML += `
        <div data-index="${data.index}"  class="card back ${data.name}">
            <p>${data.number}</p>
            ${data.symbol}
            <p>${data.number}</p>
        `
    }
    displayFront(card){
        card.classList.remove('back');
        card.classList.add('front');
    }
    displayBack(card){
        card.classList.remove('front');
        card.classList.add('back');
    }
    displayScore(){
        document.querySelector('.score').innerHTML=`${score}`;
    }
    displayActive(card){
        if(card.classList.contains('active')){
            card.classList.remove('active');
        }else{
            
            card.classList.add('active');
        }   
    }
    displayDone(card){
        card.classList.add('done');
    }

}

class Modal {

    
    checkPairs(cards):Boolean {
        
        const first = this.translateNumber(cards[0]);
        const second = this.translateNumber(cards[1])

        
        return first ===second ?true :false;
    }
    
    async getCardElements(index): Promise<Object> {
        let number = this.translateString((index % 13) + 1);
        const symbolData = await this.getSymbols();
        const symbolName = this.translateSymbol(Math.floor(index / 13))
        const symbol = symbolData[symbolName].join('');

        return { number, symbol, name: symbolName, index }
    }
    translateNumber(number:string){
        return Number(number)%13+1;
    }
    translateString(number): string | number {
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
    translateSymbol(number: number): string {
        switch (number) {
            case 0:
                return 'heart';
            case 1:
                return 'spade';
            case 2:
                return 'diamond';
            case 3:
                return 'club'

        }
    }

    async getSymbols() {
        const response = await fetch('http://192.168.31.155:3000/card');
        const responseData = await response.json();
        return responseData


    }
}
class Controller {
    view: View;
    modal: Modal;

    constructor(view: View, modal: Modal, index) {
        this.view = view;
        this.modal = modal;
        this.initialize(index);

    }

    initialize(index) {

        utility.getRandomNumberArray(index).map(async (index) => {
            const data = await modal.getCardElements(index);

            view.displayCards(data);
            view.displayScore();
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                card.addEventListener('click', this.flipCard);
            })

        })
    }

    
    match(cards :Array<number>):Boolean{
        
        return this.modal.checkPairs(cards);
        
    }

    flipCard(e){
        
        currentState.flipCard(e);
        
       
    }
    getView(){
        return this.view;
    }

}

const view = new View();
const modal = new Modal();
const controller = new Controller(view, modal, 52);

const firstCardAwaits: State = new FirstCardAwaits(controller);
const secondCardAwaits: State = new SecondCardAwaits(controller);
const matchCardFailed: State = new MatchCardFailed(controller);
const matchCard: State = new MatchCard(controller)
const gameFinished: State = new GameFinished(controller);
const revealedCards = [];
let score = 0;
let currentState: State = firstCardAwaits;
