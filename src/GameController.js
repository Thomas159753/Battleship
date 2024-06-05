import Player from './player.js'
import UIrender from './makeDom.js'
export default class GameController{
    constructor(){
        this.player1 = null;
        this.player2 = null;
        this.playerTurn = null;
        this.isGameOver = false;
        this.domRender = null;
        this.gamePaused = false
    }
    placeShips(ship, coordinates){ //after when i do drag and drop or i dont need it
        // Place ships for player1
        this.player1.board.placeShip(this.player1.ships['Destroyer'], [[1, 2], [1, 3]]);
        this.player1.ships['Destroyer'].isPlaced = true;

        this.player1.board.placeShip(this.player1.ships["Submarine"], [[4, 6], [5, 6], [6, 6]]);
        this.player1.ships['Submarine'].isPlaced = true;

        this.player1.board.placeShip(this.player1.ships["Cruiser"], [[4, 7], [4, 8], [4, 9]]);
        this.player1.ships['Cruiser'].isPlaced = true;

        this.player1.board.placeShip(this.player1.ships["Battleship"], [[3, 1], [3, 2], [3, 3], [3, 4]]);
        this.player1.ships['Battleship'].isPlaced = true;

        this.player1.board.placeShip(this.player1.ships["Carrier"], [[9, 1], [9, 2], [9, 3], [9, 4], [9, 5]]);
        this.player1.ships['Carrier'].isPlaced = true;

        // Place ships for player2
        this.player2.board.placeShip(this.player2.ships['Destroyer'], [[1, 3], [1, 4]]);
        this.player2.ships['Destroyer'].isPlaced = true;

        this.player2.board.placeShip(this.player2.ships["Submarine"], [[4, 7], [4, 8], [4, 9]]);
        this.player2.ships['Submarine'].isPlaced = true;

        this.player2.board.placeShip(this.player2.ships["Cruiser"], [[5, 7], [6, 7], [7, 7]]);
        this.player2.ships['Cruiser'].isPlaced = true;

        this.player2.board.placeShip(this.player2.ships["Battleship"], [[5, 1], [5, 2], [5, 3], [5, 4]]);
        this.player2.ships['Battleship'].isPlaced = true;

        this.player2.board.placeShip(this.player2.ships["Carrier"], [[9, 1], [9, 2], [9, 3], [9, 4], [9, 5]]);
        this.player2.ships['Carrier'].isPlaced = true;

        this.domRender.updateBoard(this.player1, "player");
        this.domRender.updateBoard(this.player2, "enemy");
    }

    async handleTurns() {
        const enemy = this.playerTurn === this.player1 ? this.player2 : this.player1; //get enemy
        
        this.domRender.updateBoard(enemy, "enemy");

        if(!this.player2.isComputer){
            await this.waitForSpacebar()
        }
        //render the board
        this.domRender.updateBoard(this.playerTurn, "enemy");
        this.domRender.updateBoard(enemy, "player");

        if (this.GameOver(enemy)) {
            this.isGameOver = true;
            this.domRender.showGameOver(this.playerTurn);
        } else {
            this.playerTurn = enemy; // switch turns
        }
    }

    addEventListeners() {
        let enemyBoard = document.querySelector('#enemy .board-grid'); // apply evend listeners only to enemy board
        if(enemyBoard){
            enemyBoard.addEventListener('click', (e) =>{
                if(this.isGameOver || this.gamePaused) return; // stop the game if gameover or pause for player switch
                let coordinates = this.getCoordinatesFromGrid(e);
                this.makePlayerAttack(coordinates)
            })
        }
    }

    getCoordinatesFromGrid(e){
        let row = e.target.dataset.row;
        let col = e.target.dataset.col;
        return row && col ? [[row, col]] : false;
    }

    makePlayerAttack(coordinates){
        if(coordinates === false) return; // prevent false attack

        let enemy = this.playerTurn === this.player1 ? this.player2 : this.player1 // get enemy
        let result = this.playerTurn.sentAtack(enemy, coordinates); // make attack
        if(!result) return console.error("played move"); // prevent further play and console played move
        this.handleTurns() // switch turn

        if(enemy.isComputer){
            this.makeComputerAttack()
        }
        return result
    }

    makeComputerAttack(){ 
        let enemy = this.playerTurn === this.player1 ? this.player2 : this.player1 // get enemy
        this.playerTurn.sentAtack(enemy); // make attack
        this.handleTurns() // switch turn
    }

    async handleForm(){ //error with custom validity
        const textInputs = document.querySelectorAll('form input[type="text"]');
        const form = document.querySelector('form');

        //input validation
        textInputs.forEach(input =>{
            input.addEventListener("blur", (e) =>{
                input.setCustomValidity("");
                input.classList.remove('invalid');

                if(input.validity.valueMissing){ // custom errors
                    input.setCustomValidity("Name is mising");
                    input.classList.add('invalid');
                }

            })
        })

        //form data handle
        return new Promise((resolve) => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(form); //get the form values
                const formObject = Object.fromEntries(formData.entries()); // make them into an object
                formObject.PC = formObject.PC === 'on' // make it into true/false instead of on/off
                resolve(formObject)
            });
        })
    }

    async startGame() {
        const formObject = await this.handleForm(); // Wait for handleForm to complete
        //assigning new players and playerTurn  
        this.player1 = new Player(formObject.player1);
        this.player2 = new Player(formObject.player2,formObject.PC);
        this.playerTurn = this.player1;
        this.domRender = new UIrender();

        this.domRender.renderBoard(this.player1, "player");
        this.domRender.renderBoard(this.player2, "enemy");
        this.placeShips(); // Then call placeShips
        this.addEventListeners();
    }

    GameOver(player){
        return Object.values(player.ships).every(ship => ship.isSunk());
    }

    waitForSpacebar() {
        this.gamePaused = true; // pause the game
        const infoText = document.querySelector('.infoText');

        return new Promise((resolve) => { // make a new promise for spacebar
            const handler = (e) => {
                if (e.code === 'Space') {
                    document.removeEventListener('keydown', handler); // stop listening for the spacebar
                    infoText.textContent = "";
                    this.gamePaused = false;
                    resolve();
                }
            };
            document.addEventListener('keydown', handler); // listen for the spacebar
            infoText.textContent = "Press Spacebar to Continue";
        });
    }
}
