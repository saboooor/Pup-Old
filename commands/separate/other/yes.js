const moment = require('moment');
module.exports = {
	name: 'time',
	description: 'Get time',
	cooldown: 10,
	async execute(message, args, client, Client, Discord) {
		if (message.author.id != '249638347306303499') return;
		const msg = await message.channel.send('i like dick');
		setInterval(async () => {
			msg.edit(`${new Date(Date.now()).toLocaleString('default', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}`);
		}, 1200);
	},
};
