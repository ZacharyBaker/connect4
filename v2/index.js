const Game = require('./Game');
const Player = require('./Player');
const DumbBot = require('./DumbBot');
const getName = require('./helpers/getName');
const getChar = require('./helpers/getChar');
const getNumberOfPlayers = require('./helpers/getNumberOfPlayers');

(async function(){
	// How many human players? Only accept 1 or 2 
	// const numPlayers = await getNumberOfPlayers();

	// if (numPlayers < 2)

	const p1Name = await getName(1);
	const p1Char = await getChar(1);
	const p1 = new Player(p1Name, p1Char);

	const p2Name = await getName(2);
	const p2Char = await getChar(2);
	const p2 = new Player(p2Name, p2Char);

	const g1 = new Game(p1, p2);
	g1.play();
}())

