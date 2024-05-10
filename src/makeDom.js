export default class UIrender{
    constructor (player, enemy){
        this.player1 = player;
        this.player2 = enemy
    }

    renderGameboard(){
        this.renderBoard('player-board', this.player1.board, true)
        this.renderBoard('enemy-board', this.player2.board, false)
    }

    renderBoard(boardID, gameboard, showShip){
        const board = document.getElementById(boardID)
        board.innerHTML = 'hello world'
    }
}