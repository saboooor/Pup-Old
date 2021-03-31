function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
module.exports = {
	name: 'approve',
	description: 'Approve a suggestion',
	guildOnly: true,
	permissions: 'ADMINISTRATOR',
	options: [{
		type: 3,
		name: 'messageid',
		description: 'The ID of the message of the suggestion you want to approve',
		required: true,
	},
	{
		type: 3,
		name: 'response',
		description: 'Response to the suggestion',
	}],
	async execute(interaction, args, client, Client, Discord) {
		const approving = await client.channels.cache.get(interaction.channel_id).messages.fetch({ around: args[0].value, limit: 1 });
		const fetchedMsg = approving.first();
		fetchedMsg.reactions.removeAll();
		const Embed = new Discord.MessageEmbed()
			.setColor(3066993)
			.setAuthor(fetchedMsg.embeds[0].author.name, fetchedMsg.embeds[0].author.iconURL)
			.setDescription(fetchedMsg.embeds[0].description)
			.setTitle('Suggestion (Approved)');
		if (!args[1]) {
			Embed.setFooter('No response.');
			fetchedMsg.edit(Embed);
		}
		else {
			Embed.setFooter(`Response: ${args[1].value}`);
			fetchedMsg.edit(Embed);
		}
		await client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: 'Suggestion approved!',
				},
			},
		});
		const msg = await client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({ data: {} });
		const pp = new Discord.Message(client, msg, client.channels.cache.get(msg.channel_id));
		sleep(2000);
		pp.delete();
	},
};