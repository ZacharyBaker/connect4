class DumbBot {
	constructor (name = 'DumbBot', char = '=') {
		this.name = name;
		this.char = char;
	}

	async takeTurn (board) {
		console.log(`${this.name}, what's your move?`);
		await this.sleep(3000);
		// TODO - make this smarter 🧙‍♂️
		return 1;
	}

	async startNewGame () {
		console.log(`Want to play again?`);
		await this.sleep(2000);
		return false;
	}

	sleep (ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}

module.exports = DumbBot;
