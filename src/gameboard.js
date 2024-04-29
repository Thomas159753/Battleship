import Ship from './ship.js';

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
        this.missedAttacks = new Set();
        this.board = boardTemplate;
    }
    
    placeShip(Ship, coordinates){
        for (const coord of coordinates) {
            const [row, column] = coord;
            if (row < 0 || row >= this.board.length || column < 0 || column >= this.board[0].length){
                return false // Out-of-bounds
            }

            if(this.board[row][column] !== ''){
                return false // Cell is occupeied
            }

            this.board[row][column] = Ship; // Place ship
        }
        return true // Successful placement
    }

    

}

let ship1 = new Ship;
let gameboard1 = new Gameboard;
gameboard1.placeShip(ship1, [[3,1]])