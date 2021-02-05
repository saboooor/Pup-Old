module.exports = {
	name: 'ban',
	guildOnly: true,
	args: true,
	argamnt: 2,
	usage: '<User Mention> <Reason>',
	permissions: 'BAN_MEMBERS',
	async execute(message, args, client, sleep, config, Client, Discord) {
		if (!message.mentions.users.first()) return message.reply('ur supposed to use a discord user mention dumbass');
		const user = message.mentions.users.first();
		const member = message.guild.members.cache.get(user.id);
		const Embed = new Discord.MessageEmbed().setColor(Math.round(Math.random() * 16777215)).setTitle(`Banned ${user.tag} for ${args.join(' ').replace(`${args[0]} `, '')}`);
		await user.send(`**You've been banned from ${message.guild.name} for ${args.join(' ').replace(`${args[0]} `, '')}**`);
		await message.channel.send(Embed);
		await member.ban().catch(e => console.log(e));
	},
};