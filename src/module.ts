export interface State{
    flipFirstCard():void
    flipSecondCard():void
    
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