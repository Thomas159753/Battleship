export default class Ship {
    constructor(length, name){
        this.length = length;
        this.name = name;
        this.isPlaced = false
        this.sunk = false; // Stataus of ship condition
        this.hits = 0; // Counter for the number of hits
    }

    hit(){
        if(this.sunk){ // if ship already sunk
            return false // do nothing
        }

        this.hits += 1

        if(this.hits >= this.length){
            this.sunk = true;
            return this.sunk
        }
        
        return true
    }

    isSunk(){
        return this.sunk; //Return the current status
    }
}