const readline = require('readline');

const getNumberOfPlayers = (num) => {
	let response;
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
  });

  return new Promise(resolve => rl.question(`How many players? (0, 1, 2)`, num => {
		rl.close();
		console.log('\n')
		resolve(num);
  }))
}

module.exports = getNumberOfPlayers;
