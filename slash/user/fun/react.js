function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
module.exports = {
	name: 'react',
	description: 'React to a message with pup',
	cooldown: 1,
	guildOnly: true,
	options: [{
		type: 3,
		name: 'messageid',
		description: 'The ID of the message that you want Pup to react to',
		required: true,
	},
	{
		type: 3,
		name: 'emoji',
		description: 'The Emoji that you want Pup to react with',
		required: true,
	}],
	usage: '<Message ID> <Emoji>',
	async execute(interaction, args, client, Client, Discord) {
		try {
			const msg = await client.channels.cache.get(interaction.channel_id).messages.fetch({ around: args[0].value, limit: 1 });
			const fetchedMsg = msg.first();
			fetchedMsg.react(args[1].value);
		}
		catch {
			await client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'Invalid Message ID or Emoji!',
					},
				},
			});
			return;
		}
		await client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: 'Reacted!',
				},
			},
		});
		const msg = await client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({ data: {} });
		const pp = new Discord.Message(client, msg, client.channels.cache.get(msg.channel_id));
		await sleep(4000);
		pp.delete();
	},
};