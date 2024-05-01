import Gameboard from '../gameboard.js';
import Ship from '../ship.js';

let board
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
        expect(board.receiveAttack([[2,3]])).toBe('Already Hit');
    })
    test("Test Game Over", () => {
        let ship1 = new Ship(2,'Ship1');
        let ship2 = new Ship(1,'Ship2');
        board.placeShip(ship1,[[1,3],[2,3]]);
        board.receiveAttack([[2,3]]);
        expect(board.isGameOver()).toBe(false);
        board.placeShip(ship1,[[4,1]]);
        board.receiveAttack([[1,3]]);
        board.receiveAttack([[4,1]]);
        expect(board.isGameOver()).toBe(true);
    })
})