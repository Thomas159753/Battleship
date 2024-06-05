/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/GameController.js":
/*!*******************************!*\
  !*** ./src/GameController.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ GameController)\n/* harmony export */ });\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n/* harmony import */ var _makeDom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./makeDom.js */ \"./src/makeDom.js\");\n\r\n\r\nclass GameController{\r\n    constructor(){\r\n        this.player1 = null;\r\n        this.player2 = null;\r\n        this.playerTurn = null;\r\n        this.isGameOver = false;\r\n        this.domRender = null;\r\n        this.gamePaused = false\r\n    }\r\n    placeShips(ship, coordinates){ //after when i do drag and drop or i dont need it\r\n        // Place ships for player1\r\n        this.player1.board.placeShip(this.player1.ships['Destroyer'], [[1, 2], [1, 3]]);\r\n        this.player1.ships['Destroyer'].isPlaced = true;\r\n\r\n        this.player1.board.placeShip(this.player1.ships[\"Submarine\"], [[4, 6], [5, 6], [6, 6]]);\r\n        this.player1.ships['Submarine'].isPlaced = true;\r\n\r\n        this.player1.board.placeShip(this.player1.ships[\"Cruiser\"], [[4, 7], [4, 8], [4, 9]]);\r\n        this.player1.ships['Cruiser'].isPlaced = true;\r\n\r\n        this.player1.board.placeShip(this.player1.ships[\"Battleship\"], [[3, 1], [3, 2], [3, 3], [3, 4]]);\r\n        this.player1.ships['Battleship'].isPlaced = true;\r\n\r\n        this.player1.board.placeShip(this.player1.ships[\"Carrier\"], [[9, 1], [9, 2], [9, 3], [9, 4], [9, 5]]);\r\n        this.player1.ships['Carrier'].isPlaced = true;\r\n\r\n        // Place ships for player2\r\n        this.player2.board.placeShip(this.player2.ships['Destroyer'], [[1, 3], [1, 4]]);\r\n        this.player2.ships['Destroyer'].isPlaced = true;\r\n\r\n        this.player2.board.placeShip(this.player2.ships[\"Submarine\"], [[4, 7], [4, 8], [4, 9]]);\r\n        this.player2.ships['Submarine'].isPlaced = true;\r\n\r\n        this.player2.board.placeShip(this.player2.ships[\"Cruiser\"], [[5, 7], [6, 7], [7, 7]]);\r\n        this.player2.ships['Cruiser'].isPlaced = true;\r\n\r\n        this.player2.board.placeShip(this.player2.ships[\"Battleship\"], [[5, 1], [5, 2], [5, 3], [5, 4]]);\r\n        this.player2.ships['Battleship'].isPlaced = true;\r\n\r\n        this.player2.board.placeShip(this.player2.ships[\"Carrier\"], [[9, 1], [9, 2], [9, 3], [9, 4], [9, 5]]);\r\n        this.player2.ships['Carrier'].isPlaced = true;\r\n\r\n        this.domRender.updateBoard(this.player1, \"player\");\r\n        this.domRender.updateBoard(this.player2, \"enemy\");\r\n    }\r\n\r\n    async handleTurns() {\r\n        const enemy = this.playerTurn === this.player1 ? this.player2 : this.player1; //get enemy\r\n        \r\n        this.domRender.updateBoard(enemy, \"enemy\");\r\n\r\n        if(!this.player2.isComputer){\r\n            await this.waitForSpacebar()\r\n        }\r\n        //render the board\r\n        this.domRender.updateBoard(this.playerTurn, \"enemy\");\r\n        this.domRender.updateBoard(enemy, \"player\");\r\n\r\n        if (this.GameOver(enemy)) {\r\n            this.isGameOver = true;\r\n            this.domRender.showGameOver(this.playerTurn);\r\n        } else {\r\n            this.playerTurn = enemy; // switch turns\r\n        }\r\n    }\r\n\r\n    addEventListeners() {\r\n        let enemyBoard = document.querySelector('#enemy .board-grid'); // apply evend listeners only to enemy board\r\n        if(enemyBoard){\r\n            enemyBoard.addEventListener('click', (e) =>{\r\n                if(this.isGameOver || this.gamePaused) return; // stop the game if gameover or pause for player switch\r\n                let coordinates = this.getCoordinatesFromGrid(e);\r\n                this.makePlayerAttack(coordinates)\r\n            })\r\n        }\r\n    }\r\n\r\n    getCoordinatesFromGrid(e){\r\n        let row = e.target.dataset.row;\r\n        let col = e.target.dataset.col;\r\n        return row && col ? [[row, col]] : false;\r\n    }\r\n\r\n    makePlayerAttack(coordinates){\r\n        if(coordinates === false) return; // prevent false attack\r\n\r\n        let enemy = this.playerTurn === this.player1 ? this.player2 : this.player1 // get enemy\r\n        let result = this.playerTurn.sentAtack(enemy, coordinates); // make attack\r\n        if(!result) return console.error(\"played move\"); // prevent further play and console played move\r\n        this.handleTurns() // switch turn\r\n\r\n        if(enemy.isComputer){\r\n            this.makeComputerAttack()\r\n        }\r\n        return result\r\n    }\r\n\r\n    makeComputerAttack(){ \r\n        let enemy = this.playerTurn === this.player1 ? this.player2 : this.player1 // get enemy\r\n        this.playerTurn.sentAtack(enemy); // make attack\r\n        this.handleTurns() // switch turn\r\n    }\r\n\r\n    async handleForm(){ //error with custom validity\r\n        const textInputs = document.querySelectorAll('form input[type=\"text\"]');\r\n        const form = document.querySelector('form');\r\n\r\n        //input validation\r\n        textInputs.forEach(input =>{\r\n            input.addEventListener(\"blur\", (e) =>{\r\n                input.setCustomValidity(\"\");\r\n                input.classList.remove('invalid');\r\n\r\n                if(input.validity.valueMissing){ // custom errors\r\n                    input.setCustomValidity(\"Name is mising\");\r\n                    input.classList.add('invalid');\r\n                }\r\n\r\n            })\r\n        })\r\n\r\n        //form data handle\r\n        return new Promise((resolve) => {\r\n            form.addEventListener('submit', (e) => {\r\n                e.preventDefault();\r\n                const formData = new FormData(form); //get the form values\r\n                const formObject = Object.fromEntries(formData.entries()); // make them into an object\r\n                formObject.PC = formObject.PC === 'on' // make it into true/false instead of on/off\r\n                resolve(formObject)\r\n            });\r\n        })\r\n    }\r\n\r\n    async startGame() {\r\n        const formObject = await this.handleForm(); // Wait for handleForm to complete\r\n        //assigning new players and playerTurn  \r\n        this.player1 = new _player_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](formObject.player1);\r\n        this.player2 = new _player_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](formObject.player2,formObject.PC);\r\n        this.playerTurn = this.player1;\r\n        this.domRender = new _makeDom_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n\r\n        this.domRender.renderBoard(this.player1, \"player\");\r\n        this.domRender.renderBoard(this.player2, \"enemy\");\r\n        this.placeShips(); // Then call placeShips\r\n        this.addEventListeners();\r\n    }\r\n\r\n    GameOver(player){\r\n        return Object.values(player.ships).every(ship => ship.isSunk());\r\n    }\r\n\r\n    waitForSpacebar() {\r\n        this.gamePaused = true; // pause the game\r\n        const infoText = document.querySelector('.infoText');\r\n\r\n        return new Promise((resolve) => { // make a new promise for spacebar\r\n            const handler = (e) => {\r\n                if (e.code === 'Space') {\r\n                    document.removeEventListener('keydown', handler); // stop listening for the spacebar\r\n                    infoText.textContent = \"\";\r\n                    this.gamePaused = false;\r\n                    resolve();\r\n                }\r\n            };\r\n            document.addEventListener('keydown', handler); // listen for the spacebar\r\n            infoText.textContent = \"Press Spacebar to Continue\";\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://battleship/./src/GameController.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\nclass Gameboard {\r\n    constructor (size = 10){\r\n        this.boardSize = size;\r\n        this.playedMoves = new Map(); // used to edit the dom\r\n        this.board = new Map()\r\n    }\r\n\r\n    formatCoordinates([row, column]) {\r\n        return `${row},${column}`;\r\n    }\r\n\r\n    isInBounds(coordinates, ship){\r\n        if (!Array.isArray(coordinates) || coordinates.length === 0 || !coordinates) {\r\n            return false; // Invalid coordinates\r\n        }\r\n        if (ship?.length && ship.length !== coordinates.length){\r\n            return false // Ship size does not match coordinates length\r\n        }    \r\n        \r\n        for (const [row, column] of coordinates) {\r\n            if (row < 0 || row >= this.boardSize || column < 0 || column >= this.boardSize) {\r\n                return false; // Out-of-bounds\r\n            }\r\n        }\r\n        return true;\r\n    }\r\n    \r\n    placeShip(ship, coordinates){ // need to make a statement if a ship is placed then to move it\r\n            \r\n        if (!this.isInBounds(coordinates, ship)){\r\n            return false // Out-of-bounds\r\n        }\r\n        \r\n        for (const coord of coordinates) {\r\n            const key = this.formatCoordinates(coord);\r\n            if (this.board.has(key)){\r\n                return false// Ship is already there\r\n            }\r\n        }\r\n\r\n        for (const coord of coordinates) {\r\n            const key = this.formatCoordinates(coord)\r\n            this.board.set(key, ship)\r\n        }\r\n        return true // Successful placement\r\n    }\r\n\r\n    receiveAttack(coordinates){ \r\n        if (!this.isInBounds(coordinates) || coordinates.length !== 1){\r\n            return 'Error'; // Out-of-bounds\r\n        }\r\n\r\n        const coord = coordinates[0];\r\n        const key = this.formatCoordinates(coord);\r\n\r\n        if(this.playedMoves.has(key)){\r\n            return false // Already played move\r\n        }\r\n\r\n        if(!this.board.has(key)){ // Miss\r\n            this.playedMoves.set(key, 'Miss');\r\n            return 'Miss'\r\n        } else if (this.board.has(key)){ // Hit\r\n            let ship = this.board.get(key); // Get the ship \r\n            ship.hit(); //add a hit\r\n\r\n            this.playedMoves.set(key, 'Hit');\r\n            return 'Hit'\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _makeDom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./makeDom */ \"./src/makeDom.js\");\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n/* harmony import */ var _GameController_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameController.js */ \"./src/GameController.js\");\n\r\n\r\n\r\n\r\nlet board = new _GameController_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]()\r\nboard.startGame()\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/makeDom.js":
/*!************************!*\
  !*** ./src/makeDom.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UIrender)\n/* harmony export */ });\nclass UIrender{\r\n    constructor (){\r\n        this.mainElement = document.getElementById('main');\r\n    }\r\n\r\n    renderBoard(player, boardId) {\r\n        const boardContainer = document.createElement('div');\r\n        boardContainer.classList.add('board');\r\n\r\n        boardContainer.setAttribute('id', boardId);\r\n    \r\n        const boardCaption = document.createElement('div');\r\n        boardCaption.classList.add('caption');\r\n        boardCaption.textContent = `${player.name}`;\r\n        boardContainer.appendChild(boardCaption);\r\n    \r\n        const boardGrid = document.createElement('div');\r\n        boardGrid.classList.add('board-grid');\r\n    \r\n        for (let row = 0; row < 10; row++) {\r\n            for (let col = 0; col < 10; col++) {\r\n                const cell = document.createElement('div');\r\n                const imgHolder = document.createElement('span');\r\n    \r\n                cell.classList.add('cell');\r\n                cell.dataset.row = row;\r\n                cell.dataset.col = col;\r\n    \r\n                boardGrid.appendChild(cell);\r\n                cell.appendChild(imgHolder);\r\n            }\r\n        }\r\n    \r\n        boardContainer.appendChild(boardGrid);\r\n        this.mainElement.appendChild(boardContainer);\r\n    }\r\n    \r\n\r\n    updateBoard(player, boardId){\r\n        let size = player.board.boardSize;\r\n        let playerBoard = document.getElementById(`${boardId}`)\r\n\r\n        for(let row = 0; row < size; row++){\r\n            for(let col = 0; col < size; col++){\r\n                const key = `${row},${col}`\r\n                const cell = playerBoard.querySelector(`[data-row=\"${row}\"][data-col=\"${col}\"]`);\r\n                const caption =  playerBoard.querySelector('.caption');\r\n               \r\n                // Reset the cell's content and class list\r\n                caption.textContent = `${player.name}`;\r\n                cell.className = 'cell';\r\n                const span = cell.querySelector(\"span\");\r\n                span.className = ''; // Reset span classes\r\n                span.textContent = ''; // Clear span content\r\n\r\n                // Show ships if they're sunk or if showShip is true\r\n                if (player.board.board.has(key)) {\r\n                    const ship = player.board.board.get(key);\r\n                    if (ship.sunk || boardId === 'player') {\r\n                        cell.classList.add(ship.name);\r\n                    }\r\n                }\r\n                // Update cell status based on played moves\r\n                if (player.board.playedMoves.has(key)) {\r\n                    const status = player.board.playedMoves.get(key);\r\n                    if (status === 'Hit') {\r\n                        span.classList.add('material-symbols-outlined');\r\n                        span.textContent = 'mode_heat';\r\n                    } else if (status === 'Miss') {\r\n                        span.classList.add('material-symbols-outlined');\r\n                        span.textContent = 'close';\r\n                    }\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    showGameOver(player){\r\n        const infoText  = document.querySelector('.infoText');\r\n        infoText.textContent = `${player.name} Wins!`;\r\n        infoText.style.display = 'block';\r\n    }\r\n}\n\n//# sourceURL=webpack://battleship/./src/makeDom.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/gameboard.js\");\n/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship.js */ \"./src/ship.js\");\n\r\n\r\n\r\nclass Player{\r\n    constructor(name, isComputer = false) {\r\n        this.board = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n        this.name = name;\r\n        this.isComputer = isComputer;\r\n        this.ships = {\r\n            \"Destroyer\": new _ship_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](2,'Destroyer'),\r\n            \"Submarine\": new _ship_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](3, 'Submarine'),\r\n            \"Cruiser\": new _ship_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](3, 'Cruiser'),\r\n            \"Battleship\": new _ship_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](4, 'Battleship'),\r\n            \"Carrier\": new _ship_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](5, 'Carrier')\r\n        }\r\n    }\r\n\r\n    sentAtack(enemy,coordinates){\r\n        if (this.isComputer){ // if computer is true\r\n            return this.makeRandomMove(enemy)\r\n        }else{\r\n            return enemy.board.receiveAttack(coordinates);\r\n        }\r\n    }\r\n\r\n    makeRandomMove(enemy){ \r\n        let validmove = false; // valid move if its played or not\r\n        let outcome;\r\n        while(!validmove){\r\n            let row = Math.floor(Math.random() * 10);\r\n            let col = Math.floor(Math.random() * 10);\r\n\r\n            let coordinates = [[row, col]];\r\n\r\n            outcome = enemy.board.receiveAttack(coordinates)\r\n            if(outcome !== false){\r\n                validmove = true\r\n            }\r\n        }\r\n        return outcome\r\n    }\r\n}\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ship)\n/* harmony export */ });\nclass Ship {\r\n    constructor(length, name){\r\n        this.length = length;\r\n        this.name = name;\r\n        this.isPlaced = false\r\n        this.sunk = false; // Stataus of ship condition\r\n        this.hits = 0; // Counter for the number of hits\r\n    }\r\n\r\n    hit(){\r\n        if(this.sunk){ // if ship already sunk\r\n            return false // do nothing\r\n        }\r\n\r\n        this.hits += 1\r\n\r\n        if(this.hits >= this.length){\r\n            this.sunk = true;\r\n            return this.sunk\r\n        }\r\n        \r\n        return true\r\n    }\r\n\r\n    isSunk(){\r\n        return this.sunk; //Return the current status\r\n    }\r\n}\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;