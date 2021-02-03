module.exports = {
	name: 'suggest',
	cooldown: 10,
	guildOnly: true,
	args: true,
	argamnt: 1,
	usage: '<Suggestion>',
	async execute(message, args, client, sleep, config, Discord) {
		let channel = message.guild.channels.cache.find(c => c.name.includes('suggestions'));
		if (channel === undefined) channel = message.channel;
		const suggestion = args.join(' ');
		const msg = await channel.send({ embed: {
			color: 3447003,
			author: {
				name: message.author.username,
				icon_url: message.author.avatarURL(),
			},
			title: 'Suggestion',
			description: suggestion,
		} });
		await msg.react('785116664190337034');
		await msg.react('785116663460266005');
	},
};