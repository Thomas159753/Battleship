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
            this.board[row][column] = Ship;
        }
        return this.board        
    }

}