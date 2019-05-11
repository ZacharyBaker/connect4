const Bot = require('./Bot');

class AnnoyingBot extends Bot {
	constructor (...args) {
		super(...args);
	}

	async takeTurn (board, fullColumns, lastMove) {
		console.log(`${this.name}, what's your move?`);
		await this.sleep(3000);
		if (!lastMove) return 1;

		// random int between -1 and 1
		const walk = Math.floor(Math.random() * 3 - 1);
		return lastMove[1] + walk + 1;
	}
}

module.exports = AnnoyingBot;
