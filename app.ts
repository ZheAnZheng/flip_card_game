class View {
    
    displayCards(data):void {
        
        document.querySelector('#cards').innerHTML += `
        <div data-set="${data.index}"  class="card back ${data.name}">
            <p>${data.number}</p>
            ${data.symbol}
            <p>${data.number}</p>
        `

    }
    
}
class Modal{

 

    async getCardElements(index):Promise<Object>{
        let number=this.translateNumber((index%13)+1);
        const symbolData=await this.getSymbols();
        const symbolName = this.translateSymbol(Math.floor(index / 13))
        const symbol = symbolData[symbolName].join('');
        
        return { number, symbol, name: symbolName,index}
    }
    translateNumber(number):string|number{
        switch(number){
            case 1: 
                return "A";
            case 11 :
                return "J";
            case 12 :
                return "Q";
            case 13 :
                return "K";
            default :
                return number;
        }
    }
    translateSymbol(number:number):string{
        switch(number){
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
        const response=await fetch('http://192.168.31.155:3000/card');
        const responseData= await response.json();
        return responseData
        
        
    }
}

class Controller{
    view:View;
    modal:Modal;
    constructor(view:View ,modal:Modal){
        this.view =view;
        this.modal=modal;
    }
    initialize(){
        utility.getRandomNumberArray(52).map(async (index)=>{
            const data = await modal.getCardElements(index);
            view.displayCards(data);
            const cards = document.querySelectorAll('.card');
            cards.forEach(card=>{
                card.addEventListener('click',this.flipCard)
            })
        })  
    }
    flipCard(e){
        const self=e.target;
        if (self.classList.contains('back')){
           self.classList.remove('back');
           self.classList.add('front');
        }
    }
    
}
const utility = {
    //洗還邏輯
    getRandomNumberArray(count) {
        const number = Array.from(Array(count).keys())
        for (let index = number.length - 1; index > 0; index--) {
            let randomIndex = Math.floor(Math.random() * (index + 1))
                ;[number[index], number[randomIndex]] = [number[randomIndex], number[index]]
        }
        return number
    },
    
}


const view = new View();
const modal=new Modal();
const controller = new Controller(view,modal);

controller.initialize();
const cards = document.querySelectorAll('.card');

