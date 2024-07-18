document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('board');
    const cells = Array.from(document.getElementsByClassName('cell'));
    const playerSymbol = 'x';
    const computerSymbol = 'o';
    let board = Array(9).fill(null);

    const checkWinner = (board) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    const isBoardFull = (board) => board.every(cell => cell !== null);

    const minimax = (board, depth, isMaximizing) => {
        const winner = checkWinner(board);
        if (winner === computerSymbol) return 10 - depth;
        if (winner === playerSymbol) return depth - 10;
        if (isBoardFull(board)) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = computerSymbol;
                    let score = minimax(board, depth + 1, false);
                    board[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = playerSymbol;
                    let score = minimax(board, depth + 1, true);
                    board[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };

    const computerMove = () => {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = computerSymbol;
                let score = minimax(board, 0, false);
                board[i] = null;
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        makeMove(move, computerSymbol);
    };

    const makeMove = (index, symbol) => {
        if (!board[index]) {
            board[index] = symbol;
            cells[index].classList.add(symbol);
            cells[index].innerText = symbol;
            const winner = checkWinner(board);
            if (winner) {
                alert(`${winner.toUpperCase()} wins!`);
                resetGame();
            } else if (isBoardFull(board)) {
                alert('Draw!');
                resetGame();
            } else if (symbol === playerSymbol) {
                setTimeout(computerMove, 500);
            }
        }
    };

    const resetGame = () => {
        board = Array(9).fill(null);
        cells.forEach(cell => {
            cell.classList.remove(playerSymbol, computerSymbol);
            cell.innerText = '';
        });
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => makeMove(index, playerSymbol));
    });

    resetGame();
});
