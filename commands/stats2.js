const https = require('https');
module.exports = {
	name: 'stats2',
	guildOnly: true,
	aliases: ['status'],
	async execute(message, args, client, sleep, config, Client, Discord) {
		const serverip = args[0];
		https.get(`https://api.mcsrvstat.us/2/${serverip}`, function(res) {
			let body = '';
			res.on('data', function(chunk) {
				body += chunk;
			});
			res.on('end', function() {
				const json = JSON.parse(body);
				console.log('Got a response: ', json);
			});
		});
	},
};