// Create an 8x8 hess Board

const rows = 8;
const columns = 8;
const board = []

for (let i = 0; i < rows; i++) {
    board.push(Array(columns).fill(0))
}

function isMoveLegal(move) {
    const x = move[0];
    const y = move[1];
    if ( (x >= 0 && x < 8) && (y >= 0 && y < 8)) {
        return true;
    }
    return false;
}

function listMoves(x, y) {
    const validMoves = [];
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

    candidateMoves.forEach((move) => {
        if(isMoveLegal(move)) {
            validMoves.push(move);
        }
    })

    return validMoves;
}

board[3][1] = 'K';

const validMoves = listMoves(3,1);
validMoves.forEach(move => {
    const x = move[0];
    const y = move[1];
    board[x][y] = 'V';
})

console.log(validMoves)
console.table(board);;

// const s = [1, 1];
// const translatedPos = [s[0] + 7, s[1] + 7]
