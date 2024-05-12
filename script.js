'use strict'

const GameBoard = {
    board: Array.from({ length: 3}, () => Array(3).fill('.')),

    printBoard() {
        this.board.forEach(row => {
            console.log(row.join(' '));
        })
    },

    setValue(row, col, value) {
        this.board[row - 1][col - 1] = value;
    },

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
    },

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
    },

    checkDiagonals() {
        const center = this.board[1][1];
        if (center === '.') {
            return false;
        }
        return (center === this.board[0][0] && center === this.board[2][2]) ||
               (center === this.board[0][2] && center === this.board[2][0]);
    },

    checklines() {
        return (this.checkDiagonals() || this.checkColumns() || this.checkRows());
    }
}

GameBoard.setValue(1, 2, '4');
GameBoard.setValue(2, 2, '4');
GameBoard.setValue(3, 2, '4');
GameBoard.printBoard();
console.log(GameBoard.checklines());

/* function checkLine() {
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
} 

checkRows() {
        return this.board.some(row => {
            const first = row[0];
            return first !== '.' && row.every(cell => cell === first);
        });
    },
    */