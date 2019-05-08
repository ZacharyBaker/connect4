const readline = require('readline');

class Game {
	constructor(p1, p2) {
		this.p1 = p1;
		this.p1Piece = '0';
		this.p2 = p2;
		this.p2Piece = '%';
		this.board = this.buildBoard();
		this.fullColumns = {};
		this.activePlayer = this.p1;
	}

	buildBoard () {
		const board = [];

		for (let i = 0; i < 7; i++) {
			const row = new Array(7).fill('x');
			board.push(row);
		}

		return board;
	}

	printPretty () {
		const FgCyan = '\x1b[36m';
		const FgMagenta = '\x1b[35m';

		console.log('\x1b[44m  1  2  3  4  5  6  7\x1b[0m');

		for (let i = 0; i < this.board.length; i++) {

			let rowString = '';
			for (let j = 0; j < this.board[i].length; j++) {
				if (this.board[i][j] === this.p1.char) {
					rowString += '  ' + FgCyan + this.board[i][j] + '\x1b[0m';
				} else if (this.board[i][j] === this.p2.char) {
					rowString += '  ' + FgMagenta + this.board[i][j] + '\x1b[0m';
				} else {
					rowString += '  ' + this.board[i][j];
				}
			}
			console.log(rowString);
		}
	}

	async takeTurn () {
		// passing the board for the bots
		const column = await this.activePlayer.takeTurn(this.board);
	  console.log('\n');
		// validate input
		let validMove = false;
		let row;
		if (/[1-7]/.test(column) && !this.fullColumns[column]) {
			row = this.dropPiece(this.activePlayer.char, column);
			validMove = [row, column - 1];
		  return validMove;
		}

		console.log('\n');
		console.log(`Invalid move ${this.activePlayer.name}, try again`);
	  return validMove;
	}

	dropPiece (char, column) {
		const col = column - 1;

		let validRow;
		for (let row = this.board.length - 1; row >= 0; row--) {
			if (this.board[row][col] === 'x') {
				this.board[row][col] = char;
				validRow = row;

				// is the column full?
				if (row === 0) {
					this.fullColumns[row + 1] = true;
				}

				break;
			}
		}

		return validRow;
	}

	winCheck(validMove) {
		let inARow = 1;
		let [row, col] = validMove;
		let walk = 1;

		// check south
		while(this.board[row + walk]) {
			if (this.board[row + walk][col] === this.activePlayer.char) {
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
		while (this.board[row][col - walk]) {
			if (this.board[row][col - walk] === this.activePlayer.char) {
				left = walk;
				walk++;
			} else {
				break;
			}
		}

		walk = 1;
		let leftCol = col - left;
		// use the left and go right
		while(this.board[row][leftCol + walk]) {
			if (this.board[row][leftCol + walk] === this.activePlayer.char) {
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
		while(this.board[row + walk] && this.board[row + walk][col - walk]) {
			if (this.board[row + walk][col - walk] === this.activePlayer.char) {
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
		while(this.board[bottomleftRow - walk] && this.board[bottomleftRow - walk][bottomleftCol + walk]) {
			if (this.board[bottomleftRow - walk][bottomleftCol + walk] === this.activePlayer.char) {
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
		while(this.board[row - walk] && this.board[row - walk][col - walk]) {
			if (this.board[row - walk][col - walk] === this.activePlayer.char) {
				topleft = walk;
				walk++;
			} else {
				break;
			}
		}

		walk = 1;
		let topleftRow = row - topleft;
		let topleftCol = col - topleft;
		while(this.board[topleftRow + walk] && this.board[topleftRow + walk][topleftCol + walk]) {
			if (this.board[topleftRow + walk][topleftCol + walk] === this.activePlayer.char) {
				inARow++;
				walk++;
				if (inARow >= 4) return true;
			} else {
				break;
			}
		}

		return false;
	}

	async play () {
		this.printPretty();
		let winner = false;

		while (!winner) {
			let validMove = await this.takeTurn();
			this.printPretty();

			if (validMove) {
				if (this.winCheck(validMove)) {
					winner = true;
					console.log(`${this.activePlayer.name} wins!!!`);

					let newGame = await this.activePlayer.startNewGame();

					if (newGame) {
						this.newGame();
					} else {
						return;
					}
				}
				this.activePlayer = this.activePlayer === this.p1 ? this.p2 : this.p1;
			}
		}
	}

	newGame() {
		this.board = this.buildBoard();
		this.fullColumns = {};
		this.activePlayer = this.p1;
		this.play();
	}
}

module.exports = Game;