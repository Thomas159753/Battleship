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

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Gameboard)\n/* harmony export */ });\nclass Gameboard {\r\n    constructor (){\r\n        const boardTemplate = [ // standar 10x10 board 2D Array\r\n            ['', '', '', '', '', '', '', '', '', '',],\r\n            ['', '', '', '', '', '', '', '', '', '',],\r\n            ['', '', '', '', '', '', '', '', '', '',],\r\n            ['', '', '', '', '', '', '', '', '', '',],\r\n            ['', '', '', '', '', '', '', '', '', '',],\r\n            ['', '', '', '', '', '', '', '', '', '',],\r\n            ['', '', '', '', '', '', '', '', '', '',],\r\n            ['', '', '', '', '', '', '', '', '', '',],\r\n            ['', '', '', '', '', '', '', '', '', '',],\r\n            ['', '', '', '', '', '', '', '', '', '',],\r\n        ]\r\n        this.playedMoves = new Map();\r\n        this.ships = {}\r\n\r\n        this.board = boardTemplate;\r\n    }\r\n\r\n    isInBounds(coordinates, ship){\r\n        if (!Array.isArray(coordinates) || coordinates.length === 0) {\r\n            return false; // Invalid coordinates\r\n        }\r\n        if (ship?.length && ship.length !== coordinates.length){\r\n            return false\r\n        }    \r\n        \r\n        for (const coord of coordinates) {\r\n            \r\n            const [row, column] = coord;\r\n\r\n            if (row < 0 || row >= this.board.length || column < 0 || column >= this.board[0].length){\r\n                return false // Out-of-bounds\r\n            }\r\n        }\r\n        return true\r\n    }\r\n    \r\n    placeShip(ship, coordinates){ // need to make a statement if a ship is placed then to move it\r\n            \r\n        if (!this.isInBounds(coordinates, ship)){\r\n            return false // Out-of-bounds\r\n        }\r\n        \r\n        for (const coord of coordinates) {\r\n            const [row, column] = coord;\r\n\r\n            if(this.board[row][column] !== ''){\r\n                return false // Cell is occupeied\r\n            }\r\n\r\n            this.board[row][column] = ship; // Place ship\r\n        }\r\n\r\n        this.ships[ship.name] = ship\r\n        return true // Successful placement\r\n    }\r\n\r\n    getStatus(row, column){\r\n\r\n    }\r\n\r\n    receiveAttack(coordinates){\r\n        if (!this.isInBounds(coordinates)){\r\n            return false // Out-of-bounds\r\n        }\r\n\r\n        for (const coord of coordinates) {\r\n            const [row, column] = coord\r\n\r\n            if(this.playedMoves.has(`${row},${column}`)){ // if already played move\r\n                return false\r\n            }\r\n\r\n            if(this.board[row][column] === ''){ // if its a miss\r\n                this.playedMoves.set(`${row},${column}`, 'Miss');\r\n                this.board[row][column] === 'Miss'\r\n                return 'Miss'\r\n            }else if (typeof this.board[row][column] === 'object'){ // if its a hit\r\n                this.board[row][column].hit();\r\n                tthis.playedMoves.set(`${row},${column}`, 'Hit');\r\n                this.board[row][column] = 'Hit'\r\n                return 'Hit'\r\n            }\r\n        }\r\n\r\n        return 'Error'\r\n    }\r\n\r\n    isGameOver(){\r\n       const shipsList = Object.values(this.ships)\r\n\r\n       for(const ship of shipsList){\r\n        if(!ship.isSunk()){\r\n            return false\r\n        }\r\n       }\r\n       return true\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _makeDom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./makeDom */ \"./src/makeDom.js\");\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n\r\n\r\n\r\nlet player1 = new _player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('test1', false)\r\nlet player2 = new _player_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('test2', false)\r\nlet make = new _makeDom__WEBPACK_IMPORTED_MODULE_0__[\"default\"](player1,player2)\r\nmake.renderGameboard()\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/makeDom.js":
/*!************************!*\
  !*** ./src/makeDom.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UIrender)\n/* harmony export */ });\nclass UIrender{\r\n    constructor (player1, player2){\r\n        this.player1 = player1;\r\n        this.player2 = player2\r\n        this.mainElement = document.getElementById('main');\r\n    }\r\n\r\n    renderGameboard(){\r\n        this.renderBoard(this.player1.name, this.player1.board, true)\r\n        this.renderBoard(this.player2.name, this.player2.board, false)\r\n    }\r\n\r\n    renderBoard(caption, gameboard, showShip){\r\n        const boardContaeiner = document.createElement('div');\r\n        boardContaeiner.classList.add('board');\r\n\r\n        const boardCaption = document.createElement('div');\r\n        boardCaption.classList.add('caption');\r\n        boardCaption.textContent = caption\r\n        boardContaeiner.appendChild(boardCaption);\r\n\r\n        const boardGrid = document.createElement('div')\r\n        boardGrid.classList.add('board-grid')\r\n\r\n        for(let row = 0; row < 10; row++){\r\n            for(let col = 0; col < 10; col++){\r\n                const cel = document.createElement('div');\r\n                cel.classList.add('cel');\r\n                cel.dataset.row = row;\r\n                cel.dataset.col = col;\r\n            }\r\n        }\r\n        this.mainElement.appendChild(boardContaeiner)\r\n    }\r\n}\n\n//# sourceURL=webpack://battleship/./src/makeDom.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Player)\n/* harmony export */ });\n/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard.js */ \"./src/gameboard.js\");\n\r\n\r\nclass Player{\r\n    constructor(name, isComputer = false) {\r\n        this.board = new _gameboard_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n        this.name = name;\r\n        this.isComputer = isComputer;\r\n    }\r\n\r\n    sentAtack(enemy,coordinates){\r\n        if (this.isComputer){\r\n            return this.makeRandomMove(enemy)\r\n        }\r\n        return enemy.board.receiveAttack(coordinates);\r\n    }\r\n\r\n    makeRandomMove(enemy){\r\n        let validmove = false;\r\n        let outcome;\r\n        while(!validmove){\r\n            let row = Math.floor(Math.random() * 10);\r\n            let col = Math.floor(Math.random() * 10);\r\n\r\n            let coordinates = [[row, col]];\r\n\r\n            outcome = enemy.board.receiveAttack(coordinates)\r\n            if(outcome !== false){\r\n                validmove = true\r\n            }\r\n        }\r\n        return outcome\r\n    }\r\n}\n\n//# sourceURL=webpack://battleship/./src/player.js?");

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