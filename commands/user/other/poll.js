function isEven(value) {
	if (value % 2 == 0) {
		return true;
	}
	else {
		return false;
	}
}
module.exports = {
	name: 'poll',
	description: 'Create a poll',
	cooldown: 10,
	guildOnly: true,
	args: true,
	usage: '<Question>\nIt is recommended to use /poll instead',
	async execute(message, args, client, Client, Discord) {
		let channel = message.guild.channels.cache.find(c => c.name.includes('poll'));
		const Poll = new Discord.MessageEmbed()
			.setColor(3447003)
			.setTitle('Poll')
			.setAuthor(message.author.username, message.author.avatarURL());
		if (channel) channel = message.channel;
		const poll = args.join(' ');
		Poll.setDescription(poll);
		const msg = await channel.send(Poll);
		await msg.react(client.config.yes);
		await msg.react(client.config.no);
		if (channel === message.channel) return;
		if (channel === message.guild.channels.cache.find(c => c.name.includes('poll'))) return message.channel.send(`**Poll Created! Check <#${channel.id}>**`);
	},
};