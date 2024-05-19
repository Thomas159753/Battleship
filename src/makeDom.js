export default class UIrender{
    constructor (player1, player2){
        this.player1 = player1;
        this.player2 = player2
        this.mainElement = document.getElementById('main');
    }

    renderGameboard(){
        this.renderBoard(this.player1, true)
        this.renderBoard(this.player2, false)
    }

    renderBoard(player, showShip){
        const boardContainer = document.createElement('div');
        boardContainer.classList.add('board');
        showShip? boardContainer.setAttribute('id', 'player') : boardContainer.setAttribute('id', 'enemy');

        const boardCaption = document.createElement('div');
        boardCaption.classList.add('caption');
        boardCaption.textContent = `${player.name}`;
        boardContainer.appendChild(boardCaption);

        const boardGrid = document.createElement('div')
        boardGrid.classList.add('board-grid')

        for(let row = 0; row < 10; row++){
            for(let col = 0; col < 10; col++){
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;

                const celstatus = player.board.board[row][col];

                if(typeof celstatus === 'object' && showShip){
                    cell.classList.add('Ship');
                    cell.classList.add(`${celstatus.name}`);
                
                }
                if(celstatus !== '' && typeof celstatus !== 'object'){
                    
                    cell.classList.add(`${celstatus}`);
                }
                boardGrid.appendChild(cell);
            }
        }
        boardContainer.appendChild(boardGrid);
        this.mainElement.appendChild(boardContainer);
    }

    updateBoard(player, showShip){
        const board = showShip? document.getElementById('player') : document.getElementById('enemy');

        const boardGrid = board.querySelector('.board-grid');

        for(let row = 0; row < 10; row++){
            for(let col = 0; col < 10; col++){
                const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

                const celstatus = player.board.board[row][col];

                if(typeof celstatus === 'object' && showShip){
                    cell.classList.add('Ship');
                }
                if(celstatus !== '' && typeof celstatus !== 'object'){
                    cell.classList.add(`${celstatus}`);
                }
            }
        }
    }

    showGameOver(player){
        const infoText  = document.getElementById('game-over');
        infoText.textContent = `${player.name} Wins!`;
        infoText.style.display = 'block';
    }
}