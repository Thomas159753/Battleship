import Gameboard from '../gameboard.js';
import Ship from '../ship.js';
import Player from '../player.js';

let player
beforeEach(() => {
    player = new Player('tester');
  });

describe(('Player tests'), () => {

    test("Creates Players", () => {
        expect(player.name).toBe('tester')
    })
    test("Sent Atack", () => {
        let enemy = new Player();
        enemy.placeShip(new Ship(2,'potato'), [[1,1],[1,2]])
        player.sentAtack(enemy,[[1,1]])
        expect
    })
})