const Bot = require('./Bot');

class SmartBot extends Bot {
	constructor (props) {
		super(props);

		this.name = 'SmartBot';
	}

	async takeTurn (board, fullColumns) {
		console.log(`${this.name}, what's your move?`);
		await this.sleep(3000);

		// implement a blocking/attack strategy and remember past moves
		// use win check smarts to look for two or three in a row and find next move

	}
}

module.exports = SmartBot;
