import Gameboard from './gameboard.js'

export default class Player{
    constructor(name, isComputer = false) {
        this.board = new Gameboard();
        this.name = name;
        this.isComputer = isComputer;
    }

    sentAtack(enemy,coordinates){
        if (this.isComputer){ // if computer is true
            return this.makeRandomMove(enemy)
        }
        return enemy.board.receiveAttack(coordinates);
    }

    makeRandomMove(enemy){ 
        let validmove = false; // valid move if its played or not
        let outcome;
        while(!validmove){
            let row = Math.floor(Math.random() * 10);
            let col = Math.floor(Math.random() * 10);

            let coordinates = [[row, col]];

            outcome = enemy.board.receiveAttack(coordinates)
            if(outcome !== false){
                validmove = true
            }
        }
        return outcome
    }
}