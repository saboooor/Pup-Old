module.exports = {
	name: 'bcast',
	guildOnly: false,
	args: true,
	usage: '<Message>',
	async execute(message, args, client, config, Client, Discord) {
		if (message.author.id !== '249638347306303499') return message.reply('You can\'t do that!');
		client.guilds.cache.forEach(guild => {
			try {
				guild.owner.send(`**PUP BROADCAST**
${args.join(' ')}
*This message was sent to all owners that have Pup in their guild*`)
			}
			catch (error) {
				const rn = new Date();
				const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
				console.error(`[${time} ERROR]: ${error}`);
			}
		});		
	},
};