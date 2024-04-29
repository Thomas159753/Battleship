import Gameboard from '../gameboard.js';

describe(('Gameboard tests'), () => {
    test("Creates the gameboard 10 x 10", () => {
        let gameboard = new Gameboard;
        let gameboardRows = gameboard.board.length
        let gameboardColumns = gameboard.board.every(row => row.length === 10)
        expect(gameboardRows).toBe(10)
        expect(gameboardColumns).toBe(true)
    })
    test("Test Attack if missed or hit", () => {
        
    })
    // test("", () => {

    // })
})