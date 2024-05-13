import UIrender from './makeDom';
import Player from './player.js'

let player1 = new Player('test1', false)
let player2 = new Player('test2', false)
let make = new UIrender(player1,player2)
make.renderGameboard()