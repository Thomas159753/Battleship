export default class Gameboard {
    constructor (size = 10){
        this.boardSize = size;
        this.playedMoves = new Map(); // used to edit the dom
        this.board = new Map()
    }

    formatCoordinates([row, column]) {
        return `${row},${column}`;
    }

    isInBounds(coordinates, ship){
        if (!Array.isArray(coordinates) || coordinates.length === 0 || !coordinates) {
            return false; // Invalid coordinates
        }
        if (ship?.length && ship.length !== coordinates.length){
            return false // Ship size does not match coordinates length
        }    
        
        for (const [row, column] of coordinates) {
            if (row < 0 || row >= this.boardSize || column < 0 || column >= this.boardSize) {
                return false; // Out-of-bounds
            }
        }
        return true;
    }
    
    placeShip(ship, coordinates){ // need to make a statement if a ship is placed then to move it
            
        if (!this.isInBounds(coordinates, ship)){
            return false // Out-of-bounds
        }
        
        for (const coord of coordinates) {
            const key = this.formatCoordinates(coord);
            if (this.board.has(key)){
                return false// Ship is already there
            }
        }

        for (const coord of coordinates) {
            const key = this.formatCoordinates(coord)
            this.board.set(key, ship)
        }
        return true // Successful placement
    }

    receiveAttack(coordinates){ 
        if (!this.isInBounds(coordinates) || coordinates.length !== 1){
            return 'Error'; // Out-of-bounds
        }

        const coord = coordinates[0];
        const key = this.formatCoordinates(coord);

        if(this.playedMoves.has(key)){
            return false // Already played move
        }

        if(!this.board.has(key)){ // Miss
            this.playedMoves.set(key, 'Miss');
            return 'Miss'
        } else if (this.board.has(key)){ // Hit
            let ship = this.board.get(key); // Get the ship 
            ship.hit(); //add a hit

            this.playedMoves.set(key, 'Hit');
            return 'Hit'
        }
    }
}