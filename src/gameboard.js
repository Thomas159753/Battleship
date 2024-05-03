import Ship from "./ship.js"; //no need but i keep it

export default class Gameboard {
    constructor (){
        const boardTemplate = [ // standar 10x10 board 2D Array
            ['', '', '', '', '', '', '', '', '', '',],
            ['', '', '', '', '', '', '', '', '', '',],
            ['', '', '', '', '', '', '', '', '', '',],
            ['', '', '', '', '', '', '', '', '', '',],
            ['', '', '', '', '', '', '', '', '', '',],
            ['', '', '', '', '', '', '', '', '', '',],
            ['', '', '', '', '', '', '', '', '', '',],
            ['', '', '', '', '', '', '', '', '', '',],
            ['', '', '', '', '', '', '', '', '', '',],
            ['', '', '', '', '', '', '', '', '', '',],
        ]
        this.missedAttacks = [];
        this.ships = {}

        this.board = boardTemplate;
    }

    isInBounds(coordinates){
        if (!Array.isArray(coordinates) || coordinates.length === 0) {
            return false; // Invalid coordinates
        }

        for (const coord of coordinates) {
            
            const [row, column] = coord;

            if (row < 0 || row >= this.board.length || column < 0 || column >= this.board[0].length){
                return false // Out-of-bounds
            }
            return true
        }
    }
    
    placeShip(ship, coordinates){

        if (!this.isInBounds(coordinates)){
            return false // Out-of-bounds
        }

        for (const coord of coordinates) {
            const [row, column] = coord;

            if(this.board[row][column] !== ''){
                return false // Cell is occupeied
            }

            this.board[row][column] = ship; // Place ship
        }
        this.ships[ship.name] = ship
        return true // Successful placement
    }

    receiveAttack(coordinates){
        if (!this.isInBounds(coordinates)){
            return false // Out-of-bounds
        }

        for (const coord of coordinates) {
            const [row, column] = coord


            if(this.board[row][column] === 'Miss' || this.board[row][column] === 'Hit'){ // if already played move
                return `Already ${this.board[row][column]}`
            }

            if(this.board[row][column] === ''){ // if its a miss
                this.missedAttacks.push(coord);
                this.board[row][column] === 'Miss'
                return 'Miss'
            }else if (typeof this.board[row][column] === 'object'){ // if its a hit
                this.board[row][column].hit();
                this.board[row][column] = 'Hit'
                return 'Hit'
            }
        }

        return 'Error'
    }

    isGameOver(ships){
        const shipsList = Object.values(this.ships)

        for(const ship of shipsList){
            if(!ship.isSunk()){
                return false
            }
        }
        return true
    }

}