import Gameboard from './gameboard.js'

export default class Player{
    constructor(name, isComputer = false) {
        this.board = new Gameboard();
        this.name = name;
        this.isComputer = isComputer;
    }

    sentAtack(enemy,coordinates){
        if (this.isComputer){
            return enemy.board.receiveAttack(this.makeRandomMove())
        }
        enemy.board.receiveAttack(coordinates);
    }

    makeRandomMove(){
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);
        return [[row, col]]
    }
}