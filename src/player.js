import Gameboard from './gameboard.js'

export default class Player{
    constructor(name, isComputer = false) {
        this.board = new Gameboard();
        this.name = name;
        this.isComputer = isComputer;
    }

    sentAtack(enemy,coordinates){
        if (this.isComputer){
            return this.makeRandomMove()
        }
        enemy.board.receiveAttack(coordinates);
    }

    makeRandomMove(){
        let validmove = false;

        while(!validmove){
            let row = Math.floor(Math.random() * 10);
            let col = Math.floor(Math.random() * 10);

            [[row, col]] = coordinates;

            if(this.receiveAttack(coordinates) !== false){
                validmove =true
            }
        }
        return true
    }
}