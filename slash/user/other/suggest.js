module.exports = {
	name: 'suggest',
	description: 'Suggest something!',
	cooldown: 10,
	guildOnly: true,
	options: [{
		type: 3,
		name: 'suggestion',
		description: 'What you want to suggest',
		required: true,
	}],
	async execute(interaction, args, client, Client, Discord) {
		const channel = client.guilds.cache.get(interaction.guild_id).channels.cache.find(c => c.name.includes('suggest'));
		const suggestion = args[0].value;
		const Embed = new Discord.MessageEmbed()
			.setColor(3447003)
			.setAuthor(interaction.member.user.username, `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.webp`)
			.setTitle('Suggestion')
			.setDescription(suggestion);
		if (channel) {
			const pp = await channel.send(Embed);
			await pp.react(client.config.yes);
			await pp.react(client.config.no);
			await client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: `**Suggestion created! Check <#${channel.id}>**`,
						flags: 64,
					},
				},
			});
		}
		else {
			await client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						embeds: [Embed],
					},
				},
			});
			const msg = await client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({ data: {} });
			const pp = new Discord.Message(client, msg, client.channels.cache.get(msg.channel_id));
			await pp.react(client.config.yes);
			await pp.react(client.config.no);
		}
	},
};