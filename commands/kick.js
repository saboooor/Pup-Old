module.exports = {
	name: 'kick',
	guildOnly: true,
	args: true,
	argamnt: 2,
	usage: '<User Mention or ID> <Reason>',
	permissions: 'KICK_MEMBERS',
	async execute(message, args, client, sleep, config, Client, Discord) {
		try {
			const member = message.guild.members.cache.find(u => u.id === args[0].replace('<@!', '').replace('>', ''));
			const user = client.users.cache.find(u => u.id === args[0].replace('<@!', '').replace('>', ''));
			user.send(`**You've been kicked from ${message.guild.name} for ${args.join(' ').replace(`${args[0]} `, '')}**`);
			const randomcolor = Math.floor(Math.random() * 16777215);
			message.channel.send({ embed: {
				color: randomcolor,
				title: `Kicked ${user.tag} for ${args.join(' ').replace(`${args[0]} `, '')}`,
			} });
			member.kick();
		}
		catch(error) {
			console.log(error);
			message.reply('ur supposed to use a discord user mention or id dumbass');
		}
	},
};