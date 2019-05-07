const readline = require('readline');

const getChar = (num) => {
	let response;
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
  });

  return new Promise(resolve => rl.question(`Player ${num}, what's your symbol? (single character)?`, char => {
		rl.close();
		console.log('\n')
		resolve(char);
  }))
}

module.exports = getChar;
