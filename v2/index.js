const Game = require('./Game');
const setUpPlayers = require('./helpers/setUpPlayers');
const getNumberOfPlayers = require('./helpers/getNumberOfPlayers');

(async function(){ 
	const numHumans = await getNumberOfPlayers();
	const [p1, p2] = await setUpPlayers(numHumans);
	const g1 = new Game(p1, p2);
	g1.play();
}())

// TODO:
// Make 'smartBot'

// give player the choice of
// which bot to play against

// fix bug of having the
// same char/symbol
