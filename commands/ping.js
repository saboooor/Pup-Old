module.exports = {
	name: 'ping',
	aliases: ['pong'],
	cooldown: 2,
	guildOnly: false,
	execute(message, args, client, sleep, config, Client, Discord) {
		const randomcolor = Math.floor(Math.random() * 16777215);
		message.channel.send('', { embed: {
			color: randomcolor,
			title: 'Pong!',
			description: `${Date.now() - message.createdTimestamp}ms`,
		} });
	},
};