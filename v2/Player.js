class Player {
	constructor (name, char) {
		this.validateChar(char);
		this.name = name;
		this.char = char;
	}

	validateChar (char) {
		if (typeof char !== 'string' || char.length > 1) throw new Error('Second parameter char can only be string of length 1')
	}
}

module.exports = Player;
