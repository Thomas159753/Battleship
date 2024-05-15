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
        this.playedMoves = new Map(); // used to edit the dom

        this.board = boardTemplate;
    }

    isInBounds(coordinates, ship){
        if (!Array.isArray(coordinates) || coordinates.length === 0) {
            return false; // Invalid coordinates
        }
        if (ship?.length && ship.length !== coordinates.length){ //if ship is the same size with the coordinates.length [[1,1] , [1,2]]
            return false
        }    
        
        for (const coord of coordinates) {
            
            const [row, column] = coord;

            if (row < 0 || row >= this.board.length || column < 0 || column >= this.board[0].length){
                return false // Out-of-bounds
            }
        }
        return true
    }
    
    placeShip(ship, coordinates){ // need to make a statement if a ship is placed then to move it
            
        if (!this.isInBounds(coordinates, ship)){
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

            if(this.playedMoves.has(`${row},${column}`)){ // if already played move
                return false
            }

            if(this.board[row][column] === ''){ // if its a miss
                this.playedMoves.set(`${row},${column}`, 'Miss');
                this.board[row][column] === 'Miss'
                return 'Miss'
            }else if (typeof this.board[row][column] === 'object'){ // if its a hit
                this.board[row][column].hit();
                this.playedMoves.set(`${row},${column}`, 'Hit');
                this.board[row][column] = 'Hit'
                return 'Hit'
            }
        }

        return 'Error'
    }

    isGameOver(player){
        const shipsList = Object.values(player.ships)

        for(const ship of shipsList){
            if(!ship.isSunk()){
                return false
            }
        }
        return true
    }
}