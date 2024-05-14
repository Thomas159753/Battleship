import Player from './player.js'
import UIrender from './makeDom.js'
export default class GameController{
    constructor(player1Name,player2Name){
        this.player1 = new Player(player1Name);
        this.player2 = new Player(player2Name,false);
        this.playerTurn = this.player1;
        this.isGameOver = false
        this.domRender = new UIrender(this.player1,this.player2)
    }
    placeShips(ship, coordinates){ //after when i do drag and drop or i dont need it
        this.player1.board.placeShip(this.player1.ships['Destroyer'], [[1,2], [1,3]]);
        this.player1.ships['Destroyer'].isPlaced = true

        this.player2.board.placeShip(this.player2.ships['Destroyer'], [[1,3], [1,4]]);
        this.player2.ships['Destroyer'].isPlaced = true

        this.player1.board.placeShip(this.player1.ships["Submarine"], [[4,6], [5,6], [6,6]]);
        this.player1.ships['Submarine'].isPlaced = true

        this.player2.board.placeShip(this.player2.ships["Submarine"], [[4,7], [4,8], [4,9]]);
        this.player2.ships['Submarine'].isPlaced = true
        
        this.player1.board.placeShip(this.player1.ships["Cruiser"], [[4,7], [4,8], [4,9]]);
        this.player1.ships['Cruiser'].isPlaced = true

        this.player2.board.placeShip(this.player2.ships["Cruiser"], [[5,7], [6,7], [7,7]]);
        this.player2.ships['Cruiser'].isPlaced = true

        this.player1.board.placeShip(this.player1.ships["Battleship"], [[3,1], [3,2], [3,3], [3,4]]);
        this.player1.ships['Battleship'].isPlaced = true

        this.player2.board.placeShip(this.player2.ships["Battleship"], [[5,1], [5,2], [5,3], [5,4]]);
        this.player2.ships['Battleship'].isPlaced = true
        
        this.player1.board.placeShip(this.player1.ships["Carrier"], [[9,1], [9,2], [9,3], [9,4], [9,5]]);
        this.player1.ships['Carrier'].isPlaced = true

        this.player2.board.placeShip(this.player2.ships["Carrier"], [[9,1], [9,2], [9,3], [9,4], [9,5]]);
        this.player2.ships['Carrier'].isPlaced = true
        this.domRender.renderGameboard();
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
        if(enemy.board.isGameOver(enemy)){
            this.isGameOver = true
            //send a game over screen
        }else{
            this.switchTurns()
            if(this.playerTurn.isComputer){
                this.makeComputerAttack()
            }
        }
        return result
    }

    makeComputerAttack(){
        let enemy = this.playerTurn === this.player1 ? this.player2 : this.player1
        this.playerTurn.sentAtack(enemy);

        // make a render of the board

        if(enemy.board.isGameOver(enemy)){
            this.isGameOver = true
            //send a game over screen 
        }else{
            this.switchTurns()
        }
    }
}
// let test = new GameController()
// test.placeShips()
