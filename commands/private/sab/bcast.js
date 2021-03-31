function minTwoDigits(n) {
	return (n < 10 ? '0' : '') + n;
}
module.exports = {
	name: 'bcast',
	description: 'Broadcast a message to all guild owners',
	args: true,
	usage: '<Message>',
	async execute(message, args, client, Client, Discord) {
		if (message.author.id !== '249638347306303499') return message.reply('You can\'t do that!');
		client.guilds.cache.forEach(guild => {
			guild.owner.send(`**PUP BROADCAST**
${args.join(' ')}
*This message was sent to all owners that have Pup in their guild*`);
		});
	},
};