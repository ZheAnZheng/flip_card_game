class View {
    
    displayCards(data):void {
        
        document.querySelector('#cards').innerHTML += `
        <div class="card ${data.name}">
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
        
        return { number, symbol, name: symbolName
}
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
    async display(){
        for(let i =0; i<52 ; i++){
            const data=await modal.getCardElements(i);
            view.displayCards(data);
        }
        
        
        
            
        
        
        
    }
}
const view = new View();
const modal=new Modal();
const controller = new Controller(view,modal);

controller.display();