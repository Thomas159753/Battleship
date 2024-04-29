import Ship from '../ship.js';

describe(('Ship tests'), () => {
    test("Creates a size 2 ship", () => {

        let ships = new Ship(3,"potato");

        expect(ships.name).toBe("potato");
        expect(ships.length).toBe(3);
        expect(ships.sunk).toBe(false);
        expect(ships.hits).toBe(0);
    })
    test("Test if hit in ships works", () => {

        let ships = new Ship(3,"potato2");
        ships.hit()

        expect(ships.hits).toBe(1);
    })
    test("Test ship sunk", () => {

        let ships = new Ship(3,"potato2");
        ships.hit()
        ships.hit()
        ships.hit()
        ships.isSunk()
        expect(ships.sunk).toBe(true);
    })
})