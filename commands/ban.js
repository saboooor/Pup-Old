module.exports = {
	name: 'ban',
	guildOnly: true,
	args: true,
	argamnt: 2,
	usage: '<User Mention or ID> <Reason>',
	permissions: 'BAN_MEMBERS',
	async execute(message, args, client, sleep, config, Client, Discord) {
		try {
			const user = client.users.cache.find(u => u.id === args[0].replace('<@!', '').replace('>', ''));
			user.send(`**You've been banned from ${message.guild.name} for ${args.join(' ').replace(`${args[0]} `, '')}`);
			const randomcolor = Math.floor(Math.random() * 16777215);
			message.guild.members.ban(user.id);
			message.channel.send({ embed: {
				color: randomcolor,
				title: `Banned ${user.tag} for ${args.join(' ').replace(`${args[0]} `, '')}`,
			} });
		}
		catch(error) {
			console.log(error);
			message.reply('ur supposed to use a discord user mention or id dumbass');
		}
	},
};