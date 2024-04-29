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
    test("Test Attack if a missed", () => {
        let ship1 = new Ship(2,'Ship1');
        expect(board.placeShip(ship1,[[1,3],[2,3]])).toBe(true);
        expect(board.receiveAttack([3,3])).toBe('Miss');

    })
    // test("", () => {

    // })
})