const Bot = require('./Bot');

class DumbBot extends Bot {
	constructor (...args) {
		super(...args);
	}

	async takeTurn (board, fullColumns) {
		console.log(`${this.name}, what's your move?`);
		await this.sleep(3000);

		// find the next available spot, really dumb
		// brute force
		for (let i = board.length - 1; i >= 0; i--) {
			for (let j = 0; j < board[i].length; j++) {
				if (board[i][j] === 'x') {
					return j + 1;
				}
			}
		}

		// implement a blocking/attack strategy and remember past moves

		// use win check smarts to look for two or three in a row and find next move
	}
}

module.exports = DumbBot;
