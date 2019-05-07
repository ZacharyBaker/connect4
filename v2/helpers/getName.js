const readline = require('readline');

const getName = (num) => {
	let response;
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
  });

  return new Promise(resolve => rl.question(`Player ${num}, what's your name?`, name => {
		rl.close();
		console.log(`Welcome, ${name}!`)
		console.log('\n')
		resolve(name);
  }))
}

module.exports = getName;
