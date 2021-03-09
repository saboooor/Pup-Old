module.exports = {
	name: 'clear',
	aliases: ['purge'],
	guildOnly: true,
	args: true,
	usage: '<Amount of messages>',
	permissions: 'MANAGE_MESSAGES',
	async execute(message, args, client, config, Client, Discord) {
		await message.delete();
		if (args[0] > 100) return message.reply('You can only clear 100 messages at once!');
		await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
			message.channel.bulkDelete(messages);
		});
		if (message.channel.name == 'global') {
			const consolechannel = message.guild.channels.cache.find(c => c.name.includes('console'));
			if (consolechannel === undefined) return;
			consolechannel.send('clearchat');
		}
	},
};