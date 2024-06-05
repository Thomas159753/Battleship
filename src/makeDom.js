export default class UIrender{
    constructor (){
        this.mainElement = document.getElementById('main');
    }

    renderBoard(player, boardId) {
        const boardContainer = document.createElement('div');
        boardContainer.classList.add('board');

        boardContainer.setAttribute('id', boardId);
    
        const boardCaption = document.createElement('div');
        boardCaption.classList.add('caption');
        boardCaption.textContent = `${player.name}`;
        boardContainer.appendChild(boardCaption);
    
        const boardGrid = document.createElement('div');
        boardGrid.classList.add('board-grid');
    
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                const cell = document.createElement('div');
                const imgHolder = document.createElement('span');
    
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
    
                boardGrid.appendChild(cell);
                cell.appendChild(imgHolder);
            }
        }
    
        boardContainer.appendChild(boardGrid);
        this.mainElement.appendChild(boardContainer);
    }
    

    updateBoard(player, boardId){
        let size = player.board.boardSize;
        let playerBoard = document.getElementById(`${boardId}`)

        for(let row = 0; row < size; row++){
            for(let col = 0; col < size; col++){
                const key = `${row},${col}`
                const cell = playerBoard.querySelector(`[data-row="${row}"][data-col="${col}"]`);
                const caption =  playerBoard.querySelector('.caption');
               
                // Reset the cell's content and class list
                caption.textContent = `${player.name}`;
                cell.className = 'cell';
                const span = cell.querySelector("span");
                span.className = ''; // Reset span classes
                span.textContent = ''; // Clear span content

                // Show ships if they're sunk or if showShip is true
                if (player.board.board.has(key)) {
                    const ship = player.board.board.get(key);
                    if (ship.sunk || boardId === 'player') {
                        cell.classList.add(ship.name);
                    }
                }
                // Update cell status based on played moves
                if (player.board.playedMoves.has(key)) {
                    const status = player.board.playedMoves.get(key);
                    if (status === 'Hit') {
                        span.classList.add('material-symbols-outlined');
                        span.textContent = 'mode_heat';
                    } else if (status === 'Miss') {
                        span.classList.add('material-symbols-outlined');
                        span.textContent = 'close';
                    }
                }
            }
        }
    }

    showGameOver(player){
        const infoText  = document.querySelector('.infoText');
        infoText.textContent = `${player.name} Wins!`;
        infoText.style.display = 'block';
    }
}