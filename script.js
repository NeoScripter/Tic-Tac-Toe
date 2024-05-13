'use strict'

class Game {
    constructor() {
        this.board = Array.from({ length: 3 }, () => Array(3).fill('.'));
        this.players = {1: 'X', 2: 'O'};
        this.currentPlayer = 0;
        this.attributeMap = {0: '0 0', 1: '0 1', 2: '0 2', 3: '1 0', 4: '1 1', 5: '1 2', 6: '2 0', 7: '2 1', 8: '2 2'};
    };

    updateTurn() {
        this.currentPlayer = (this.currentPlayer + 1) % 2;
    };

    updateDisplay(cells) {
        let currentIndex = 0;
        for (const row of this.board) {
            for (const field of row) {
                if (field === 'O') {
                    cells[currentIndex].classList.add('circle');
                } else if (field === 'X') {
                    cells[currentIndex].classList.add('cross');
                }
                currentIndex++;
            }
        }
    };

    clearDisplay(cells) {
        for (const cell of cells) {
            cell.classList.remove('circle');
            cell.classList.remove('cross');
        }
    }

    getCoordinates(attribute) {
        const coordinates = this.attributeMap[attribute];
        const [row, column] = coordinates.split(' ').map(Number);
        return [row, column];
    }

    updateArray(row, column) {
        this.setValue(row, column, this.players[this.currentPlayer + 1]);
    };

    setValue(row, col, value) {
        this.board[row][col] = value;
    };

    isFieldEmpty(row, col) {
        if (this.board[row][col] === '.') {
            return true;
        } else {
            return false;
        }
    };

    clearBoard() {
        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                this.setValue(x, y, '.');
            }
        }
    };

    checkRows() {
        let notWinnerRows = 0;
        for (let y = 0; y < 3; y++) {
            let previousElement;
            for (let x = 0; x < 2; x++) {
                previousElement = this.board[y][x];
                if (previousElement !== this.board[y][x + 1] || previousElement === '.') {
                    notWinnerRows++;
                    break;
                }
            }
        }
        return (notWinnerRows === 3) ? false : true;
    };

    checkColumns() {
        let notWinnerColumns = 0;
        for (let y = 0; y < 3; y++) {
            let previousElement;
            for (let x = 0; x < 2; x++) {
                previousElement = this.board[x][y];
                if (previousElement !== this.board[x + 1][y] || previousElement === '.') {
                    notWinnerColumns++;
                    break;
                }
            }
        }
        return (notWinnerColumns === 3) ? false : true;
    };

    checkDiagonals() {
        const center = this.board[1][1];
        if (center === '.') {
            return false;
        }
        return (center === this.board[0][0] && center === this.board[2][2]) ||
            (center === this.board[0][2] && center === this.board[2][0]);
    };

    checklines() {
        return (this.checkDiagonals() || this.checkColumns() || this.checkRows());
    };

    checkGameOver() {
        return this.board.every(row => {
            return row.every(cell => cell !== '.');
        });
    };

    reset(cells) {
        this.clearBoard();
        this.clearDisplay(cells);
        this.currentPlayer = 0;
    };
}

document.addEventListener("DOMContentLoaded", function() {
    const game = new Game();

    const gameboard = document.querySelector('.gameboard');
    const cells = gameboard.querySelectorAll('.cell');
    const display = document.querySelector('.display-panel');

    gameboard.addEventListener('click', function(event) {
        const cell = event.target.closest('.cell');
        display.textContent = `Player's ${game.currentPlayer + 1} move`;
        const index = cell.getAttribute('data-index');
        const [row, column] = game.getCoordinates(index);
        const fieldIsEmpty = game.isFieldEmpty(row, column);
        if (fieldIsEmpty) {
            console.log('Field is empty');
            game.updateArray(row, column);
            game.updateDisplay(cells);

            if (game.checklines()) {
                display.textContent = `Player ${game.currentPlayer + 1} wins!`;
                setTimeout(() => {
                    game.reset(cells);
                    display.textContent = `Player's ${game.currentPlayer + 1} move`;
                }, 1500);
            } else {
                if (game.checkGameOver()) { 
                    display.textContent = `Draw!`;
                    setTimeout(() => {
                        game.reset(cells);
                        display.textContent = `Player's ${game.currentPlayer + 1} move`;
                    }, 1500);
                } else {
                    game.updateTurn();
                    display.textContent = `Player's ${game.currentPlayer + 1} move`;
                }
            }
        }
    });
});