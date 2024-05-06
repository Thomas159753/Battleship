import GameController from "../GameController";
import Player from "../player";
import Ship from "../ship";
import { jest } from '@jest/globals'; 

jest.mock('../ship', () => {
    return jest.fn().mockImplementation((length, name) => {
        return {
        length,
        name,
        hits: 0,
        sunk: false,
        hit() {
            this.hits++;
            if (this.hits >= length) {
            this.sunk = true;
            }
            return this.hits;
        },
        isSunk() {
            return this.sunk;
        },
        };
    });
});

describe(('GameController'), () => {
    let gameController;

    beforeEach(() =>{
        gameController = new GameController;
        gameController.placeShips();
    })

    test('initializes with correct players and turns', () => {
        expect(gameController.player1).toBeInstanceOf(Player);
        expect(gameController.player2).toBeInstanceOf(Player);
        expect(gameController.playerTurn).toBe(gameController.player1);
    });

    test('switches turns correctly', () => {
        gameController.switchTurns()
        expect(gameController.playerTurn).not.toBe(gameController.player1);

        gameController.switchTurns()
        expect(gameController.playerTurn).toBe(gameController.player1)
    });

    test('sends player attack and switches turns', () => {
        let coordinates = [[1,3]];
        
        gameController.makePlayerAttack(coordinates);

    })

    test('game ends when all ships are sunk', () => {

    })

    test('computer attack works and switches turns', () => {

    })
})