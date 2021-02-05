module.exports = {
	name: 'kick',
	guildOnly: true,
	args: true,
	argamnt: 2,
	usage: '<User Mention> <Reason>',
	permissions: 'KICK_MEMBERS',
	async execute(message, args, client, sleep, config, Client, Discord) {
		if (!message.mentions.users.first()) return message.reply('ur supposed to use a discord user mention dumbass');
		const user = message.mentions.users.first();
		const member = message.guild.members.cache.get(user.id);
		const Embed = new Discord.MessageEmbed().setColor(Math.round(Math.random() * 16777215)).setTitle(`Kicked ${user.tag} for ${args.join(' ').replace(`${args[0]} `, '')}`);
		await user.send(`**You've been kicked from ${message.guild.name} for ${args.join(' ').replace(`${args[0]} `, '')}**`);
		await message.channel.send(Embed);
		await member.kick().catch(e => message.channel.send(e.split('at')[0]));
	},
};