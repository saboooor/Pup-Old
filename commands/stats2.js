const https = require('https');
module.exports = {
	name: 'stats2',
	guildOnly: true,
	aliases: ['status'],
	async execute(message, args, client, sleep, config, Client, Discord) {
		const serverip = args[0];
		await https.get(`https://api.mcsrvstat.us/2/${serverip}`, async function(response) {
			console.log(response);
		});
	},
};