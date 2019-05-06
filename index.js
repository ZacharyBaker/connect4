const readline = require('readline');

const PLAYER1 = '0';
const PLAYER2 = '%';
let P1NAME;
let P2NAME;
let board;
let fullColumns = {};

const getName = (num) => {
	let response;
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
  });

  return new Promise(resolve => rl.question(`Player ${num}, what's your name?`, name => {
		rl.close();
		console.log(`Welcome, ${name}!`)
		console.log('\n')
		resolve(name);
  }))
}

const waitForPromise = async (promise) => await promise;


async function getNames () {
	P1NAME = await getName(1);
	P2NAME = await getName(2);

	playGame();
}

getNames();


function buildBoard() {
	const board = [];

	for (let i = 0; i < 7; i++) {
		const row = new Array(7).fill('x');
		board.push(row);
	}

	return board;
}


function printPretty(board) {
	const FgCyan = '\x1b[36m';
	const FgMagenta = '\x1b[35m';

	console.log('\x1b[44m  1  2  3  4  5  6  7\x1b[0m');

	for (let i = 0; i < board.length; i++) {

		let rowString = '';
		for (let j = 0; j < board[i].length; j++) {
			if (board[i][j] === PLAYER1) {
				rowString += '  ' + FgCyan + board[i][j] + '\x1b[0m';
			} else if (board[i][j] === PLAYER2) {
				rowString += '  ' + FgMagenta + board[i][j] + '\x1b[0m';
			} else {
				rowString += '  ' + board[i][j];
			}
		}
		console.log(rowString);
	}
}

const takeTurn = async (player, playerName, board) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('\n');
	return new Promise((resolve, reject) => {
		rl.question(`${playerName}, what's your move?`, (column) => {
			// validate input
			let validMove = false;
			let row;
			if (/[1-7]/.test(column) && !fullColumns[column]) {
				[board, row] = dropPiece(player, column, board);
				validMove = [row, column - 1];
			  rl.close();
			  return resolve({ validMove, board });
			}

			console.log('\n');
			console.log(`Invalid move ${playerName}, try again`);
		  rl.close();
		  return resolve({ validMove, board });
		})
	})
	
}

function dropPiece(player, column, board) {
	const col = column - 1;

	let ROW;
	for (let row = board.length - 1; row >= 0; row--) {
		if (board[row][col] === 'x') {
			board[row][col] = player;
			ROW = row;
			// is the column full?
			if (row === 0) {
				fullColumns[row + 1] = true;
			}

			break;
		}
	}

	return [board, ROW];
}

function winCheck (player, board, validMove) {
	let inARow = 1;
	let [row, col] = validMove;
	let walk = 1;

	// check south
	while(board[row + walk]) {
		if (board[row + walk][col] === player) {
			inARow++;
			walk++;
			if (inARow >= 4) return true;
		} else {
			break;
		}
	}

	inARow = 1;
	walk = 1;
	// east/west
	// find furthest left, then check right
	let left = 0;
	while (board[row][col - walk]) {
		if (board[row][col - walk] === player) {
			left = walk;
			walk++;
		} else {
			break;
		}
	}

	walk = 1;
	let leftCol = col - left;
	// use the left and go right
	while(board[row][leftCol + walk]) {
		if (board[row][leftCol + walk] === player) {
			walk++;
			inARow++;
			if (inARow >= 4) return true;
		} else {
			break;
		}
	}

	inARow = 1;
	walk = 1;

	// SW/NE
	// find bottom left
	let bottomleft = 0;
	while(board[row + walk] && board[row + walk][col - walk]) {
		if (board[row + walk][col - walk] === player) {
			bottomleft = walk;
			walk++;
		} else {
			break;
		}
	}

	walk = 1;
	let bottomleftRow = row + bottomleft;
	let bottomleftCol = col - bottomleft;
	// use bottom left and go NE
	while(board[bottomleftRow - walk] && board[bottomleftRow - walk][bottomleftCol + walk]) {
		if (board[bottomleftRow - walk][bottomleftCol + walk] === player) {
			inARow++;
			walk++;
			if (inARow >= 4) return true;
		} else {
			break;
		}
	}

	walk = 1;
	inARow = 1;

	// find top left
	let topleft = 0;
	while(board[row - walk] && board[row - walk][col - walk]) {
		if (board[row - walk][col - walk] === player) {
			topleft = walk;
			walk++;
		} else {
			break;
		}
	}

	walk = 1;
	let topleftRow = row - topleft;
	let topleftCol = col - topleft;
	while(board[topleftRow + walk] && board[topleftRow + walk][topleftCol + walk]) {
		if (board[topleftRow + walk][topleftCol + walk] === player) {
			inARow++;
			walk++;
			if (inARow >= 4) return true;
		} else {
			break;
		}
	}

	return false;
}

async function playGame(board) {
	board = buildBoard();
	printPretty(board);
	let winner = false;
	let player = PLAYER1;
	let playerName = P1NAME;

	while (!winner) {
		let { validMove, board: nextBoard } = await takeTurn(player, playerName, board);
		printPretty(nextBoard);

		if (validMove) {
			if (winCheck(player, nextBoard, validMove)) {
				winner = true;
				console.log(`${playerName} wins!!!`);
				return;
			}
			player = player === PLAYER1 ? PLAYER2 : PLAYER1;
			playerName = playerName === P1NAME ? P2NAME : P1NAME;
		}
	}
}
