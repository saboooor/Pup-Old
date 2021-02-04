module.exports = {
	name: 'deny',
	aliases: ['reject'],
	guildOnly: true,
	args: true,
	argamnt: 1,
	permissions: 'ADMINISTRATOR',
	usage: '<Message ID> [Response]',
	async execute(message, args, client, sleep, config, Client, Discord) {
		await message.delete();
		const approving = await message.channel.messages.fetch({ around: args[0], limit: 1 })
		const fetchedMsg = approving.first();
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
		else {
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
	},
};