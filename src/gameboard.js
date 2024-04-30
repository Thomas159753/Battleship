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
        
        return true // Successful placement
    }

    receiveAttack(coordinates){
        if (!this.isInBounds(coordinates)){
            return false // Out-of-bounds
        }

        for (const coord of coordinates) {
            const [row, column] = coord
            
            if(this.board[row][column] === '' && (!this.missedAttacks.has('[row,column]'))){ // error here with the has()
                this.missedAttacks.add([row,column]);
                return 'Miss'
            }else if (typeof this.board[row][column] === 'object'){
                this.board[row][column].hit();
                return 'Hit'
            }else{
                return false
            }
        }
    }

}

let ship1 = new Ship;
let gameboard1 = new Gameboard;
// gameboard1.placeShip(ship1, [[3,1], [2,1], [1,1]]);
// console.log(gameboard1.board)
console.log(gameboard1.receiveAttack([[2,1]]))
console.log(gameboard1.missedAttacks)
console.log(gameboard1.receiveAttack([[2,1]]))
console.log(gameboard1.missedAttacks)