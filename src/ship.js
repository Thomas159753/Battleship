export default class Ship {
    constructor(length, name){
        this.length = length;
        this.name = name;
        this.sunk = false;
        this.hits = 0;
    }

    hit(){
        this.hits += 1
    }

    isSunk(){
        if(this.hits === this.length){
            this.sunk = true;
        }
        return this.sunk; //not sure if needed
    }
}