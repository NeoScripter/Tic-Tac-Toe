'use strict'

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const Game = {
    board: Array.from({ length: 3}, () => Array(3).fill('.')),

    players: {1: 'X', 2: 'O'},

    currentPlayer: 0,

    updateTurn() {
        this.currentPlayer = (this.currentPlayer + 1) % 2;
    },

    printBoard() {
        this.board.forEach(row => {
            console.log(row.join(' '));
        })
    },

    setValue(row, col, value) {
        this.board[row - 1][col - 1] = value;
    },

    isFieldEmpty(row, col) {
        if (this.board[row - 1][col - 1] === '.') {
            return true;
        } else {
            return false;
        }
    },

    fillBoard(value) {
        for (let y = 1; y <= 3; y++) {
            for (let x = 1; x <= 3; x++) {
                this.setValue(x, y, value);
            }
        }
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
    },

    checkGameOver() {
        return this.board.every(row => {
            return row.every(cell => cell !== '.');
        });
    },

    makeMove() {
        console.log(`Player's ${this.currentPlayer + 1} move`);
        rl.question('Please enter the position of your move in the format (row, column): ', (input) => {
            const [row, column] = input.split(' ').map(Number);
        
            if (this.isFieldEmpty(row, column)) {
                this.setValue(row, column, this.players[this.currentPlayer + 1]);
                this.updateTurn();
                this.printBoard();
                if (this.checklines()) {
                    console.log(`Player's ${this.currentPlayer + 1} wins!`);
                    rl.close();
                } else {
                    if (!this.checkGameOver()) { 
                        this.makeMove();
                    } else {
                        console.log("Draw!");
                        rl.close();
                    }
                }
            } else {
                this.makeMove();
            }
        });
    }
}

/* Game.setValue(1, 2, '4');
Game.setValue(2, 2, '4');
Game.setValue(3, 2, '4');
Game.fillBoard('.');
console.log(Game.setValue(2, 1, '.'));
Game.printBoard();
console.log(Game.checklines());
console.log(Game.checkGameEnd()); */

Game.makeMove();

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