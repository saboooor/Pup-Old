function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
const mineflayer = require('mineflayer');
module.exports = {
	name: 'bot',
	description: 'Bot',
	async execute(message, args, client, Client, Discord) {
		const bots = [];
		for (let step = 0; step < client.config.accounts.length; step++) {
			await sleep(3000);
			const account = client.config.accounts[step].split(':');
			const bot = mineflayer.createBot({
				host: 'townbreak.chopsticksmc.net',
				port: 25565,
				username: account[0],
				password: account[1],
			});
			bot.once('spawn', () => {
				bot.chat('aaa');
				bots.push(bot);
			});
		}
		bots.forEach(async bot => {
			for (let step = 0; step < 100; step++) {
				await sleep(1000);
				bot.chat('imagine getting botted');
			}
		});
	},
};