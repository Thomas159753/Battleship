import Gameboard from './gameboard.js'

export default class Player{
    constructor(name) {
        this.board = new Gameboard();
        this.playerName = name;
    }

    sentAtack(enemy,coordinates){
        enemy.board.receiveAttack(coordinates);
    }
}