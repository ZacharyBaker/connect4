const readline = require('readline');

class Player {
	constructor (name, char) {
		this.validateChar(char);
		this.name = name;
		this.char = char;
	}

	validateChar (char) {
		if (typeof char !== 'string' || char.length > 1) throw new Error('Second parameter char can only be string of length 1')
	}

	takeTurn () {
		const rl = readline.createInterface({
	    input: process.stdin,
	    output: process.stdout,
	  });

		return new Promise((resolve, reject) => {
			rl.question(`${this.name}, what's your move?`, (column) => {
			  rl.close();
			  return resolve(column);
			})
		})
	}

	startNewGame () {
		const rl = readline.createInterface({
	    input: process.stdin,
	    output: process.stdout,
	  });

		return new Promise((resolve, reject) => {
			rl.question(`Want to play again? (y/n)`, (answer) => {
			  rl.close();
			  if (answer === 'y') {
			  	return resolve(true);
			  }
			  return resolve(false);
			})
		})
	}
}

module.exports = Player;
