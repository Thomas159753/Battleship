import Ship from './ship.js'
import Player from './player.js'

export default class GameController{
    constructor(){
        this.player1 = new Player('Player1');
        this.Player2 = new Player('SpiderBot',true);
        this.playerTurn = this.player1;
        this.isGameOver = false
    }
    placeShips(){
        let Destroyer = new Ship(2,'Destroyer');
        this.player1.board.placeShip(Destroyer, [[1,2], [1,3]]);
        
    }
}

let gboard = new GameController
gboard.placeShips()
