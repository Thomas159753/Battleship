import Ship from './ship.js'
import Player from './player.js'

export default class GameController{
    constructor(){
        this.player1 = new Player('Player1');
        this.player2 = new Player('SpiderBot',true);
        this.playerTurn = this.player1;
        this.isGameOver = false
    }
    placeShips(){
        let Destroyer = new Ship(2,'Destroyer');
        let Submarine = new Ship(3, 'Submarine');
        let Cruiser = new Ship(3, 'Cruiser');
        let Battleship = new Ship(4, 'Battleship');
        let Carrier = new Ship(5, 'Carrier');

        this.player1.board.placeShip(Destroyer, [[1,2], [1,3]]);
        this.player2.board.placeShip(Destroyer, [[1,3], [1,4]]);

        this.player1.board.placeShip(Submarine, [[4,6], [5,6], [6,6]]);
        this.player2.board.placeShip(Submarine, [[4,7], [4,8], [4,9]]);
        
        this.player1.board.placeShip(Cruiser, [[4,7], [4,8], [4,9]]);
        this.player2.board.placeShip(Cruiser, [[5,7], [6,7], [7,7]]);
        
        this.player1.board.placeShip(Battleship, [[3,1], [3,2], [3,3], [3,4]]);
        this.player2.board.placeShip(Battleship, [[5,1], [5,2], [5,3], [5,4]]);
        
        this.player1.board.placeShip(Carrier, [[9,1], [9,2], [9,3], [9,4], [9,5]]);
        this.player2.board.placeShip(Carrier, [[9,1], [9,2], [9,3], [9,4], [9,5]]);
    }

    switchTurns(){
        this.playerTurn = this.playerTurn === this.player1 ? this.player2 : this.player1
    }

    addEventListeners() {
        document.querySelector('#board-grid').addEventListener('click', (e) =>{
            if(this.isGameOver) return;
            
            let coordinates = this.getCoordinatesFromGrid(e);

            this.makePlayerAttack(coordinates)
        })
    }

    getCoordinatesFromGrid(e){
        let row = e.target.dataset.row;
        let col = e.target.dataset.col;
        return [[row,col]]
    }

    makePlayerAttack(coordinates){
        let enemy = this.playerTurn === this.player1 ? this.player2 : this.player1

        let result = this.playerTurn.sentAtack(enemy, coordinates);

        // make a render of the board here
        if(enemy.board.isGameOver()){
            this.isGameOver = true
            //send a game over screen
        }else{
            this.switchTurns()
            if(this.playerTurn.isComputer){
                this.makeComputerAttack()
            }
        }
        this.isGameOver
        return result
    }

    makeComputerAttack(){
        let enemy = this.playerTurn === this.player1 ? this.player2 : this.player1
        this.playerTurn.sentAtack(enemy);

        // make a render of the board

        if(enemy.board.isGameOver()){
            this.isGameOver = true
            //send a game over screen 
        }else{
            this.switchTurns()
        }
    }
}

let agcon = new GameController
agcon.placeShips()
agcon.makePlayerAttack([[1,3]])