import Gameboard from './gameboard.js'
import Ship from './ship.js';

export default class Player{
    constructor(name, isComputer = false) {
        this.board = new Gameboard();
        this.name = name;
        this.isComputer = isComputer;
        this.ships = {
            "Destroyer": new Ship(2,'Destroyer'),
            "Submarine": new Ship(3, 'Submarine'),
            "Cruiser": new Ship(3, 'Cruiser'),
            "Battleship": new Ship(4, 'Battleship'),
            "Carrier": new Ship(5, 'Carrier')
        }
    }

    sentAtack(enemy,coordinates){
        if (this.isComputer){ // if computer is true
            return this.makeRandomMove(enemy)
        }else{
            return enemy.board.receiveAttack(coordinates);
        }
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