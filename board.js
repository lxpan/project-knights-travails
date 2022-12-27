import Node from './node.js';

// Create an 8x8 chess Board

const ROWS = 8;
const COLUMNS = 8;

function createBoard() {
    // note that this board array is referenced as board[Y-coord][X-coord]
    const _board = [];

    // populate board with empty spaces (denoted by zeroes)
    for (let i = 0; i < ROWS; i++) {
        // note that board[i] refers to Y coordinates, i.e. rows
        _board.push(Array(COLUMNS).fill('⬚'));
    }

    return _board;
}

// check if a potential move is within bounds of the 8x8 board
function isMoveLegal(move) {
    const x = move[0];
    const y = move[1];
    if (x >= 0 && x < 8 && y >= 0 && y < 8) {
        return true;
    }
    return false;
}

// enumerate all valid moves from an (x,y) board position
// input [row, col]
function listMoves(position) {
    const x = position[0];
    const y = position[1];

    const validMoves = [];

    // list of all possible knight moves
    const candidateMoves = [
        [x - 2, y + 1], // A1
        [x - 1, y + 2], // A2
        [x + 1, y + 2], // B1
        [x + 2, y + 1], // B2
        [x + 2, y - 1], // C1
        [x + 1, y - 2], // C2
        [x - 1, y - 2], // D1
        [x - 2, y - 1], // D2
    ];

    // run all possible move patterns from and all valid moves to array
    candidateMoves.forEach((move) => {
        if (isMoveLegal(move)) {
            validMoves.push(move);
        }
    });

    return validMoves;
}

// required as JavaScript object comparisons don't compare inner values
function arrayEqual(arrA, arrB) {
    if ((arrA[0] === arrB[0]) & (arrA[1] === arrB[1])) {
        return true;
    }
    return false;
}

// trace full move sequence once destination is found
function pathTrace(lastNode) {
    let node = lastNode;
    const path = [];

    while (node !== null) {
        path.push(node.position);
        node = node.parent;
    }

    return path.reverse();
}

// visualise move sequence on the board
function visualiseTrace(path) {
    const traceBoard = createBoard();
    let moveNumber = 0;

    for (let i = 0; i < path.length; i++) {
        const position = path[i];

        if (i === 0) {
            traceBoard[position[0]][position[1]] = 'S';
        } else {
            traceBoard[position[0]][position[1]] = moveNumber;
        }

        moveNumber += 1;
    }

    return traceBoard;
}

// find shortest knight path using breadth first search
function findPath(start, destination) {
    const startPosition = new Node(start);

    let nodeNumber = 0;

    const queue = [];
    const visited = new Set();

    queue.push(startPosition);

    while (queue.length > 0) {
        // dequeue
        const node = queue.shift();

        visited.add(JSON.stringify(node.position));

        // record sequence of nodes explored on board
        board[node.position[0]][node.position[1]] = nodeNumber;
        nodeNumber += 1;

        // if current position equals destination
        if (arrayEqual(node.position, destination)) {
            console.log(`Destination found: ${destination}`);
            board[node.position[0]][node.position[1]] = 'D';

            const path = pathTrace(node);
            console.log(
                `Arrived in ${path.length - 1} moves! Here is your path: `
            ); // - 1 to discount starting position
            console.log(path);

            const movePathBoard = visualiseTrace(path);
            console.table(movePathBoard);

            return;
        }

        // enqueue (expand current node by listing valid moves)
        const candidateMoves = listMoves(node.position);

        if (candidateMoves) {
            candidateMoves.forEach((move) => {
                // check that position hasn't already been seen before
                if (visited.has(JSON.stringify(move))) {
                } else {
                    let nodePosition = new Node(move);
                    nodePosition.parent = node;
                    // add new potential move to queue
                    queue.push(nodePosition);
                }
            });
        }
    }
}

const board = createBoard();

// positions: [x, y] => [col#), (row#)]
const startPos = [0, 4];
const targetPos = [7, 7];

findPath(startPos, targetPos);
board[startPos[0]][startPos[1]] = 'S';
// this shows all the nodes explored by the algorithm
// console.table(board);
