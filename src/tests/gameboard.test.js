import { jest } from '@jest/globals'; 
jest.mock('../player.js');

import Gameboard from '../gameboard.js';
import Ship from '../ship.js';
import Player from '../player.js';

let board
let mockPlayer= new Player('test')
beforeEach(() => {
    board = new Gameboard();
  });

describe(('Gameboard tests'), () => {
    test("Creates the gameboard 10 x 10", () => {
        let gameboardRows = board.board.length
        let gameboardColumns = board.board.every(row => row.length === 10)
        expect(gameboardRows).toBe(10)
        expect(gameboardColumns).toBe(true)
    })
    test("Test Attacks", () => {
        let ship1 = new Ship(2,'Ship1');
        expect(board.placeShip(ship1,[[1,3],[2,3]])).toBe(true);
        expect(board.receiveAttack([[3,3]])).toBe('Miss');
        expect(board.receiveAttack([[2,3]])).toBe('Hit');
        expect(ship1.hits).toBe(1)
        expect(board.receiveAttack([[2,3]])).toBe(false);
    })
    test("Test Game Over", () => {

        board.placeShip(mockPlayer.ships['Destroyer'],[[1,3],[2,3]]);
        board.receiveAttack([[2,3]]);
        
        expect(board.isGameOver(mockPlayer)).toBe(false);

        Object.values(mockPlayer.ships).forEach((ship) => {
            for (let i = 0; i < ship.length; i++) {
              ship.hit();
            }
        });

        expect(board.isGameOver(mockPlayer)).toBe(true);
    })
})