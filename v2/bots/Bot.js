class Bot {
	constructor (name = 'Bot', char = '=') {
		this.name = name;
		this.char = char;
	}

	async takeTurn (board, fullColumns) {}

	async startNewGame () {
		console.log(`Want to play again?(y/n)`);
		await this.sleep(2000);
		return false;
	}

	sleep (ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}

module.exports = Bot;
