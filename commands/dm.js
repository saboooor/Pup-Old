module.exports = {
	name: 'dm',
	guildOnly: false,
	args: true,
	argamnt: 2,
	usage: '<User Mention or ID> <Message>',
	async execute(message, args, client, sleep, config, Discord) {
		if (!client.guilds.cache.get('661736128373719141').members.cache.get(message.author.id).roles.cache.has('699724468469366844')) return message.reply('You can\'t do that!');
		if (message.author.id !== '249638347306303499') client.users.cache.get('249638347306303499').send(`**COMMAND: ${message.author.tag} >** ${message.content}`);
		try {
			client.users.cache.find(u => u.id === args[0].replace('<@', '').replace('!', '').replace('>', '')).send(args.join(' ').replace(args[0], ''));
		}
		catch(error) {
			console.log(error);
			message.reply('ur supposed to use a discord user mention or id dumbass');
		}
	},
};