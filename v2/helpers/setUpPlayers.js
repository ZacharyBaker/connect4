const getName = require('./getName');
const getChar = require('./getChar');
const DumbBot = require('../DumbBot');
const Player = require('../Player');

const setUpPlayers = async (humans) => {
	let p1;
	let p2;
	if (humans === '0') {
		p1 = new DumbBot('thing1', '*');
		p2 = new DumbBot('thing2', '=');
	} else if (humans === '1') {
		const p1Name = await getName(1);
		const p1Char = await getChar(1);
		p1 = new Player(p1Name, p1Char);

		p2 = new DumbBot();
	} else {
		const p1Name = await getName(1);
		const p1Char = await getChar(1);
		p1 = new Player(p1Name, p1Char);

		const p2Name = await getName(2);
		const p2Char = await getChar(2);
		p2 = new Player(p2Name, p2Char);
	}

	return [p1, p2];
}

module.exports = setUpPlayers;
