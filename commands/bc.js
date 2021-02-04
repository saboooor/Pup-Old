module.exports = {
	name: 'bc',
	cooldown: 1,
	guildOnly: false,
	args: true,
	argamnt: 1,
	usage: '<Message>',
	async execute(message, args, client, sleep, config, Client, Discord) {
		await message.delete();
		if (message.author.id != '249638347306303499') return;
		client.channels.cache.get('717821332695416843').send(args.join(' '));
		client.channels.cache.get('670774287317073951').send(args.join(' '));
	},
};