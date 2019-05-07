class DumbBot {
	constructor () {
		this.name = 'DumbBot';
		this.char = '=';
	}

	async takeTurn (board) {
		await this.sleep(3000);
		return 1;
	}

	sleep (ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}

module.exports = DumbBot;
