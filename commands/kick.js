module.exports = {
	name: 'kick',
	guildOnly: true,
	args: true,
	argamnt: 2,
	usage: '<User Mention or ID> <Reason>',
	permissions: 'KICK_MEMBERS',
	execute(message, args, client, sleep, config, Client, Discord) {
		try {
			const Embed = new Discord.MessageEmbed().setColor(Math.round(Math.random() * 16777215)).setDescription(`Kicked ${member.tag} for ${args.join(' ').replace(`${args[0]} `, '')}`);
			const member = message.guild.members.cache.find(u => u.id === args[0].replace('<@!', '').replace('>', ''));
			const user = client.users.cache.find(u => u.id === args[0].replace('<@!', '').replace('>', ''));
			member.send(`**You've been kicked from ${message.guild.name} for ${args.join(' ').replace(`${args[0]} `, '')}**`);
			message.channel.send(Embed);
			member.kick();
		}
		catch(a) {
			message.reply('ur supposed to use a discord user mention or id dumbass');
		}
	},
};