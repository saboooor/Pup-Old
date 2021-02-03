module.exports = {
	name: 'deny',
	aliases: ['reject'],
	guildOnly: true,
	args: true,
	argamnt: 1,
	usage: '<Message ID> [Response]',
	permissions: 'ADMINISTRATOR',
	async execute(message, args, client, sleep, config, Discord) {
		if (message.channel.type == 'dm') return message.reply('This command is only executable in a Discord Server!');
		await message.delete();
		await message.channel.messages.fetch({ around: args[0], limit: 1 })
			.then(msg => {
				const fetchedMsg = msg.first();
				fetchedMsg.reactions.removeAll();
				if (args[1] === undefined) {
					fetchedMsg.edit({ embed: {
						color: 15158332,
						title: 'Suggestion (Denied)',
						description: fetchedMsg.embeds[0].description,
						author: {
							name: fetchedMsg.embeds[0].author.name,
							icon_url: fetchedMsg.embeds[0].author.iconURL,
						},
						footer: {
							text: 'No response.',
						},
					} });
				}
				if (args[1] !== undefined) {
					fetchedMsg.edit({ embed: {
						color: 15158332,
						title: 'Suggestion (Denied)',
						description: fetchedMsg.embeds[0].description,
						author: {
							name: fetchedMsg.embeds[0].author.name,
							icon_url: fetchedMsg.embeds[0].author.iconURL,
						},
						footer: {
							text: `Response:${args.join(' ').replace(args[0], '')}`,
						},
					} });
				}
			});
		return;
	},
};