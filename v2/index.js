const Game = require('./Game');
const Player = require('./Player');

const p1 = new Player('zach', '@');
const p2 = new Player('addie', '&');
const g1 = new Game(p1, p2);

g1.play();