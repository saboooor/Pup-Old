const moment = require('moment');
module.exports = {
	name: 'time',
	description: 'Get time',
	cooldown: 10,
	async execute(message, args, client, Client, Discord) {
		if (message.author.id != '249638347306303499') return;
		const msg = await message.channel.send(`${moment(Date.now())}`);
		setInterval(async () => {
			msg.edit(`${moment(Date.now())}`);
		}, 1200);
	},
};
