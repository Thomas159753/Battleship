export default class UIrender{
    constructor (player1, player2){
        this.player1 = player1;
        this.player2 = player2
        this.mainElement = document.getElementById('main');
    }

    renderGameboard(){
        this.renderBoard(this.player1.name, this.player1.board, true)
        this.renderBoard(this.player2.name, this.player2.board, false)
    }

    renderBoard(caption, gameboard, showShip){
        const boardContaeiner = document.createElement('div');
        boardContaeiner.classList.add('board');

        const boardCaption = document.createElement('div');
        boardCaption.classList.add('caption');
        boardCaption.textContent = caption
        boardContaeiner.appendChild(boardCaption);

        const boardGrid = document.createElement('div')
        boardGrid.classList.add('board-grid')

        for(let row = 0; row < 10; row++){
            for(let col = 0; col < 10; col++){
                const cel = document.createElement('div');
                cel.classList.add('cel');
                cel.dataset.row = row;
                cel.dataset.col = col;

                const celstatus = gameboard.board[row][col];
                
                if(celstatus !== ''){
                    cel.classList.add(celstatus)
                }

            }
        }
        this.mainElement.appendChild(boardContaeiner)
    }
}