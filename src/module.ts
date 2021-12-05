export interface State{
    handler(e);
    
    flipCard(e:Event):void
 
}

export const utility = {

    getRandomNumberArray(count) {
        const number = Array.from(Array(count).keys())
        for (let index = number.length - 1; index > 0; index--) {
            let randomIndex = Math.floor(Math.random() * (index + 1))
                ;[number[index], number[randomIndex]] = [number[randomIndex], number[index]]
        }
        return number
    },

}
