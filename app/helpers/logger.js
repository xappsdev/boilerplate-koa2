const chalk = require('chalk')

const generateChalk = color => msg => console.log(chalk.bold[color](`[${new Date().toISOString()}] ${msg}`))

const error = generateChalk('red')
const success = generateChalk('green')
const info = generateChalk('blue')
const warning = generateChalk('yellow')
const log = generateChalk('white')

module.exports = {
	error,
	success,
	info,
	warning,
	log,
}