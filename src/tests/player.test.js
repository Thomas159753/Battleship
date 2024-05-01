import Gameboard from '../gameboard.js';
import Ship from '../ship.js';
import Player from '../player.js';


describe(('Player tests'), () => {

    test("Creates Players", () => {
        let player = new Player('Tester')
        expect(player.playerName).toBe('Tester')
    })
})