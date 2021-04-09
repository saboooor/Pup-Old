function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
module.exports = {
	name: 'deny',
	description: 'Deny a suggestion',
	guildOnly: true,
	permissions: 'ADMINISTRATOR',
	options: [{
		type: 3,
		name: 'messageid',
		description: 'The ID of the message of the suggestion you want to deny',
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
			.setColor(15158332)
			.setAuthor(fetchedMsg.embeds[0].author.name, fetchedMsg.embeds[0].author.iconURL)
			.setDescription(fetchedMsg.embeds[0].description)
			.setTitle('Suggestion (Denied)');
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
					content: 'Suggestion denied!',
					flags: 64,
				},
			},
		});
	},
};