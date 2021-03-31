function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
module.exports = {
	name: 'react',
	description: 'React to a message with pup',
	cooldown: 1,
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
	},
	{
		type: 3,
		name: 'emoji2',
		description: 'The second Emoji that you want Pup to react with',
		required: false,
	},
	{
		type: 3,
		name: 'emoji3',
		description: 'The third Emoji that you want Pup to react with',
		required: false,
	},
	{
		type: 3,
		name: 'emoji4',
		description: 'The fourth Emoji that you want Pup to react with',
		required: false,
	},
	{
		type: 3,
		name: 'emoji5',
		description: 'The fifth Emoji that you want Pup to react with',
		required: false,
	},
	{
		type: 3,
		name: 'emoji6',
		description: 'The sixth Emoji that you want Pup to react with',
		required: false,
	},
	{
		type: 3,
		name: 'emoji7',
		description: 'The seventh Emoji that you want Pup to react with',
		required: false,
	},
	{
		type: 3,
		name: 'emoji8',
		description: 'The eighth Emoji that you want Pup to react with',
		required: false,
	},
	{
		type: 3,
		name: 'emoji9',
		description: 'The ninth Emoji that you want Pup to react with',
		required: false,
	},
	{
		type: 3,
		name: 'emoji10',
		description: 'The tenth Emoji that you want Pup to react with',
		required: false,
	},
	{
		type: 3,
		name: 'emoji11',
		description: 'The eleventh Emoji that you want Pup to react with',
		required: false,
	},
	{
		type: 3,
		name: 'emoji12',
		description: 'The twelveth Emoji that you want Pup to react with',
		required: false,
	},
	{
		type: 3,
		name: 'emoji13',
		description: 'The thirteenth Emoji that you want Pup to react with',
		required: false,
	},
	{
		type: 3,
		name: 'emoji14',
		description: 'The fourteenth Emoji that you want Pup to react with',
		required: false,
	},
	{
		type: 3,
		name: 'emoji15',
		description: 'The fifteenth Emoji that you want Pup to react with',
		required: false,
	},
	{
		type: 3,
		name: 'emoji16',
		description: 'The sixteenth Emoji that you want Pup to react with',
		required: false,
	},
	{
		type: 3,
		name: 'emoji17',
		description: 'The seventeenth Emoji that you want Pup to react with',
		required: false,
	},
	{
		type: 3,
		name: 'emoji18',
		description: 'The eighteenth Emoji that you want Pup to react with',
		required: false,
	},
	{
		type: 3,
		name: 'emoji19',
		description: 'The nineteenth Emoji that you want Pup to react with',
		required: false,
	},
	{
		type: 3,
		name: 'emoji20',
		description: 'The twentieth Emoji that you want Pup to react with',
		required: false,
	},
	{
		type: 3,
		name: 'emoji21',
		description: 'The twenty first Emoji that you want Pup to react with',
		required: false,
	},
	{
		type: 3,
		name: 'emoji22',
		description: 'The twenty second Emoji that you want Pup to react with',
		required: false,
	},
	{
		type: 3,
		name: 'emoji23',
		description: 'The twenty third Emoji that you want Pup to react with',
		required: false,
	},
	{
		type: 3,
		name: 'emoji24',
		description: 'The twenty fourth Emoji that you want Pup to react with',
		required: false,
	}],
	usage: '<Message ID> <Emoji>',
	async execute(interaction, args, client, Client, Discord) {
		try {
			const msg = await client.channels.cache.get(interaction.channel_id).messages.fetch({ around: args[0].value, limit: 1 });
			const fetchedMsg = msg.first();
			args.forEach(arg => {
				if (!arg.name.includes('emoji')) return;
				fetchedMsg.react(arg.value);
			});
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