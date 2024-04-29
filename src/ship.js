export default class Ship {
    constructor(length, name){
        this.length = length;
        this.name = name;
        this.sunk = false; // Stataus of ship condition
        this.hits = 0; // Counter for the number of hits
    }

    hit(){
        if(this.hits < this.length){ // if ship already sunk
            this.hits += 1
            return this.hits; // return the updated hit count            
        }
        return false
    }

    isSunk(){
        if(this.hits === this.length){
            this.sunk = true;
        }
        return this.sunk; //Return the current status
    }
}