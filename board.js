// Create an 8x8 hess Board

const ROWS = 8;
const COLUMNS = 8;
const board = []

// populate board with empty spaces (denoted by zeroes)
for (let i = 0; i < ROWS; i++) {
    board.push(Array(COLUMNS).fill(0))
}

// check if a potential move is within bounds of the 8x8 board
function isMoveLegal(move) {
    const x = move[0];
    const y = move[1];
    if ( (x >= 0 && x < 8) && (y >= 0 && y < 8)) {
        return true;
    }
    return false;
}

// enumerate all valid moves from an (x,y) board position
function listMoves(x, y) {
    const validMoves = [];

    // list of all possible knight moves
    const candidateMoves = [
        [(x - 2), (y + 1)], // A1
        [(x - 1), (y + 2)], // A2
        [(x + 1), (y + 2)], // B1
        [(x + 2), (y + 1)], // B2
        [(x + 2), (y - 1)], // C1
        [(x + 1), (y - 2)], // C2
        [(x - 1), (y - 2)], // D1
        [(x - 2), (y - 1)], // D2
    ];

    // run all possible move patterns from and all valid moves to array
    candidateMoves.forEach((move) => {
        if(isMoveLegal(move)) {
            validMoves.push(move);
        }
    })

    return validMoves;
}
const startX = 3;
const startY = 1;

board[startX][startY] = 'K';

const validMoves = listMoves(startX, startY);
validMoves.forEach(move => {
    const x = move[0];
    const y = move[1];
    board[x][y] = 'V';
})

console.log(validMoves)
console.table(board);;

// const s = [1, 1];
// const translatedPos = [s[0] + 7, s[1] + 7]
