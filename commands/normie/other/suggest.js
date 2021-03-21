module.exports = {
	name: 'suggest',
	cooldown: 10,
	guildOnly: true,
	args: true,
	usage: '<Suggestion>',
	async execute(message, args, client, config, Client, Discord) {
		let channel = message.guild.channels.cache.find(c => c.name.includes('suggestions'));
		if (channel === undefined) channel = message.channel;
		const suggestion = args.join(' ');
		const Embed = new Discord.MessageEmbed()
			.setColor(3447003)
			.setAuthor(message.author.username, message.author.avatarURL())
			.setTitle('Suggestion')
			.setDescription(suggestion);
		const msg = await channel.send(Embed);
		await msg.react(config.yes);
		await msg.react(config.no);
	},
};